import { pgTable, text, integer, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const insumos = pgTable("insumos", {
  id: uuid("id").defaultRandom().primaryKey(),
  nombre: text("nombre").notNull(),
  categoria: text("categoria").notNull(),
  unidadMedida: text("unidad_medida").notNull(),
  stockActual: integer("stock_actual").notNull().default(0),
  stockMinimo: integer("stock_minimo").notNull().default(0),
  imagenUrl: text("imagen_url"),
  proveedor: text("proveedor"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const movimientosStock = pgTable("movimientos_stock", {
  id: uuid("id").defaultRandom().primaryKey(),
  insumoId: uuid("insumo_id").notNull().references(() => insumos.id, { onDelete: "cascade" }),
  cantidad: integer("cantidad").notNull(),
  tipo: text("tipo").notNull(),
  usuario: text("usuario").notNull(),
  motivo: text("motivo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const publicaciones = pgTable("publicaciones", {
  id: uuid("id").defaultRandom().primaryKey(),
  titulo: text("titulo").notNull(),
  contenido: text("contenido"),
  imagenUrl: text("imagen_url"),
  plataformas: jsonb("plataformas").$type<string[]>().notNull().default([]),
  fechaPublicacion: timestamp("fecha_publicacion"),
  estado: text("estado").notNull().default("borrador"),
  submarca: text("submarca").notNull().default("aktiva-cursos"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const imagenesGeneradas = pgTable("imagenes_generadas", {
  id: uuid("id").defaultRandom().primaryKey(),
  prompt: text("prompt").notNull(),
  plataforma: text("plataforma").notNull(),
  estilo: text("estilo"),
  formato: text("formato"),
  imagenUrl: text("imagen_url").notNull(),
  relacionadoTipo: text("relacionado_tipo"),
  relacionadoId: text("relacionado_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
