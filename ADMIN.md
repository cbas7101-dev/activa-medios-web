# Activa Medios — Panel de Administración

## Arquitectura

```
/
├── db/
│   ├── index.ts          # Conexión Neon Postgres (Drizzle ORM)
│   ├── schema.ts         # Tablas: user, session, account, verification,
│   │                     #   insumos, movimientos_stock, publicaciones,
│   │                     #   imagenes_generadas
│   └── seed.ts           # Script de inicialización (crear primer admin)
├── src/
│   ├── components/admin/
│   │   ├── Sidebar.tsx         # Navegación lateral (responsive)
│   │   ├── LoginForm.tsx       # Inicio de sesión
│   │   ├── Dashboard.tsx       # Resumen: stock bajo + próximas pubs + últimas imágenes
│   │   ├── InventoryTable.tsx  # Listado con búsqueda y filtro por categoría
│   │   ├── InsumoForm.tsx      # Alta/edición de insumo
│   │   ├── InsumoDetail.tsx    # Detalle con editor de stock + historial
│   │   ├── StockEditor.tsx     # Botones +/- y ajuste numérico directo
│   │   ├── MovementHistory.tsx # Historial de movimientos por insumo
│   │   ├── PublicationsList.tsx # Listado con filtros + duplicar/eliminar
│   │   ├── PublicationForm.tsx  # Crear/editar publicación
│   │   ├── Calendar.tsx        # Calendario mensual de publicaciones
│   │   ├── ImageGenerator.tsx  # Generador de imágenes IA
│   │   └── ImageGallery.tsx    # Galería de imágenes generadas
│   ├── layouts/
│   │   └── AdminLayout.astro   # Layout del panel con sidebar
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── index.astro           # Dashboard
│   │   │   ├── login.astro           # Login
│   │   │   ├── insumos/              # CRUD inventario
│   │   │   ├── publicaciones/        # CRUD publicaciones
│   │   │   └── imagenes/             # Generador IA + galería
│   │   └── api/
│   │       ├── auth/                 # Better-Auth endpoints + setup
│   │       ├── insumos/              # CRUD insumos + movimientos
│   │       ├── movimientos/          # Registrar movimiento de stock
│   │       ├── publicaciones/        # CRUD publicaciones + duplicar
│   │       └── imagenes/             # Generar IA + galería
│   ├── lib/
│   │   ├── auth.ts          # Servidor Better-Auth
│   │   ├── auth-client.ts   # Cliente Better-Auth
│   │   └── navigation.ts    # Helper de navegación cliente
│   ├── middleware.ts        # Protección de rutas /admin
│   └── styles/global.css    # Tailwind v4
├── astro.config.mjs         # output: server, adapter: @astrojs/vercel
├── drizzle.config.ts        # Drizzle Kit config
└── .env                     # Variables de entorno
```

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| ALL | `/api/auth/[...auth]` | Better-Auth handler (login, logout, session) |
| POST | `/api/auth/setup` | Crear primer usuario admin |
| GET | `/api/insumos` | Listar insumos (?q=&categoria=) |
| POST | `/api/insumos` | Crear insumo |
| GET | `/api/insumos/[id]` | Obtener insumo |
| PUT | `/api/insumos/[id]` | Actualizar insumo |
| DELETE | `/api/insumos/[id]` | Eliminar insumo |
| GET | `/api/insumos/[id]/movimientos` | Historial de movimientos |
| POST | `/api/movimientos` | Registrar movimiento de stock |
| GET | `/api/publicaciones` | Listar publicaciones |
| POST | `/api/publicaciones` | Crear publicación |
| GET | `/api/publicaciones/[id]` | Obtener publicación |
| PUT | `/api/publicaciones/[id]` | Actualizar publicación |
| DELETE | `/api/publicaciones/[id]` | Eliminar publicación |
| POST | `/api/publicaciones/[id]/duplicar` | Duplicar como plantilla |
| POST | `/api/imagenes/generar` | Generar imagen con IA |
| GET | `/api/imagenes` | Listar imágenes generadas |
| DELETE | `/api/imagenes/[id]` | Eliminar imagen |

## Plan de implementación por fases

### Fase 1 — Fundación ✅
- [x] Configurar Astro con output server + Vercel adapter
- [x] Instalar Better-Auth, Drizzle ORM, Neon serverless, Vercel Blob, OpenAI
- [x] Crear esquema de base de datos (Drizzle)
- [x] Implementar autenticación con Better-Auth
- [x] Middleware de protección de rutas /admin
- [x] Layout del panel con sidebar responsive

### Fase 2 — Inventario ✅
- [x] API REST para insumos (CRUD + filtros)
- [x] API para movimientos de stock
- [x] Listado con búsqueda y filtro por categoría
- [x] Formulario de alta/edición
- [x] Editor rápido de stock (+/-) con registro automático
- [x] Alertas visuales de stock bajo
- [x] Historial de movimientos por insumo

### Fase 3 — Publicaciones ✅
- [x] API REST para publicaciones (CRUD + filtros)
- [x] API para duplicar publicaciones
- [x] Crear, editar, programar y eliminar publicaciones
- [x] Calendario mensual con publicaciones programadas
- [x] Etiquetado por sub-marca con prioridad visual a cursos

### Fase 4 — Generador IA ✅
- [x] API de generación de imágenes con OpenAI DALL-E
- [x] Aplicación de paleta cromado + azul eléctrico vía prompt
- [x] Formatos: 4:5 (feed), 9:16 (stories), 1:1 (cuadrado)
- [x] Almacenamiento en Vercel Blob
- [x] Descarga directa y compartir por WhatsApp
- [x] Galería reutilizable dentro del panel

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env con:
#    DATABASE_URL (Neon Postgres desde Vercel Marketplace)
#    BETTER_AUTH_SECRET (generar con: openssl rand -hex 32)
#    BETTER_AUTH_URL=http://localhost:4321
#    OPENAI_API_KEY (de OpenAI)
#    BLOB_READ_WRITE_TOKEN (de Vercel Blob)

# 3. Migrar base de datos
npm run db:push

# 4. Crear usuario admin
curl -X POST http://localhost:4321/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@activamedios.ec","password":"tu-password","name":"Admin"}'

# 5. Iniciar dev server
astro dev --background
```

## Despliegue en Vercel

Conectar el repositorio a Vercel. Las variables de entorno se configuran en el dashboard:
- `DATABASE_URL` → Neon Postgres (provisionar desde Vercel Marketplace)
- `BETTER_AUTH_SECRET` → string aleatorio
- `BETTER_AUTH_URL` → URL del deploy (ej: https://activa-web.vercel.app)
- `OPENAI_API_KEY` → clave de OpenAI
- `BLOB_READ_WRITE_TOKEN` → token de Vercel Blob
