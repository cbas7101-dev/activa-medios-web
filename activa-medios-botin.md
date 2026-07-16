# Activa Medios — Botín de Materia Prima

> **Dominio:** activamedios.com  
> **Empresa:** Activa Medios (antes Aktiva Publicidad, fundada 2007)  
> **Ubicación:** Av. 6 de Diciembre E9-39 y de las Hortensias, 2do piso, El Inca, Quito, Ecuador  
> **Teléfono:** 0999 099 175 / (02) 2478-800  
> **Email:** activamedios.ec@gmail.com  
> **Horario:** Lun–Vie 8:00–18:00 / Sáb 9:00–13:00  
> **Slogan:** *"Transformamos espacios con comunicación visual profesional"*  
> **Sub-marcas:** Aktiva Cursos, Aktiva Store, Aktiva Market

---

## 1. Identidad Visual

### 1.1 Paleta de Colores

| Uso | Color | HEX/Valor |
|-----|-------|-----------|
| Primario (marca) | Rojo oscuro | `#8B0000` |
| CTA / Acentos | Rojo brillante | `#DC2626` |
| Hover CTA | Rojo oscuro | `#B91C1C` |
| Dorado premium (acento secundario) | Dorado | `#C8A45C` |
| Dorado claro | Dorado claro | `#D4B96A` |
| Fondo principal | Negro | `#000000` |
| Texto principal | Blanco | `#FFFFFF` |
| Texto secundario | Blanco opaco | `rgba(255,255,255,0.55)` |
| Texto terciario | Blanco tenue | `rgba(255,255,255,0.4)` |
| Bordes glassmorphism | Blanco semitransp. | `rgba(255,255,255,0.12)` |
| Fondos glassmorphism | Blanco semitransp. | `rgba(255,255,255,0.08)` / `rgba(255,255,255,0.1)` |
| WhatsApp | Verde | `#25D366` |
| Hover WhatsApp | Verde oscuro | `#20BD5A` |
| Stats/Números destacados | Dorado | `var(--color-gold)` |
| Placeholder inputs | Blanco tenue | `rgba(255,255,255,0.35)` |
| Hover social icons | Rojo suave bg | `rgba(220,38,38,0.2)` |

### 1.2 Tipografía

| Familia | Uso | Fuente |
|---------|-----|--------|
| **Roboto** | Cuerpos de texto general | Google Fonts (100–900) |
| **Roboto Slab** | Énfasis / titulares alternos | Google Fonts (100–900) |
| **Montserrat** | Headings / títulos | Google Fonts (100–900) |
| **Inter** | Headings en páginas React | Variable Font (300–900) vía WooCommerce |
| **Barlow** | Body text en páginas React inline | system-ui como fallback |

### 1.3 Glassmorphism (estilo recurrente)

```css
background: rgba(255,255,255,0.1);
backdrop-filter: blur(8px);
-webkit-backdrop-filter: blur(8px);
border: 1px solid rgba(255,255,255,0.12);
box-shadow: inset 0 1px 1px rgba(255,255,255,0.12);
border-radius: 16px;
```

Variante más sutil:
```css
background: rgba(255,255,255,0.08);
backdrop-filter: blur(4px);
border: 1px solid rgba(255,255,255,0.12);
border-radius: 999px;
```

### 1.4 Z-Index System

| Componente | Valor |
|------------|-------|
| Base | 1 |
| Navbar | 40 |
| WhatsApp FAB | 50 |
| Modal / Lightbox | 60 |
| Toast | 70 |
| Chat flotante | 9999 / 10000 |

### 1.5 Layout Tokens

| Propiedad | Valor |
|-----------|-------|
| Max-width contenedor | 1280px / 1200px |
| Padding móvil | 16–20px |
| Padding desktop | 24–40px |
| Border radius tarjetas | 16px |
| Border radius botones | 999px (pill) |
| Border radius inputs | 12px / 10px / 8px |
| Gap grid tarjetas | 24px |
| Transition estándar | `all 300ms` / `all 200ms` |

---

## 2. Mapa de Contenidos

### 2.1 Páginas Principales

