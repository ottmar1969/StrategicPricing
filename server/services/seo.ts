import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface IntentMappingResult {
  query: string;
  intent: 'awareness' | 'consideration' | 'decision';
  confidence: number;
  contentGaps: string[];
}

export interface CompetitorDNAResult {
  url: string;
  wordPatterns: string[];
  semanticClusters: string[];
  contentDepth: number;
  structure: string[];
}

export interface VoiceSearchResult {
  originalKeyword: string;
  conversationalVariants: string[];
  featuredSnippetPotential: number;
  voiceOptimizedContent: string;
}

export interface SERPFeatureResult {
  keyword: string;
  featuredSnippet: number;
  peopleAlsoAsk: number;
  imageResults: number;
  videoResults: number;
  localResults: number;
  recommendations: string[];
}

export interface SemanticWebResult {
  primaryKeyword: string;
  relatedTerms: Array<{
    term: string;
    relationship: string;
    strength: number;
  }>;
  topicClusters: Array<{
    cluster: string;
    keywords: string[];
    relevance: number;
  }>;
}

export async function analyzeIntentMapping(queries: string[]): Promise<IntentMappingResult[]> {
  try {
    const prompt = `Analyze these search queries and determine user intent stages (awareness, consideration, decision). 
    For each query, provide intent classification, confidence score (0-1), and identify content gaps.
    Queries: ${queries.join(', ')}
    
    Return as JSON with this structure:
    {
      "results": [
        {
          "query": "string",
          "intent": "awareness|consideration|decision", 
          "confidence": number,
          "contentGaps": ["string"]
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert SEO analyst specializing in search intent analysis."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.results || [];
  } catch (error) {
    throw new Error(`Failed to analyze intent mapping: ${error.message}`);
  }
}

export async function analyzeCompetitorDNA(url: string, content: string): Promise<CompetitorDNAResult> {
  try {
    const prompt = `Analyze this competitor content and reverse-engineer its structure:
    URL: ${url}
    Content snippet: ${content.substring(0, 1000)}...
    
    Extract:
    - Word patterns and frequent phrases
    - Semantic clusters and topic groupings  
    - Content depth analysis
    - Structural elements
    
    Return as JSON:
    {
      "url": "string",
      "wordPatterns": ["string"],
      "semanticClusters": ["string"], 
      "contentDepth": number,
      "structure": ["string"]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert content analyst specializing in competitive analysis."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    throw new Error(`Failed to analyze competitor DNA: ${error.message}`);
  }
}

export async function optimizeForVoiceSearch(keywords: string[]): Promise<VoiceSearchResult[]> {
  try {
    const prompt = `Optimize these keywords for voice search:
    Keywords: ${keywords.join(', ')}
    
    For each keyword:
    - Generate conversational variants
    - Assess featured snippet potential (0-100)
    - Create voice-optimized content suggestions
    
    Return as JSON:
    {
      "results": [
        {
          "originalKeyword": "string",
          "conversationalVariants": ["string"],
          "featuredSnippetPotential": number,
          "voiceOptimizedContent": "string"
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a voice search optimization expert."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.results || [];
  } catch (error) {
    throw new Error(`Failed to optimize for voice search: ${error.message}`);
  }
}

export async function predictSERPFeatures(keywords: string[]): Promise<SERPFeatureResult[]> {
  try {
    const prompt = `Predict SERP features for these keywords:
    Keywords: ${keywords.join(', ')}
    
    For each keyword, predict likelihood (0-100) of:
    - Featured snippets
    - People Also Ask boxes
    - Image results
    - Video results  
    - Local results
    
    Also provide optimization recommendations.
    
    Return as JSON:
    {
      "results": [
        {
          "keyword": "string",
          "featuredSnippet": number,
          "peopleAlsoAsk": number,
          "imageResults": number,
          "videoResults": number,
          "localResults": number,
          "recommendations": ["string"]
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a SERP analysis expert with deep knowledge of search features."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.results || [];
  } catch (error) {
    throw new Error(`Failed to predict SERP features: ${error.message}`);
  }
}

export async function createSemanticKeywordWeb(primaryKeyword: string): Promise<SemanticWebResult> {
  try {
    const prompt = `Create a semantic keyword web for: "${primaryKeyword}"
    
    Generate:
    - Related terms with relationship types (synonym, broader, narrower, related)
    - Relationship strength scores (0-1)
    - Topic clusters with relevance scores
    
    Return as JSON:
    {
      "primaryKeyword": "string",
      "relatedTerms": [
        {
          "term": "string",
          "relationship": "string",
          "strength": number
        }
      ],
      "topicClusters": [
        {
          "cluster": "string", 
          "keywords": ["string"],
          "relevance": number
        }
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a semantic SEO expert specializing in keyword relationships."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    throw new Error(`Failed to create semantic keyword web: ${error.message}`);
  }
}
