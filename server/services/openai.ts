import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface ContentGenerationRequest {
  topic: string;
  contentType: string;
  provider: string;
}

export interface KeywordAnalysisRequest {
  topic: string;
  targetAudience?: string;
}

export interface SEOAnalysisRequest {
  content: string;
  targetKeywords: string[];
}

export interface IntentMappingRequest {
  queries: string[];
}

export async function generateContent(request: ContentGenerationRequest): Promise<string> {
  try {
    const prompt = `Generate high-quality ${request.contentType} content about "${request.topic}". 
    Make it engaging, informative, and SEO-optimized. Include relevant headings and structure.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}

export async function generateKeywords(request: KeywordAnalysisRequest): Promise<string[]> {
  try {
    const prompt = `Generate 20 relevant SEO keywords for the topic "${request.topic}". 
    Return only the keywords as a JSON array of strings, without any additional text.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Respond with JSON format only."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.keywords || [];
  } catch (error) {
    throw new Error(`Failed to generate keywords: ${error.message}`);
  }
}

export async function generateTitles(topic: string): Promise<string[]> {
  try {
    const prompt = `Generate 10 compelling, SEO-optimized titles for content about "${topic}". 
    Return as a JSON array of strings.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an SEO expert. Respond with JSON format only."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.titles || [];
  } catch (error) {
    throw new Error(`Failed to generate titles: ${error.message}`);
  }
}

export async function generateOutline(topic: string): Promise<string> {
  try {
    const prompt = `Create a detailed content outline for "${topic}". 
    Include main headings, subheadings, and key points to cover.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    throw new Error(`Failed to generate outline: ${error.message}`);
  }
}

export async function generateNLPKeywords(content: string): Promise<string[]> {
  try {
    const prompt = `Analyze this content and extract the most important NLP keywords and semantic terms: "${content}". 
    Return as a JSON array of strings.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an NLP expert. Respond with JSON format only."
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.keywords || [];
  } catch (error) {
    throw new Error(`Failed to generate NLP keywords: ${error.message}`);
  }
}
