# DESIGN.md — Spiritual Journey Landing Page

## 1. Objetivo del proyecto

Crear una landing page profesional, cálida, accesible y responsive para **Nathalie Bose-Silver**, Catholic Spiritual Director.

La página debe explicar claramente qué es la dirección espiritual, presentar el enfoque de Nathalie y convertir visitantes mediante dos acciones principales:

1. **Llamar al 321-231-0058**
2. **Enviar un correo a SacredGuideNBS@gmail.com**

La oferta principal que debe destacarse es una **consulta inicial gratuita de 30 minutos**. También debe indicarse que las sesiones regulares son de una hora, una vez al mes, por Zoom o teléfono, con costo.

La página debe sentirse espiritual y serena, pero no anticuada, recargada ni similar a un folleto impreso. Debe transformar el material visual proporcionado en una experiencia web limpia y moderna.

---

## 2. Público objetivo

Personas adultas que:

- Desean profundizar su vida espiritual.
- Buscan acompañamiento basado en la fe.
- Quieren reconocer la presencia y dirección de Dios en su vida.
- Prefieren sesiones individuales, confidenciales y sin juicios.
- Hablan inglés o español.
- Pueden reunirse por Zoom, teléfono o mediante cita presencial.

---

## 3. Mensaje principal

### Propuesta de valor

**Discover your path with compassionate, prayerful spiritual direction.**

Texto de apoyo:

> Receive personalized, one-on-one spiritual guidance in a safe and welcoming space. Begin with a free 30-minute consultation to discover whether spiritual direction is right for you.

### CTA principal

**Schedule Your Free Consultation**

El botón debe abrir un correo mediante:

```text
mailto:SacredGuideNBS@gmail.com?subject=Free%2030-Minute%20Spiritual%20Direction%20Consultation
```

### CTA secundario

**Call 321-231-0058**

El botón debe usar:

```text
tel:+13212310058
```

En móviles, ambos CTA deben ser fáciles de tocar y permanecer claramente visibles.

---

## 4. Identidad visual

### Sensación general

La interfaz debe transmitir:

- Paz
- Esperanza
- Confianza
- Calidez humana
- Acompañamiento
- Espiritualidad
- Naturaleza y transformación

Evitar:

- Exceso de texto en mayúsculas
- Tipografías demasiado delgadas
- Bloques visuales densos
- Fondos saturados en secciones extensas
- Animaciones llamativas
- Estética corporativa fría
- Apariencia de plantilla religiosa genérica

### Paleta de colores

Usar la siguiente paleta basada en las imágenes entregadas:

```css
:root {
  --color-cream: #F8EED4;
  --color-soft-cream: #FFF9EC;
  --color-sand: #DDB783;
  --color-peach: #F1CEAE;
  --color-terracotta: #D95B32;
  --color-sunset-orange: #EF7A22;
  --color-forest: #165A38;
  --color-olive: #4C7000;
  --color-sage: #91ACAA;
  --color-aqua: #9DE8DB;
  --color-charcoal: #2F3336;
  --color-white: #FFFFFF;
}
```

### Uso recomendado

- Fondo principal: `--color-soft-cream`
- Secciones alternas: `--color-cream` y `--color-peach`
- CTA principal: `--color-forest`
- CTA hover: un verde ligeramente más oscuro
- CTA secundario: transparente con borde `--color-forest`
- Acentos pequeños: `--color-sunset-orange` o `--color-terracotta`
- Texto principal: `--color-charcoal`
- Sección final de contacto: `--color-forest` con texto crema o blanco

No usar el rojo coral brillante del primer anuncio como fondo dominante. Puede aparecer únicamente como acento muy moderado.

---

## 5. Tipografía

Usar como máximo dos familias tipográficas.

### Encabezados

Una serif elegante y legible, por ejemplo:

- Cormorant Garamond
- Lora
- Libre Baskerville

### Cuerpo y controles

Una sans-serif clara, por ejemplo:

