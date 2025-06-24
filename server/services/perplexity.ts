// Perplexity AI service for advanced content generation and analysis
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "default_key";
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

export interface PerplexityRequest {
  topic: string;
  contentType: string;
  provider: string;
}

export interface PerplexitySearchRequest {
  query: string;
  domain?: string;
}

async function callPerplexityAPI(messages: any[], options: any = {}) {
  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages,
        temperature: options.temperature || 0.2,
        top_p: 0.9,
        max_tokens: options.max_tokens || 2000,
        stream: false,
        search_recency_filter: "month",
        return_images: false,
        return_related_questions: false,
        ...options
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to call Perplexity API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Content generation with real-time web data
export async function generateContentWithPerplexity(request: PerplexityRequest): Promise<string> {
  const messages = [
    {
      role: "system",
      content: "You are an expert content writer with access to real-time web data. Create comprehensive, well-researched content that incorporates the latest information and trends."
    },
    {
      role: "user",
      content: `Create a high-quality ${request.contentType} about "${request.topic}". Include recent developments, current trends, and cite credible sources. Make it engaging, informative, and SEO-optimized with proper structure and headings.`
    }
  ];

  return await callPerplexityAPI(messages, { temperature: 0.7, max_tokens: 3000 });
}

// Real-time keyword research
export async function generateTrendingKeywords(topic: string): Promise<string[]> {
  const messages = [
    {
      role: "system",
      content: "You are an SEO expert with access to real-time search data. Provide trending keywords based on current search patterns and user behavior."
    },
    {
      role: "user",
      content: `Research and provide 20 trending keywords related to "${topic}" based on current search trends, user intent, and market demand. Focus on high-potential, low-competition keywords. Return as a JSON array of strings only.`
    }
  ];

  try {
    const response = await callPerplexityAPI(messages, { temperature: 0.3 });
    const result = JSON.parse(response);
    return Array.isArray(result) ? result : result.keywords || [];
  } catch (error) {
    throw new Error(`Failed to generate trending keywords: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Competitor gap analysis with real-time data
export async function analyzeCompetitorGaps(domain: string, topic: string): Promise<any> {
  const messages = [
    {
      role: "system",
      content: "You are a competitive intelligence analyst with access to real-time web data. Analyze competitor content gaps and opportunities."
    },
    {
      role: "user",
      content: `Analyze the content strategy for domain "${domain}" related to "${topic}". Identify content gaps, missed opportunities, and strategic recommendations. Return as JSON with: {"gaps": ["string"], "opportunities": ["string"], "strategies": ["string"], "trending_topics": ["string"]}`
    }
  ];

  try {
    const response = await callPerplexityAPI(messages, { temperature: 0.4 });
    return JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to analyze competitor gaps: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Real-time trend analysis
export async function analyzeTrendingTopics(industry: string): Promise<any> {
  const messages = [
    {
      role: "system",
      content: "You are a trend analyst with access to real-time data across news, social media, and search trends."
    },
    {
      role: "user",
      content: `Identify the top trending topics, emerging keywords, and content opportunities in the "${industry}" industry right now. Include trend velocity, audience interest, and content recommendations. Return as JSON with: {"trending_topics": [{"topic": "string", "velocity": "high|medium|low", "audience_interest": number, "content_angle": "string"}], "emerging_keywords": ["string"], "content_opportunities": ["string"]}`
    }
  ];

  try {
    const response = await callPerplexityAPI(messages, { temperature: 0.5 });
    return JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to analyze trending topics: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Real-time SERP feature opportunities
export async function findSerpOpportunities(keywords: string[]): Promise<any> {
  const messages = [
    {
      role: "system",
      content: "You are a SERP analysis expert with access to real-time search results data."
    },
    {
      role: "user",
      content: `Analyze current SERP features and opportunities for these keywords: ${keywords.join(', ')}. Identify featured snippet opportunities, People Also Ask patterns, and content format recommendations based on current search results. Return as JSON with: {"keywords": [{"keyword": "string", "featured_snippet_opportunity": number, "content_format": "string", "user_intent": "string", "competition_level": "low|medium|high"}], "paa_patterns": ["string"], "content_recommendations": ["string"]}`
    }
  ];

  try {
    const response = await callPerplexityAPI(messages, { temperature: 0.3 });
    return JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to find SERP opportunities: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// E-A-T content optimization
export async function optimizeForEAT(content: string, topic: string): Promise<any> {
  const messages = [
    {
      role: "system",
      content: "You are an E-A-T optimization expert who helps improve content's Expertise, Authoritativeness, and Trustworthiness for better search rankings."
    },
    {
      role: "user",
      content: `Analyze this content about "${topic}" for E-A-T optimization: "${content.substring(0, 1000)}...". Provide specific recommendations to improve expertise signals, authority indicators, and trust factors. Include source suggestions and content structure improvements. Return as JSON with: {"expertise_score": number, "authority_score": number, "trust_score": number, "recommendations": ["string"], "source_suggestions": ["string"], "structure_improvements": ["string"]}`
    }
  ];

  try {
    const response = await callPerplexityAPI(messages, { temperature: 0.4 });
    return JSON.parse(response);
  } catch (error) {
    throw new Error(`Failed to optimize for E-A-T: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}