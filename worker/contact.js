const json = (body, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const clean = (value, maxLength) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

async function sendContactEmail(request, env) {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) {
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

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "Sacred Guides Website <website@sacred-guides.com>",
      to: [env.CONTACT_TO_EMAIL || "SacredGuideNBS@gmail.com"],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!response.ok) {
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