- Inter
- Source Sans 3
- Nunito Sans

### Recomendación

```text
Headings: Cormorant Garamond
Body/UI: Inter
```

No usar la tipografía manuscrita del nombre como fuente principal. Puede utilizarse solamente como detalle decorativo en el nombre de Nathalie, siempre que siga siendo legible.

---

## 6. Activos visuales proporcionados

Crear una carpeta:

```text
/public/images/spiritual-journey/
```

Copiar y renombrar los recursos originales de manera descriptiva:

```text
spiritual-journey-logo.jpeg
free-consultation-flyer.jpeg
spiritual-direction-contact.jpeg
brochure-front.jpeg
brochure-back.jpeg
business-card.jpeg
```

### Uso de activos

#### `spiritual-journey-logo.jpeg`

Usar como imagen principal de marca. Aparece el camino, la persona caminando, mariposas, manos, fuego y paloma.

Debe mostrarse:

- En el hero, a la derecha en escritorio.
- Centrado debajo del mensaje principal en móvil.
- Con bordes redondeados suaves o dentro de un contenedor circular/ovalado.
- Sin deformarse.
- Con `object-fit: contain`.
- Con un tamaño máximo que no domine todo el hero.

#### Otros folletos y tarjetas

No deben mostrarse como imágenes completas dentro de la landing principal, porque contienen mucho texto y crearían una experiencia poco accesible y difícil de leer en móvil.

Deben utilizarse como referencia para:

- Redactar el contenido.
- Extraer la paleta visual.
- Mantener consistencia de marca.
- Crear una galería opcional solo si el cliente lo solicita posteriormente.

---

## 7. Arquitectura de la página

La landing page será de una sola página y tendrá las siguientes secciones:

1. Header
2. Hero
3. What Is Spiritual Direction?
4. What to Expect
5. My Approach
6. About Nathalie
7. Where We Meet
8. Free Consultation CTA
9. Footer

---

## 8. Header

### Contenido

- Logo o versión pequeña del emblema.
- Nombre: **Nathalie Bose-Silver**
- Descriptor: **Spiritual Director**
- Navegación interna:
  - About
  - What to Expect
  - Approach
  - Contact
- Botón: **Free Consultation**

### Comportamiento

- Sticky al hacer scroll.
- Fondo crema con ligera transparencia y blur.
- Sombra muy sutil al salir del inicio.
- Menú móvil accesible.
- Los enlaces deben hacer smooth scroll sin ocultar el título debajo del header.

---

## 9. Hero

### Layout de escritorio

Dos columnas:

- Izquierda: mensaje, descripción y CTA.
- Derecha: logo/ilustración principal.

### Eyebrow

```text
Catholic Spiritual Direction · English & Spanish
```

### H1

```text
Find clarity, connection, and grace along your spiritual journey.
```

### Texto

```text
Spiritual direction offers a prayerful, confidential space to notice how God is moving in your life. Nathalie accompanies each person with compassionate listening, thoughtful reflection, and respect for their unique journey.
```

### CTA

Botón principal:

```text
Schedule a Free 30-Minute Consultation
```

Botón secundario:

```text
Call 321-231-0058
```

Texto pequeño debajo:

```text
Regular one-hour sessions are available monthly by Zoom or phone. Fee applies.
```

### Elementos visuales

Agregar formas orgánicas muy suaves inspiradas en:

- Mariposas
- Un sendero
- Rayos del amanecer
- Hojas

Deben ser decorativas, discretas y creadas con CSS o SVG sencillo. No competir con el contenido principal.

---

## 10. Sección: What Is Spiritual Direction?

### Título

```text
What Is Spiritual Direction?
```

### Contenido

```text
Spiritual direction is a sacred conversation centered on your relationship with God. It provides time to slow down, reflect, pray, and become more attentive to grace in everyday life.
```