| # | Título | Slug | ID WP | Plantilla | Tipo de contenido |
|---|--------|------|-------|-----------|-------------------|
| 1 | Inicio | `/` | 1256 | `elementor_canvas` | React SPA via snippet |
| 2 | Rotulación 3D | `/rotulacion-3d/` | 1336 | `elementor_canvas` | React inline |
| 3 | Servicios | `/servicios/` | 1272 | `elementor_canvas` | Híbrido Elementor + React |
| 4 | Galería | `/galeria/` | 1339 | `elementor_canvas` | React inline |
| 5 | Sobre Nosotros | `/sobre/` | 134 | `elementor_canvas` | React inline |
| 6 | Contacto | `/contacto/` | 1343 | `elementor_canvas` | React inline |
| 7 | Insumos | `/insumos/` | 1345 | `elementor_canvas` | React inline |
| 8 | Cursos | `/cursos/` | 1341 | `elementor_canvas` | React inline |
| 9 | Cotización 3D | `/cotizacion-3d/` | 1347 | `elementor_canvas` | React inline |
| 10 | Carrito de Compras | `/carrito-compras/` | 1349 | `elementor_canvas` | React inline |
| 11 | Otros Servicios | `/otros-servicios/` | 1743 | `elementor_canvas` | React inline |

### 2.2 Páginas de Producto (8)

| # | Producto | Slug | ID WP | precioBase |
|---|----------|------|-------|------------|
| 1 | Perfil de Aluminio | `/producto-perfil-aluminio/` | 1351 | $85 |
| 2 | LEDs 12V / 110V | `/producto-leds-12v-110v/` | 1353 | $0.35 |
| 3 | Mini LEDs 110V | `/producto-mini-leds-110v/` | 1355 | $0.40 |
| 4 | Pega Acrílica | `/producto-pega-acrilica/` | 1357 | $18 |
| 5 | Polvo Acrílico 500g | `/producto-polvo-acrilico/` | 1359 | $15 |
| 6 | Dobladora de Perfiles | `/producto-dobladora-perfiles/` | 1361 | $10,000 |
| 7 | Temporizador Digital | `/producto-temporizador-digital/` | 1284 | $16.99 |
| 8 | Silvatream | `/producto-silvatream/` | 1281 | $25 |

### 2.3 Páginas Legacy (ya no activas como React)

| Ruta | Destino |
|------|---------|
| `/nuevo-inicio/` | Redirige al Home `/` |
| `/servicios-complementarios/` | Menú Elementor apunta aquí (página duplicada de servicios) |

---

## 3. Arquitectura de URLs

### 3.1 Navegación Principal (React Navbar)

```
Inicio           → /
Rotulación 3D    → /rotulacion-3d/
Insumos          → /insumos/
Cursos           → /cursos/
Galería          → /galeria/
Servicios        → /servicios/
Sobre Nosotros   → /sobre/
Contacto         → /contacto/
[COTIZAR AHORA]  → /cotizacion-3d/
```

### 3.2 Redes Sociales

| Plataforma | URL |
|------------|-----|
| Facebook | https://www.facebook.com/ActivaPubIicidad |
| Instagram | https://www.instagram.com/activa.medios/ |
| TikTok | https://www.tiktok.com/@activa.medios |
| YouTube (Elementor) | https://www.youtube.com/@aktivatv5773 |
| YouTube (React pages) | https://www.youtube.com/@activamediosen |

> **Nota:** Dos URLs de YouTube diferentes según la página. Confirmar cuál es la oficial.

### 3.3 WhatsApp

| Propósito | URL |
|-----------|-----|
| Link acortado | https://wa.link/0evwku |
| API directa | https://api.whatsapp.com/send?phone=593999099175&text=... |
| wa.me | https://wa.me/593999099175 |

### 3.4 Sitios Satélite

| Sitio | URL |
|-------|-----|
| Aktiva Cursos | http://www.aktivacursos.com |
| Aktiva Store | http://www.aktivastore.com |
| Firulais Studio (crédito diseño) | https://firulaistudio.com/ |

### 3.5 Anclas Internas

| Ancla | Sección |
|-------|---------|
| `#trabajos` | Galería / WorksShowcase (Rotulación 3D) |
| `#up` | Volver arriba (Elementor top bar) |

---

## 4. Copywriting — Secciones

### 4.1 Home (página principal)

**Hero:**
- Título: "Dale volumen a tu marca" / "Rótulos 3D con presencia"
- Subtítulo: "Fabricamos letras corpóreas con acrílico, PVC, aluminio compuesto y neón flex LED. Transformamos espacios con comunicación visual profesional."
- CTA principal: "Cotiza tu rótulo 3D" → `/cotizacion-3d/`
- CTA secundario: "Ver trabajos" → `#trabajos`

