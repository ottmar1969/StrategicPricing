import { apiRequest } from "./queryClient";

export const api = {
  // User endpoints
  user: {
    get: (id: number) => fetch(`/api/user/${id}`).then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/user", data),
    updateCredits: (id: number, credits: number) => 
      apiRequest("PATCH", `/api/user/${id}/credits`, { credits }),
    updateApiKey: (id: number, hasApiKey: boolean, provider?: string) =>
      apiRequest("PATCH", `/api/user/${id}/api-key`, { hasApiKey, provider })
  },

  // Content endpoints
  content: {
    list: (userId: number) => fetch(`/api/content/${userId}`).then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/content", data),
    delete: (id: number) => apiRequest("DELETE", `/api/content/${id}`),
    deleteBulk: (ids: number[]) => apiRequest("DELETE", "/api/content/bulk", { ids })
  },

  // Generation endpoints
  generate: {
    content: (data: any) => apiRequest("POST", "/api/generate/content", data),
    keywords: (topic: string) => apiRequest("POST", "/api/generate/keywords", { topic }),
    titles: (topic: string) => apiRequest("POST", "/api/generate/titles", { topic }),
    outline: (topic: string) => apiRequest("POST", "/api/generate/outline", { topic }),
    nlpKeywords: (content: string) => apiRequest("POST", "/api/generate/nlp-keywords", { content })
  },

  // SEO Tools endpoints
  seo: {
    intentMapping: (data: any) => apiRequest("POST", "/api/seo/intent-mapping", data),
    competitorDNA: (data: any) => apiRequest("POST", "/api/seo/competitor-dna", data),
    voiceSearch: (data: any) => apiRequest("POST", "/api/seo/voice-search", data),
    serpFeatures: (data: any) => apiRequest("POST", "/api/seo/serp-features", data),
    semanticWeb: (data: any) => apiRequest("POST", "/api/seo/semantic-web", data)
  },

  // Analytics endpoints
  analytics: {
    userJourney: (data: any) => apiRequest("POST", "/api/analytics/user-journey", data),
    contentPerformance: (data: any) => apiRequest("POST", "/api/analytics/content-performance", data),
    revenueAttribution: (data: any) => apiRequest("POST", "/api/analytics/revenue-attribution", data),
    competitorTraffic: (data: any) => apiRequest("POST", "/api/analytics/competitor-traffic", data),
    socialSentiment: (data: any) => apiRequest("POST", "/api/analytics/social-sentiment", data)
  },

  // Credits endpoints
  credits: {
    list: (userId: number) => fetch(`/api/credits/${userId}`).then(res => res.json()),
    create: (data: any) => apiRequest("POST", "/api/credits", data)
  }
};