```text
A spiritual director does not provide therapy, diagnosis, or direct answers. Instead, Nathalie accompanies you as you discern your unfolding path and recognize the Divine within and around you.
```

### Diseño

- Fondo crema claro.
- Texto en una columna de ancho limitado.
- Acompañar con una pequeña línea ilustrada de un camino o mariposa.
- Incluir una nota destacada:

```text
Spiritual direction is not counseling or therapy.
```

---

## 11. Sección: What to Expect

### Título

```text
What to Expect
```

Mostrar cuatro tarjetas:

#### Personalized Support

```text
Each session is thoughtfully tailored to your spiritual needs, questions, and lived experience.
```

#### One-on-One Sessions

```text
Meet once a month for a private, one-hour session designed around your unique journey.
```

#### Sacred Reflection

```text
Explore thoughtful questions and prayerful prompts that help you notice the movement of grace in your life.
```

#### Compassionate Listening

```text
Be received with full presence in a space where you can feel held, heard, respected, and honored.
```

### Diseño

- Grid de cuatro columnas en pantallas grandes.
- Dos columnas en tablet.
- Una columna en móvil.
- Iconos lineales simples y coherentes.
- Tarjetas con fondo claro, borde tenue y esquinas redondeadas.
- Hover sutil, sin movimientos exagerados.

---

## 12. Sección: My Approach

### Título

```text
A Heart-Centered Approach
```

### Intro

```text
Every session is an invitation to pause, listen deeply, and explore what is moving within your heart.
```

### Pilares

#### Personalized Guidance

```text
Sessions are adapted to your individual needs and spiritual aspirations.
```

#### Heart-Centered Conversation

```text
Together, we explore your inner experiences with honesty, curiosity, and compassion.
```

#### Safe and Welcoming Space

```text
You are invited to express yourself freely in a respectful, nonjudgmental environment.
```

#### Deepening Your Connection

```text
Reflective practices and spiritual exercises can help strengthen your awareness of the Divine.
```

### Diseño

Esta sección puede usar fondo `--color-sage` con una tarjeta crema grande o un layout de dos columnas.

---

## 13. Sección: About Nathalie

### Título

```text
Meet Nathalie Bose-Silver
```

### Texto principal

```text
Nathalie is a certified professional spiritual director through the Sacred Presence Program at San Pedro Center, a ministry of the Diocese of Orlando. She is also a member of Spiritual Directors International.
```

```text
Rooted in the Catholic faith, Nathalie offers spiritual direction in both English and Spanish and welcomes seekers from diverse backgrounds into heart-centered conversations grounded in sacred trust.
```

```text
Her experience includes serving in adult and youth faith formation and founding a nonprofit rosary-making ministry that supports deeper devotion and prayer.
```

### Credenciales visuales

Presentar tres etiquetas o chips:

- Certified Spiritual Director
- English & Spanish
- Member of Spiritual Directors International

No inventar títulos, certificaciones, años de experiencia o credenciales adicionales.

---

## 14. Sección: Where We Meet

### Título

```text
Where We Meet
```

### Intro

```text
Sessions are available by appointment in a quiet place where you can be present and uninterrupted.
```

### Opciones

- Zoom
- Phone
- In person by appointment

### Ubicaciones presenciales

```text
Most Precious Blood Catholic Church — Oviedo, Florida
San Pedro Center — Winter Park, Florida
```

### Diseño

- Una tarjeta para Zoom.
- Una tarjeta para llamada telefónica.
- Una tarjeta para encuentros presenciales.
- No usar el logotipo oficial de Zoom si no existe autorización o activo aprobado; usar un icono genérico de video.
- Incluir CTA contextual:
  - Email to Schedule
  - Call Now

---

## 15. Sección final de conversión

Debe ser la sección visualmente más fuerte después del hero.

### Fondo

`--color-forest`

### Título

```text
Ready to explore your spiritual journey?
```

### Texto

```text
Begin with a complimentary 30-minute conversation to ask questions, learn what spiritual direction can offer, and see whether it feels right for you.
```