**ServiciosPreview (3 tarjetas):**
- **Rotulación 3D:** "Letras corpóreas con volumen y presencia. Fabricamos rótulos 3D en distintos materiales, con iluminación LED."
- **Insumos de Rotulación:** "Perfiles de aluminio, LEDs, silvatream, pega acrílica y todo para tu taller."
- **Aktiva Cursos:** "Formación profesional en rotulación, diseño gráfico y técnicas de instalación."

**StatsSection (4 contadores):**
- "15+ años de experiencia"
- "2,500+ proyectos realizados"
- "98% clientes satisfechos"
- "24h entrega urgente"

**Testimonials:**
- Clientes con quote, avatar (iniciales en círculo rojo), estrellas
- Frases de clientes sobre calidad, servicio, instalación

**CTA Section:**
- Título: "¿Listo para tu proyecto?"
- Subtítulo: "Contáctanos ahora y recibe un presupuesto personalizado en 24 horas."
- Botón: "Contáctanos ahora" → `/contacto/`

### 4.2 Rotulación 3D

**Hero:** "Dale volumen a tu marca"
- **ProcessSection (4 pasos):** Diseño, Fabricación, Instalación, Postventa
- **WorksShowcase (grid 2×3):** 6 fotos de proyectos reales con hover zoom
- **CTAFinal:** Tarjeta liquid-glass invitando a cotizar

### 4.3 Servicios

- **Título:** "LO QUE HACEMOS — Nuestros servicios"
- **Subtítulo:** "Soluciones integrales de comunicación visual para empresas que quieren destacar."
- **3 tarjetas:** Rotulación 3D, Insumos, Aktiva Cursos (con tags de materiales)

### 4.4 Sobre Nosotros

- **Título:** "Contamos historias visuales desde 2010"
- **Historia:** Fundada 2007 en Quito. Inició como Aktiva Publicidad. 16+ años de servicio. Evolución a Activa Medios.
- **Stats:** Mismos 4 contadores que Home
- **TallerSection:** Grid 2×3 de fotos del taller
- **TeamSection:** 4 tarjetas placeholder (nombres por confirmar)
- **BusinessUnits:** Activa Cursos, Activa Store, Activa Market
- **CTA:** "Cotiza tu proyecto" → `/cotizacion-3d/`

### 4.5 Contacto

- **Título:** "CONTACTO — Hablemos de tu proyecto"
- **Subtítulo:** "Cuéntanos qué necesitas y te enviaremos un presupuesto personalizado en 24 horas."
- **Dirección:** Av. 6 de Diciembre E9-39 y de las Hortensias, 2do piso, El Inca, Quito
- **Teléfono:** 0999 099 175 / (02) 2478-800
- **Email:** activamedios.ec@gmail.com
- **Horario:** Lun – Vie: 8:00 – 18:00 / Sáb: 9:00 – 13:00
- **Formulario:** Nombre, Email, Tipo de proyecto (Rotulación 3D / Insumos / Cursos / Señalética / Otro), Mensaje → enviado por WhatsApp

### 4.6 Insumos

- **Productos:** Perfil Aluminio ($85), LEDs 12V/110V ($0.35), Mini LEDs 110V ($0.40), Pega Acrílica ($18), Polvo Acrílico 500g ($15), Dobladora Perfiles ($10,000), Temporizador Digital ($16.99), Silvatream ($25)
- Cada producto con imagen, descripción, precio y botón "Agregar al carrito"
- **Carrito:** Cantidad editable, total, envío por WhatsApp

### 4.7 Cursos

- **Título:** "AKTIVA CURSOS — Formación profesional"
- **Subtítulo:** "Aprende con expertos que tienen más de 15 años de experiencia en el campo. Cursos prácticos con certificación."
- **4 cursos:**
  - Rotulación Profesional (40h, Básico-Intermedio)
  - Neón Flex LED (24h, Intermedio)
  - Diseño Gráfico para Rotulación (32h, Básico)
  - Instalación y Mantenimiento (20h, Avanzado)
- **CTA:** "Inscríbete ahora" → `/contacto/`

### 4.8 Galería

- **6 categorías:** Todos, Rotulación 3D, Cursos, Rotulación, Señaléticas, Acrílicos
- **39 imágenes totales:** Lightbox incluido, grid responsive 4→3→2→1 columnas
- **WhatsApp link:** wa.link/0evwku

