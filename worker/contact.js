const DAY_IN_MS = 24 * 60 * 60 * 1000;

const json = (body, status = 200, headers = {}) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

const clean = (value, maxLength) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export class SubmissionLimiter {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    const { action, token } = await request.json();
    const current = await this.state.storage.get("submission");

    if (action === "reserve") {
      const now = Date.now();
      if (current && now - current.timestamp < DAY_IN_MS) {
        return json({
          allowed: false,
          retryAfter: Math.ceil((DAY_IN_MS - (now - current.timestamp)) / 1000),
        });
      }

      const reservationToken = crypto.randomUUID();
      await this.state.storage.put("submission", {
        timestamp: now,
        token: reservationToken,
      });
      return json({ allowed: true, token: reservationToken });
    }

    if (action === "release" && current?.token === token) {
      await this.state.storage.delete("submission");
    }
    return json({ ok: true });
  }
}

async function sendContactEmail(request, env) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== requestUrl.origin) {
    return json({ error: "Invalid request origin." }, 403);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 254);
  const meeting = clean(payload.meeting, 50);
  const message = clean(payload.message, 3000);
  const honeypot = clean(payload._honey, 200);
  const language = payload.language === "es" ? "es" : "en";

  if (honeypot) return json({ ok: true });

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validName = /^[\p{L}\p{M}' -]{2,100}$/u.test(name);
  const validMeetings = new Set(["Zoom", "Phone", "In person", "Teléfono", "Presencial"]);
  if (!validName || !validEmail || !validMeetings.has(meeting)) {
    return json({ error: "Please complete every required field." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY secret.");
    return json({ error: "Email service is not configured." }, 500);
  }

  const limiterId = env.SUBMISSION_LIMITER.idFromName(email.toLowerCase());
  const limiter = env.SUBMISSION_LIMITER.get(limiterId);
  const reservationResponse = await limiter.fetch("https://limiter/reserve", {
    method: "POST",
    body: JSON.stringify({ action: "reserve" }),
  });
  const reservation = await reservationResponse.json();
  if (!reservation.allowed) {
    return json(
      { error: "Only one message can be sent every 24 hours.", retryAfter: reservation.retryAfter },
      429,
      { "Retry-After": String(reservation.retryAfter) },
    );
  }

  const subject = language === "es"
    ? `Nueva consulta de acompañamiento espiritual — ${name}`
    : `New spiritual direction inquiry — ${name}`;
  const text = [
    `Name / Nombre: ${name}`,
    `Email: ${email}`,
    `Preferred meeting / Modalidad: ${meeting}`,
    `Language / Idioma: ${language}`,
    "",
    "Message / Mensaje:",
    message || "No additional message was provided.",
  ].join("\n");

  let response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          env.CONTACT_FROM_EMAIL ||
          (["localhost", "127.0.0.1"].includes(requestUrl.hostname)
            ? "Sacred Guides Website <onboarding@resend.dev>"
            : "Sacred Guides Website <website@sacred-guides.com>"),
        to: [env.CONTACT_TO_EMAIL || "SacredGuideNBS@gmail.com"],
        reply_to: email,
        subject,
        text,
      }),
    });
  } catch (error) {
    await limiter.fetch("https://limiter/release", {
      method: "POST",
      body: JSON.stringify({ action: "release", token: reservation.token }),
    });
    console.error("Resend request failed:", error);
    return json({ error: "The message could not be sent." }, 502);
  }

  if (!response.ok) {
    await limiter.fetch("https://limiter/release", {
      method: "POST",
      body: JSON.stringify({ action: "release", token: reservation.token }),
    });
    console.error("Resend request failed:", response.status, await response.text());
    return json({ error: "The message could not be sent." }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
      return sendContactEmail(request, env);
    }
    if (url.pathname.startsWith("/api/")) return json({ error: "Not found." }, 404);
    return env.ASSETS.fetch(request);
  },
};