### Botones

Principal:

```text
Email Nathalie
```

Secundario:

```text
Call 321-231-0058
```

### Datos visibles

```text
SacredGuideNBS@gmail.com
321-231-0058
English & Spanish
```

---

## 16. Footer

Incluir:

```text
Nathalie Bose-Silver
Catholic Spiritual Director
321-231-0058
SacredGuideNBS@gmail.com
```

Enlaces:

- About
- What to Expect
- Contact
- Privacy

Texto legal:

```text
Spiritual direction is not a substitute for counseling, psychotherapy, medical care, or emergency services.
```

Copyright dinámico:

```text
© {currentYear} Nathalie Bose-Silver. All rights reserved.
```

No incluir redes sociales que no hayan sido proporcionadas.

---

## 17. Diseño responsive

### Mobile first

#### Móvil

- Ancho de contenido con padding de 20–24 px.
- H1 entre 42 y 52 px, usando `clamp()`.
- Botones al 100% del ancho cuando sea necesario.
- Hero en una sola columna.
- Imagen principal debajo del contenido.
- Tarjetas apiladas.
- Teléfono y email sin romper el layout.
- Header compacto.
- CTA móvil opcional fijo en la parte inferior con dos botones:
  - Call
  - Email

#### Tablet

- Hero puede mantenerse en dos columnas si hay espacio.
- Tarjetas en dos columnas.

#### Desktop

- Contenedor máximo de 1200–1280 px.
- Amplio espacio en blanco.
- Texto con longitud máxima cómoda.
- Secciones con padding vertical de 88–120 px.

---

## 18. Accesibilidad

Cumplir como mínimo con buenas prácticas WCAG 2.1 AA:

- Contraste suficiente entre texto y fondo.
- Un solo `h1`.
- Jerarquía correcta de encabezados.
- Botones y enlaces con estados `hover`, `focus-visible` y `active`.
- Navegación completa por teclado.
- `aria-label` claro en botones de llamada y correo cuando sea necesario.
- Texto alternativo significativo para el logo.
- Decoraciones con `aria-hidden="true"`.
- No depender solamente del color para comunicar estados.
- Tamaño mínimo táctil de 44 × 44 px.
- Respetar `prefers-reduced-motion`.
- Evitar texto importante incrustado dentro de imágenes.

Alt recomendado:

```text
Spiritual Journey emblem featuring a winding path, butterflies, hands holding a flame, and a dove.
```

---

## 19. SEO y metadatos

### Title

```text
Nathalie Bose-Silver | Catholic Spiritual Director
```

### Meta description

```text
Compassionate Catholic spiritual direction in English and Spanish. Schedule a free 30-minute consultation with Nathalie Bose-Silver by phone or email.
```

### Open Graph

```text
og:title: Nathalie Bose-Silver | Spiritual Direction
og:description: Personalized, prayerful spiritual direction in English and Spanish.
og:type: website
```

Usar el logo principal como imagen Open Graph cuando sea posible.

### Datos estructurados

Agregar JSON-LD de tipo `ProfessionalService` o `Person`, usando solamente la información confirmada:

- Name
- Job title
- Telephone
- Email
- Area served: Oviedo and Winter Park, Florida
- Available languages: English and Spanish

No incluir dirección postal porque no fue proporcionada.

---

## 20. Recomendación técnica

Si el repositorio no tiene una arquitectura definida, implementar con:

```text
Next.js
TypeScript
Tailwind CSS
Lucide React
```

### Componentes sugeridos

```text
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    Header.tsx
    Hero.tsx
    SectionHeading.tsx
    WhatIsSpiritualDirection.tsx
    Expectations.tsx
    Approach.tsx
    About.tsx
    MeetingOptions.tsx
    FinalCTA.tsx
    Footer.tsx
    ContactButtons.tsx
  data/
    site-content.ts
public/
  images/
    spiritual-journey/
```

