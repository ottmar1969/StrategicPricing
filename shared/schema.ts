import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  credits: integer("credits").default(0),
  hasApiKey: boolean("has_api_key").default(false),
  apiProvider: text("api_provider"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content"),
  keywords: text("keywords").array(),
  nlpKeywords: text("nlp_keywords").array(),
  outline: text("outline"),
  contentType: text("content_type").notNull(),
  aiProvider: text("ai_provider").notNull(),
  status: text("status").default("draft"),
  creditsUsed: integer("credits_used").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const creditTransactions = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // 'purchase', 'usage', 'refund'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  provider: text("provider").notNull(),
  keyHash: text("key_hash").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const seoAnalysis = pgTable("seo_analysis", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  toolType: text("tool_type").notNull(),
  inputData: jsonb("input_data"),
  results: jsonb("results"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analyticsData = pgTable("analytics_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  toolType: text("tool_type").notNull(),
  data: jsonb("data"),
  insights: jsonb("insights"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertContentItemSchema = createInsertSchema(contentItems).pick({
  title: true,
  contentType: true,
  aiProvider: true,
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).pick({
  amount: true,
  type: true,
  description: true,
});

export const insertApiKeySchema = createInsertSchema(apiKeys).pick({
  provider: true,
  keyHash: true,
});

export const insertSeoAnalysisSchema = createInsertSchema(seoAnalysis).pick({
  toolType: true,
  inputData: true,
  results: true,
});

export const insertAnalyticsDataSchema = createInsertSchema(analyticsData).pick({
  toolType: true,
  data: true,
  insights: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = z.infer<typeof insertContentItemSchema>;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;
export type SeoAnalysis = typeof seoAnalysis.$inferSelect;
export type InsertSeoAnalysis = z.infer<typeof insertSeoAnalysisSchema>;
export type AnalyticsData = typeof analyticsData.$inferSelect;
export type InsertAnalyticsData = z.infer<typeof insertAnalyticsDataSchema>;