### 4.9 Cotización 3D

- **Cotizador multi-paso (4 pasos):**
  1. Datos del proyecto (nombre, teléfono, dimensiones fachada, texto, alto letra)
  2. Acabados (multi-select: 7 opciones con sub-acabados para acero inoxidable)
  3. Instalación (Sí/No, aviso si ancho > 4m)
  4. Resumen + botón WhatsApp
- **Cálculo TOL:** Factor por ancho de letra (angostas 0.4, medias 0.7, anchas 0.95, espacio 0.45)
- **Preview 3D:** Letra "A" con text-shadow multi-capa y front gradient
- **Subida de imágenes:** Endpoint `/wp-json/activa/v1/upload` con key

### 4.10 Otros Servicios

- **9 servicios:** Gigantografías, Lona Microperforada, Vallas Publicitarias, Letras Corpóreas, Láser Grabado, Lona Front Light, Doblado de Aluminio, Adhesivos, Impresión UV
- Cada uno con imagen de fondo, descripción y CTA WhatsApp directo

### 4.11 Navbar (consistente en todas las páginas)

```
[LOGO]  INICIO  ROTULACIÓN 3D  INSUMOS  CURSOS  GALERÍA  SERVICIOS  SOBRE NOSOTROS  CONTACTO  [COTIZAR AHORA]
```

### 4.12 Footer (consistente en todas las páginas)

```
[LOGO]
"Transformamos espacios con comunicación visual profesional."

NAVEGACIÓN:         CONTACTO:
Inicio              0999 099 175
Rotulación 3D       activamedios.ec@gmail.com
Insumos             Quito, Ecuador
Cursos
Galería
Servicios
Nosotros
Contacto

[FB] [IG] [TT] [YT]
© 2026 Activa Medios
```

### 4.13 WhatsApp Button (flotante)

