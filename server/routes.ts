import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertContentItemSchema,
  insertCreditTransactionSchema,
  insertApiKeySchema,
  insertSeoAnalysisSchema,
  insertAnalyticsDataSchema
} from "@shared/schema";
import {
  generateContent,
  generateKeywords,
  generateTitles,
  generateOutline,
  generateNLPKeywords
} from "./services/openai";
import {
  analyzeIntentMapping,
  analyzeCompetitorDNA,
  optimizeForVoiceSearch,
  predictSERPFeatures,
  createSemanticKeywordWeb
} from "./services/seo";
import {
  analyzeUserJourney,
  predictContentPerformance,
  trackRevenueAttribution,
  estimateCompetitorTraffic,
  correlateSocialSentiment
} from "./services/analytics";
import {
  generateContentWithPerplexity,
  generateTrendingKeywords,
  analyzeCompetitorGaps,
  analyzeTrendingTopics,
  findSerpOpportunities,
  optimizeForEAT
} from "./services/perplexity";
import {
  applyCRAFTFramework,
  enhanceEATForAI,
  generateAIOptimizedContent,
  performAISEOAudit
} from "./services/ai-seo-optimizer";

const handleError = (error: unknown): string => {
  return error instanceof Error ? error.message : 'Unknown error occurred';
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/user", async (req, res) => {
    try {
      const userData = z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email()
      }).parse(req.body);
      
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/user/:id/credits", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { credits } = z.object({ credits: z.number() }).parse(req.body);
      
      const user = await storage.updateUserCredits(userId, credits);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/user/:id/api-key", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { hasApiKey, provider } = z.object({ 
        hasApiKey: z.boolean(),
        provider: z.string().optional()
      }).parse(req.body);
      
      const user = await storage.updateUserApiKey(userId, hasApiKey, provider);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Content routes
  app.get("/api/content/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const items = await storage.getContentItems(userId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const data = insertContentItemSchema.extend({
        userId: z.number()
      }).parse(req.body);
      
      const item = await storage.createContentItem(data);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/content/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteContentItem(id);
      if (!deleted) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/content/bulk", async (req, res) => {
    try {
      const { ids } = z.object({ ids: z.array(z.number()) }).parse(req.body);
      const deleted = await storage.deleteContentItems(ids);
      res.json({ success: deleted });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Content generation routes
  app.post("/api/generate/content", async (req, res) => {
    try {
      const { topic, contentType, provider } = z.object({
        topic: z.string(),
        contentType: z.string(),
        provider: z.string()
      }).parse(req.body);

      let content;
      if (provider.toLowerCase().includes('perplexity')) {
        content = await generateContentWithPerplexity({ topic, contentType, provider });
      } else {
        content = await generateContent({ topic, contentType, provider });
      }
      res.json({ content });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/generate/keywords", async (req, res) => {
    try {
      const { topic } = z.object({ topic: z.string() }).parse(req.body);
      const keywords = await generateKeywords({ topic });
      res.json({ keywords });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/generate/titles", async (req, res) => {
    try {
      const { topic } = z.object({ topic: z.string() }).parse(req.body);
      const titles = await generateTitles(topic);
      res.json({ titles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/generate/outline", async (req, res) => {
    try {
      const { topic } = z.object({ topic: z.string() }).parse(req.body);
      const outline = await generateOutline(topic);
      res.json({ outline });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/generate/nlp-keywords", async (req, res) => {
    try {
      const { content } = z.object({ content: z.string() }).parse(req.body);
      const keywords = await generateNLPKeywords(content);
      res.json({ keywords });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // SEO Tools routes
  app.post("/api/seo/intent-mapping", async (req, res) => {
    try {
      const { queries, userId } = z.object({ 
        queries: z.array(z.string()),
        userId: z.number()
      }).parse(req.body);

      const results = await analyzeIntentMapping(queries);
      
      await storage.createSeoAnalysis({
        toolType: "intent-mapping",
        inputData: { queries },
        results: results,
        userId
      });

      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/seo/competitor-dna", async (req, res) => {
    try {
      const { url, content, userId } = z.object({ 
        url: z.string(),
        content: z.string(),
        userId: z.number()
      }).parse(req.body);

      const result = await analyzeCompetitorDNA(url, content);
      
      await storage.createSeoAnalysis({
        toolType: "competitor-dna",
        inputData: { url, content },
        results: result,
        userId
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/seo/voice-search", async (req, res) => {
    try {
      const { keywords, userId } = z.object({ 
        keywords: z.array(z.string()),
        userId: z.number()
      }).parse(req.body);

      const results = await optimizeForVoiceSearch(keywords);
      
      await storage.createSeoAnalysis({
        toolType: "voice-search",
        inputData: { keywords },
        results: results,
        userId
      });

      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/seo/serp-features", async (req, res) => {
    try {
      const { keywords, userId } = z.object({ 
        keywords: z.array(z.string()),
        userId: z.number()
      }).parse(req.body);

      const results = await predictSERPFeatures(keywords);
      
      await storage.createSeoAnalysis({
        toolType: "serp-features",
        inputData: { keywords },
        results: results,
        userId
      });

      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/seo/semantic-web", async (req, res) => {
    try {
      const { keyword, userId } = z.object({ 
        keyword: z.string(),
        userId: z.number()
      }).parse(req.body);

      const result = await createSemanticKeywordWeb(keyword);
      
      await storage.createSeoAnalysis({
        toolType: "semantic-web",
        inputData: { keyword },
        results: result,
        userId
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Analytics Tools routes
  app.post("/api/analytics/user-journey", async (req, res) => {
    try {
      const { behaviorData, userId } = z.object({ 
        behaviorData: z.any(),
        userId: z.number()
      }).parse(req.body);

      const result = await analyzeUserJourney(behaviorData);
      
      await storage.createAnalyticsData({
        toolType: "user-journey",
        data: behaviorData,
        insights: result,
        userId
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/analytics/content-performance", async (req, res) => {
    try {
      const { contentData, userId } = z.object({ 
        contentData: z.any(),
        userId: z.number()
      }).parse(req.body);

      const result = await predictContentPerformance(contentData);
      
      await storage.createAnalyticsData({
        toolType: "content-performance",
        data: contentData,
        insights: result,
        userId
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/analytics/revenue-attribution", async (req, res) => {
    try {
      const { conversionData, userId } = z.object({ 
        conversionData: z.any(),
        userId: z.number()
      }).parse(req.body);

      const results = await trackRevenueAttribution(conversionData);
      
      await storage.createAnalyticsData({
        toolType: "revenue-attribution",
        data: conversionData,
        insights: results,
        userId
      });

      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/analytics/competitor-traffic", async (req, res) => {
    try {
      const { domain, userId } = z.object({ 
        domain: z.string(),
        userId: z.number()
      }).parse(req.body);

      const result = await estimateCompetitorTraffic(domain);
      
      await storage.createAnalyticsData({
        toolType: "competitor-traffic",
        data: { domain },
        insights: result,
        userId
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/analytics/social-sentiment", async (req, res) => {
    try {
      const { socialData, performanceData, userId } = z.object({ 
        socialData: z.any(),
        performanceData: z.any(),
        userId: z.number()
      }).parse(req.body);

      const results = await correlateSocialSentiment(socialData, performanceData);
      
      await storage.createAnalyticsData({
        toolType: "social-sentiment",
        data: { socialData, performanceData },
        insights: results,
        userId
      });

      res.json({ results });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Credit transaction routes
  app.get("/api/credits/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const transactions = await storage.getCreditTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/credits", async (req, res) => {
    try {
      const data = insertCreditTransactionSchema.extend({
        userId: z.number()
      }).parse(req.body);
      
      const transaction = await storage.createCreditTransaction(data);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ message: handleError(error) });
    }
  });

  // Perplexity-powered Revolutionary SEO Tools
  app.post("/api/perplexity/trending-keywords", async (req, res) => {
    try {
      const { topic, userId } = z.object({ 
        topic: z.string(),
        userId: z.number()
      }).parse(req.body);

      const keywords = await generateTrendingKeywords(topic);
      
      await storage.createSeoAnalysis({
        toolType: "trending-keywords",
        inputData: { topic },
        results: { keywords },
        userId
      });

      res.json({ keywords });
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/perplexity/competitor-gaps", async (req, res) => {
    try {
      const { domain, topic, userId } = z.object({ 
        domain: z.string(),
        topic: z.string(),
        userId: z.number()
      }).parse(req.body);

      const analysis = await analyzeCompetitorGaps(domain, topic);
      
      await storage.createSeoAnalysis({
        toolType: "competitor-gaps",
        inputData: { domain, topic },
        results: analysis,
        userId
      });

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/perplexity/trending-topics", async (req, res) => {
    try {
      const { industry, userId } = z.object({ 
        industry: z.string(),
        userId: z.number()
      }).parse(req.body);

      const analysis = await analyzeTrendingTopics(industry);
      
      await storage.createAnalyticsData({
        toolType: "trending-topics",
        data: { industry },
        insights: analysis,
        userId
      });

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/perplexity/serp-opportunities", async (req, res) => {
    try {
      const { keywords, userId } = z.object({ 
        keywords: z.array(z.string()),
        userId: z.number()
      }).parse(req.body);

      const opportunities = await findSerpOpportunities(keywords);
      
      await storage.createSeoAnalysis({
        toolType: "serp-opportunities",
        inputData: { keywords },
        results: opportunities,
        userId
      });

      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/perplexity/eat-optimization", async (req, res) => {
    try {
      const { content, topic, userId } = z.object({ 
        content: z.string(),
        topic: z.string(),
        userId: z.number()
      }).parse(req.body);

      const optimization = await optimizeForEAT(content, topic);
      
      await storage.createSeoAnalysis({
        toolType: "eat-optimization",
        inputData: { content, topic },
        results: optimization,
        userId
      });

      res.json(optimization);
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  // AI-First SEO Power Tools
  app.post("/api/ai-seo/craft-optimize", async (req, res) => {
    try {
      const { content, targetKeywords, contentType, audience, userId } = z.object({
        content: z.string(),
        targetKeywords: z.array(z.string()),
        contentType: z.enum(['blog', 'landing', 'product', 'guide']),
        audience: z.string(),
        userId: z.number()
      }).parse(req.body);

      const optimizedContent = await applyCRAFTFramework({
        content,
        targetKeywords,
        contentType,
        audience
      });

      await storage.createSeoAnalysis({
        toolType: "craft-optimization",
        inputData: { content, targetKeywords, contentType, audience },
        results: { optimizedContent },
        userId
      });

      res.json({ optimizedContent });
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/ai-seo/eat-enhance", async (req, res) => {
    try {
      const { content, topic, userId } = z.object({
        content: z.string(),
        topic: z.string(),
        userId: z.number()
      }).parse(req.body);

      const eatAnalysis = await enhanceEATForAI(content, topic);

      await storage.createSeoAnalysis({
        toolType: "eat-enhancement",
        inputData: { content, topic },
        results: eatAnalysis,
        userId
      });

      res.json(eatAnalysis);
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/ai-seo/generate-optimized", async (req, res) => {
    try {
      const { topic, targetKeywords, contentGoal, wordCount, audience, userId } = z.object({
        topic: z.string(),
        targetKeywords: z.array(z.string()),
        contentGoal: z.enum(['rank_fast', 'featured_snippet', 'ai_overview', 'voice_search']),
        wordCount: z.number(),
        audience: z.string(),
        userId: z.number()
      }).parse(req.body);

      const optimizedContent = await generateAIOptimizedContent({
        topic,
        targetKeywords,
        contentGoal,
        wordCount,
        audience
      });

      await storage.createContentItem({
        title: `AI-Optimized: ${topic}`,
        contentType: contentGoal,
        aiProvider: "perplexity",
        userId
      });

      res.json({ content: optimizedContent });
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  app.post("/api/ai-seo/audit", async (req, res) => {
    try {
      const { url, content, userId } = z.object({
        url: z.string(),
        content: z.string(),
        userId: z.number()
      }).parse(req.body);

      const auditResults = await performAISEOAudit(url, content);

      await storage.createSeoAnalysis({
        toolType: "ai-seo-audit",
        inputData: { url, content },
        results: auditResults,
        userId
      });

      res.json(auditResults);
    } catch (error) {
      res.status(500).json({ message: handleError(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