Si el proyecto usa otra tecnología, mantener la misma estructura conceptual y adaptar los componentes al stack existente. No reemplazar una configuración funcional del repositorio innecesariamente.

---

## 21. Reglas para Codex

Codex debe:

1. Inspeccionar primero el repositorio y respetar el stack, estructura y convenciones existentes.
2. Reutilizar componentes y estilos actuales cuando sean compatibles.
3. Crear componentes pequeños, legibles y reutilizables.
4. Mantener el contenido centralizado en un archivo de datos cuando resulte práctico.
5. Implementar los CTA con enlaces `tel:` y `mailto:` reales.
6. No crear un formulario de contacto que requiera backend.
7. No agregar testimonios, precios, redes sociales ni credenciales inventadas.
8. No inventar direcciones, horarios ni enlaces de calendario.
9. Optimizar las imágenes sin recortarlas de forma agresiva.
10. Usar `next/image` cuando el proyecto sea Next.js.
11. Mantener todos los textos visibles en inglés, salvo el indicador “English & Spanish”.
12. Asegurar que la landing funcione sin JavaScript para las acciones esenciales de teléfono y correo.
13. Ejecutar lint, type-check y build antes de finalizar.
14. Corregir cualquier error introducido por la implementación.
15. Reportar al final:
    - Archivos creados
    - Archivos modificados
    - Decisiones relevantes
    - Comandos de validación ejecutados
    - Cualquier dato pendiente de confirmar

---

## 22. Criterios de aceptación

La implementación se considera completa cuando:

- La página es responsive en móvil, tablet y escritorio.
- El hero explica claramente el servicio.
- Existe un CTA visible para la consulta gratuita.
- El teléfono abre el marcador mediante `tel:+13212310058`.
- El correo abre el cliente mediante `mailto:`.
- El contenido explica qué es la dirección espiritual.
- Se presenta el enfoque, experiencia y modalidad de Nathalie.
- Se indica que las sesiones están disponibles en inglés y español.
- Se indica que la dirección espiritual no es terapia.
- Se reutiliza el logo principal proporcionado.
- No se presenta texto relevante únicamente como parte de una imagen.
- La página tiene navegación accesible.
- No hay overflow horizontal en 320 px de ancho.
- No existen errores de TypeScript, lint o build.
- Lighthouse debe aspirar a:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 90+

---

## 23. Prompt de ejecución sugerido para Codex

```text
Read DESIGN.md completely before making changes.

Inspect the existing repository and implement the Spiritual Journey landing page according to the specification. Preserve the current stack and conventions whenever possible. Build a polished, mobile-first, accessible single-page experience with working tel: and mailto: calls to action.

Use the supplied Spiritual Journey logo as the primary visual asset. Do not display the text-heavy flyers as full-page images; translate their useful content into accessible HTML sections.

Do not invent content, credentials, testimonials, pricing, social links, addresses, or scheduling URLs. Keep the visible website copy in English. Run the repository's lint, type-check, tests, and production build where available, fix implementation errors, and summarize the work completed.
```

---

## 24. Información confirmada

```text
Name: Nathalie Bose-Silver
Role: Catholic Spiritual Director
Phone: 321-231-0058
Email: SacredGuideNBS@gmail.com
Languages: English and Spanish
Introductory consultation: 30 minutes, free
Regular sessions: One hour, monthly
Meeting methods: Zoom, phone, and in person by appointment
Locations mentioned: Oviedo, Florida and Winter Park, Florida
```

## 25. Datos que deben confirmarse antes de publicar

- Dominio final.
- Política de privacidad.
- Consentimiento para mostrar los nombres de las dos ubicaciones presenciales.
- Disponibilidad exacta de citas presenciales.
- URL de reserva, en caso de que posteriormente se use Calendly u otra plataforma.
- Precio de las sesiones regulares, si se desea publicarlo.
- Imagen final optimizada y autorización de uso del emblema.