- Botón verde (#25D366) fijo abajo-derecha
- Icono Lucide `MessageCircle`
- Tooltip: "¡Escríbenos!"
- Hover: scale 1.1
- z-index: 50

---

## 5. Inventario Multimedia

### 5.1 Logotipos

| Archivo | Ruta WP | ID | Dimensiones | Uso |
|---------|---------|----|-------------|-----|
| Logo-activa-medios@4x.png | `/uploads/2023/03/Logo-activa-medios@4x.png` | 16 | 742×259 | Header Elementor |
| En-blanco@4x-1.png | `/uploads/2023/03/En-blanco@4x-1.png` | 202 | 742×259 | Sobre Nosotros |
| logo-activa-medios.png | `/uploads/2026/06/logo-activa-medios.png` | — | variable | Navbar React (2026) |
| image-2.png | `/uploads/2023/03/image-2.png` | 763 | 742×259 | Footer Elementor |
| cropped-Logo-activa-medios@4x.png | `/uploads/2023/03/cropped-cropped-Logo-activa-medios@4x.png` | — | 32×32 | Favicon |
| cropped-Logo-activa-medios@4x-192x192.png | similar | — | 192×192 | App icon |
| cropped-Logo-activa-medios@4x-180x180.png | similar | — | 180×180 | Apple touch icon |
| cropped-Logo-activa-medios@4x-270x270.png | similar | — | 270×270 | MS Tile |

### 5.2 Hero / Backgrounds

| Archivo | Ruta WP | ID | Dimensiones |
|---------|---------|----|-------------|
| Nuestra-Historia-scaled.jpg | `/uploads/2023/04/Nuestra-Historia-scaled.jpg` | 997 | 2048×1152 |
| Nuestra-Historia-1024x576.jpg | thumbnail | — | 1024×576 |
| Nuestra-Historia-768x432.jpg | thumbnail | — | 768×432 |

### 5.3 Elementor Decorativos

| Archivo | Ruta WP | ID | Uso |
|---------|---------|----|-----|
| Rino-Activo-ai.png | `/uploads/2023/03/Rino-Activo-ai.png` | 778 | Mascot rinoceronte (footer) |
| botonac22@3x.png | `/uploads/2023/03/botonac22@3x.png` | 1142 | Botón Aktiva Cursos |
| botonac11@3x.png | `/uploads/2023/03/botonac11@3x.png` | 1141 | Botón Aktiva Store |
| Tarjetas-de-credito-22.png | `/uploads/2023/03/Tarjetas-de-credito-22.png` | 1146 | Medios de pago |

### 5.4 Client Logos Carousel (Sobre Nosotros)

12 logos en miniatura Elementor: Remax, Misska 3, Panificadora Ambato, Chicberry, Good Year, Sol Caribe, y más.

### 5.5 Galería de Proyectos

**60+ imágenes** en `/uploads/2023/` organizadas por subdirectorios de año:
- Rotulación 3D (24+ fotos de proyectos reales 2013–2026)
- Cursos (5 fotos)
- Rotulación (4 fotos)
- Señaléticas (4 fotos)
- Acrílicos (3 fotos)
- Imágenes WhatsApp 2026 (7+)

### 5.6 Imágenes de Producto (Insumos)

8 productos en `/uploads/2026/` con naming `mqtrvf...` (WhatsApp).

### 5.7 Videos

| Archivo | Descripción |
|---------|-------------|
| YouTube `_mmeh75ZOdQ` | Video institucional (Sobre Nosotros) |

### 5.8 CDNs Externas

| Recurso | URL Base |
|---------|----------|
| React 18 | `https://unpkg.com/react@18/umd/react.production.min.js` |
| ReactDOM | `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js` |
| GSAP | `https://unpkg.com/gsap@3/dist/gsap.min.js` |
| GSAP ScrollTrigger | `https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js` |
| Tailwind CSS | `https://cdn.tailwindcss.com` (CDN) |
| Babel standalone | `https://unpkg.com/@babel/standalone/babel.min.js` |
| Lucide icons | `https://unpkg.com/lucide@latest` |

---

## 6. Funcionalidades Clave

### 6.1 Carrito de Compras (WooCommerce + React)

- Productos con precioBase, variantes (opcionales), cantidad editable
- `getCartCount()` con `localStorage` persistence
- `actualizarCarrito(producto, cantidad, variante)` para WhatsApp order
- Resumen con subtotal, productos listados
- Botón "Enviar pedido por WhatsApp"

### 6.2 Cotizador 3D

- 4 pasos con barra de progreso
- Fórmula TOL (ancho de letra × factor por carácter)
- Multi-select de acabados con 7 opciones + 3 sub-acabados
- Preview 3D de letra "A" con text-shadow extrusion
- Precio en vivo con desglose
- Envío a WhatsApp con formato estructurado

### 6.3 Animaciones (GSAP)

- `power4.out` easings (Emil Kowalski standard)
- `useReveal`: fade-in + translateY on scroll
- `useScrollAnim`: section-reveal con ScrollTrigger
- Stats counter: animación de 0 al número final
- Stagger reveal en tarjetas (galería, servicios)
- `prefers-reduced-motion` support

### 6.4 Chat / WhatsApp

- Botón flotante WhatsApp (#25D366)
- Mini-chat popup (solo frontend, sin backend)
- Formulario de contacto → WhatsApp
- Cotización → WhatsApp

---

## 7. Notas para la Migración

1. **Rutas 1:1** — Mantener slugs actuales para no perder posicionamiento SEO.
2. **CDNs → Bundles** — Reemplazar React CDN, Tailwind CDN, Babel standalone por build estático Astro.
3. **GSAP** — Mantener GSAP con import npm (no CDN).
4. **Imágenes** — Migrar Media Library a `/public/images/` con misma estructura de carpetas.
5. **WooCommerce** — Decidir si mantener WooCommerce en WP headless o migrar a solución Astro (Snipcart, Shopify, etc.).
6. **Formularios** — Reemplazar envío por WhatsApp con formulario Astro + servicio email/Formspree.
7. **Videos** — YouTube embed vs. video local optimizado.
8. **Snippet de upload** — Endpoint REST API para subida de imágenes en cotización requiere backend PHP; migrar a serverless function o Astro API endpoint.
9. **Colores** — `#8B0000` (rojo oscuro) es primario, `#DC2626` es CTA, `#C8A45C` es dorado premium. No hay colores rosados/pinkish.
10. **Tipografía** — Google Fonts: Roboto (body), Roboto Slab (énfasis), Montserrat (headings WP), Inter (headings React), Barlow (body React inline). Unificar a 2–3 familias en Astro.

---

*Documento generado el 16 de julio de 2026 a partir de auditoría completa del sitio activamedios.com.*
