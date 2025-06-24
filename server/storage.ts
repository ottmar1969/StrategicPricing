import { 
  users, 
  contentItems, 
  creditTransactions, 
  apiKeys, 
  seoAnalysis, 
  analyticsData,
  type User, 
  type InsertUser,
  type ContentItem,
  type InsertContentItem,
  type CreditTransaction,
  type InsertCreditTransaction,
  type ApiKey,
  type InsertApiKey,
  type SeoAnalysis,
  type InsertSeoAnalysis,
  type AnalyticsData,
  type InsertAnalyticsData
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserCredits(userId: number, credits: number): Promise<User | undefined>;
  updateUserApiKey(userId: number, hasApiKey: boolean, provider?: string): Promise<User | undefined>;

  // Content methods
  getContentItems(userId: number): Promise<ContentItem[]>;
  getContentItem(id: number): Promise<ContentItem | undefined>;
  createContentItem(item: InsertContentItem & { userId: number }): Promise<ContentItem>;
  updateContentItem(id: number, updates: Partial<ContentItem>): Promise<ContentItem | undefined>;
  deleteContentItem(id: number): Promise<boolean>;
  deleteContentItems(ids: number[]): Promise<boolean>;

  // Credit transaction methods
  getCreditTransactions(userId: number): Promise<CreditTransaction[]>;
  createCreditTransaction(transaction: InsertCreditTransaction & { userId: number }): Promise<CreditTransaction>;

  // API key methods
  getApiKeys(userId: number): Promise<ApiKey[]>;
  createApiKey(apiKey: InsertApiKey & { userId: number }): Promise<ApiKey>;
  deleteApiKey(id: number): Promise<boolean>;

  // SEO analysis methods
  getSeoAnalyses(userId: number): Promise<SeoAnalysis[]>;
  createSeoAnalysis(analysis: InsertSeoAnalysis & { userId: number }): Promise<SeoAnalysis>;

  // Analytics methods
  getAnalyticsData(userId: number): Promise<AnalyticsData[]>;
  createAnalyticsData(data: InsertAnalyticsData & { userId: number }): Promise<AnalyticsData>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contentItems: Map<number, ContentItem>;
  private creditTransactions: Map<number, CreditTransaction>;
  private apiKeys: Map<number, ApiKey>;
  private seoAnalyses: Map<number, SeoAnalysis>;
  private analyticsData: Map<number, AnalyticsData>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.contentItems = new Map();
    this.creditTransactions = new Map();
    this.apiKeys = new Map();
    this.seoAnalyses = new Map();
    this.analyticsData = new Map();
    this.currentId = 1;

    // Create default user
    this.createUser({
      username: "demo",
      password: "demo123",
      email: "demo@contentscale.pro"
    }).then(user => {
      this.updateUserCredits(user.id, 89);
      this.updateUserApiKey(user.id, true, "openai");
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      credits: 1, // Free tier gets 1 article
      hasApiKey: false,
      apiProvider: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserCredits(userId: number, credits: number): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.credits = credits;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async updateUserApiKey(userId: number, hasApiKey: boolean, provider?: string): Promise<User | undefined> {
    const user = this.users.get(userId);
    if (user) {
      user.hasApiKey = hasApiKey;
      user.apiProvider = provider || null;
      this.users.set(userId, user);
      return user;
    }
    return undefined;
  }

  async getContentItems(userId: number): Promise<ContentItem[]> {
    return Array.from(this.contentItems.values()).filter(item => item.userId === userId);
  }

  async getContentItem(id: number): Promise<ContentItem | undefined> {
    return this.contentItems.get(id);
  }

  async createContentItem(item: InsertContentItem & { userId: number }): Promise<ContentItem> {
    const id = this.currentId++;
    const contentItem: ContentItem = {
      ...item,
      id,
      content: null,
      keywords: [],
      nlpKeywords: [],
      outline: null,
      status: "draft",
      creditsUsed: 1,
      createdAt: new Date(),
    };
    this.contentItems.set(id, contentItem);
    return contentItem;
  }

  async updateContentItem(id: number, updates: Partial<ContentItem>): Promise<ContentItem | undefined> {
    const item = this.contentItems.get(id);
    if (item) {
      const updated = { ...item, ...updates };
      this.contentItems.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async deleteContentItem(id: number): Promise<boolean> {
    return this.contentItems.delete(id);
  }

  async deleteContentItems(ids: number[]): Promise<boolean> {
    let allDeleted = true;
    for (const id of ids) {
      if (!this.contentItems.delete(id)) {
        allDeleted = false;
      }
    }
    return allDeleted;
  }

  async getCreditTransactions(userId: number): Promise<CreditTransaction[]> {
    return Array.from(this.creditTransactions.values()).filter(t => t.userId === userId);
  }

  async createCreditTransaction(transaction: InsertCreditTransaction & { userId: number }): Promise<CreditTransaction> {
    const id = this.currentId++;
    const creditTransaction: CreditTransaction = {
      ...transaction,
      id,
      description: transaction.description || null,
      createdAt: new Date(),
    };
    this.creditTransactions.set(id, creditTransaction);
    return creditTransaction;
  }

  async getApiKeys(userId: number): Promise<ApiKey[]> {
    return Array.from(this.apiKeys.values()).filter(key => key.userId === userId);
  }

  async createApiKey(apiKey: InsertApiKey & { userId: number }): Promise<ApiKey> {
    const id = this.currentId++;
    const key: ApiKey = {
      ...apiKey,
      id,
      isActive: true,
      createdAt: new Date(),
    };
    this.apiKeys.set(id, key);
    return key;
  }

  async deleteApiKey(id: number): Promise<boolean> {
    return this.apiKeys.delete(id);
  }

  async getSeoAnalyses(userId: number): Promise<SeoAnalysis[]> {
    return Array.from(this.seoAnalyses.values()).filter(analysis => analysis.userId === userId);
  }

  async createSeoAnalysis(analysis: InsertSeoAnalysis & { userId: number }): Promise<SeoAnalysis> {
    const id = this.currentId++;
    const seoAnalysis: SeoAnalysis = {
      ...analysis,
      id,
      inputData: analysis.inputData || null,
      results: analysis.results || null,
      createdAt: new Date(),
    };
    this.seoAnalyses.set(id, seoAnalysis);
    return seoAnalysis;
  }

  async getAnalyticsData(userId: number): Promise<AnalyticsData[]> {
    return Array.from(this.analyticsData.values()).filter(data => data.userId === userId);
  }

  async createAnalyticsData(data: InsertAnalyticsData & { userId: number }): Promise<AnalyticsData> {
    const id = this.currentId++;
    const analyticsData: AnalyticsData = {
      ...data,
      id,
      data: data.data || null,
      insights: data.insights || null,
      createdAt: new Date(),
    };
    this.analyticsData.set(id, analyticsData);
    return analyticsData;
  }
}

export const storage = new MemStorage();
