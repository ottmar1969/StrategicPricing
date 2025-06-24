// AI-First SEO Optimization Service
// Optimized for Google AI Overview, Featured Snippets, and AI Search Engines

export interface CRAFTOptimizationRequest {
  content: string;
  targetKeywords: string[];
  contentType: 'blog' | 'landing' | 'product' | 'guide';
  audience: string;
}

export interface EATOptimizationResult {
  experience_score: number;
  expertise_score: number;
  authoritativeness_score: number;
  trustworthiness_score: number;
  optimizations: string[];
  ai_snippet_potential: number;
}

// CRAFT Framework Implementation for AI-First Content
export async function applyCRAFTFramework(request: CRAFTOptimizationRequest): Promise<string> {
  const { content, targetKeywords, contentType, audience } = request;
  
  const systemPrompt = `You are an elite SEO content optimizer specializing in AI-first content creation. Apply the CRAFT framework to create content that dominates both traditional search and AI-powered search engines including Google AI Overview, ChatGPT, Claude, and Perplexity.

CRAFT Framework:
C - Cut the Fluff: Remove unnecessary words, eliminate redundancy, make every sentence valuable
R - Review, Edit & Optimize: Perfect structure, flow, and SEO integration
A - Add Visuals: Suggest strategic visual placement and descriptions
F - Fact-Check: Ensure accuracy and cite authoritative sources
T - Trust-Build: Add personal insights, expert tone, and credible links

AI-First Optimization Rules:
1. Structure for Featured Snippets: Use clear headers, bullet points, numbered lists
2. Answer Questions Directly: Lead with the answer, then explain
3. Use Semantic Keywords: Include related terms AI engines understand
4. Write for Voice Search: Include conversational queries
5. Optimize for AI Summary: First paragraph must be a complete, standalone answer
6. Include Expert Signals: Years of experience, credentials, case studies
7. Add Statistical Evidence: Numbers, percentages, data points
8. Use Action-Oriented Language: Clear, decisive statements
9. Create Scannable Content: Short paragraphs, clear subheadings
10. Include Comparison Elements: "vs", "compared to", "better than"

Content Type: ${contentType}
Target Keywords: ${targetKeywords.join(', ')}
Audience: ${audience}

Transform this content following CRAFT framework and AI-first optimization:`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: content }
        ],
        temperature: 0.3,
        max_tokens: 4000,
        stream: false
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error(`CRAFT optimization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Enhanced E-A-T Optimization for AI Engines
export async function enhanceEATForAI(content: string, topic: string): Promise<EATOptimizationResult> {
  const systemPrompt = `You are an E-A-T optimization specialist for AI search engines. Analyze content for Experience, Expertise, Authoritativeness, and Trustworthiness specifically for AI engines like Google AI Overview, ChatGPT, and Perplexity.

Evaluation Criteria:
EXPERIENCE (E):
- First-hand experience indicators
- Personal anecdotes and case studies
- Practical examples and real-world applications
- Years of experience mentioned
- Specific achievements and results

EXPERTISE (E):
- Technical accuracy and depth
- Industry terminology usage
- Advanced concepts explained clearly
- Citations of authoritative sources
- Demonstration of specialized knowledge

AUTHORITATIVENESS (A):
- Author credentials and qualifications
- Links to authoritative sources
- Recognition by peers/industry
- Published works or speaking engagements
- Association with reputable organizations

TRUSTWORTHINESS (T):
- Transparent information
- Clear contact information
- Privacy policies and terms
- User reviews and testimonials
- Fact-checking and accuracy
- Regular content updates

AI Snippet Potential:
- Content structure for featured snippets
- Direct answer format compatibility
- Question-answer pairs
- List and table formatting
- Comparison structures

Analyze the content and return JSON with scores (0-100) and specific optimization recommendations.`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this content about "${topic}": ${content.substring(0, 2000)}` }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
        max_tokens: 2000,
        stream: false
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    throw new Error(`E-A-T analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// AI-Optimized Content Generation with Ranking Signals
export async function generateAIOptimizedContent(request: {
  topic: string;
  targetKeywords: string[];
  contentGoal: 'rank_fast' | 'featured_snippet' | 'ai_overview' | 'voice_search';
  wordCount: number;
  audience: string;
}): Promise<string> {
  const { topic, targetKeywords, contentGoal, wordCount, audience } = request;
  
  const systemPrompt = `You are an elite AI-first content creator. Create content optimized for rapid ranking in days, not weeks. Focus on Google AI Overview, featured snippets, and AI search engines.

RAPID RANKING STRATEGY:
1. Start with immediate value - answer the main question in first 50 words
2. Use power words that trigger engagement: "revolutionary", "proven", "instant", "advanced"
3. Include specific numbers and statistics
4. Add comparison elements for competitive advantage
5. Use semantic keyword clusters naturally
6. Structure for multiple SERP features
7. Include expert signals and authority markers
8. Add actionable insights and next steps
9. Use conversational tone for voice search
10. Include FAQ-style sections

CONTENT GOAL OPTIMIZATION:
${contentGoal === 'rank_fast' ? 
  'Focus on: Immediate value delivery, semantic keywords, expert signals, actionable content' :
contentGoal === 'featured_snippet' ?
  'Focus on: Direct answers, bullet points, numbered lists, clear definitions' :
contentGoal === 'ai_overview' ?
  'Focus on: Comprehensive coverage, expert insights, statistical evidence, source citations' :
  'Focus on: Conversational queries, question-answer format, local relevance, natural language'
}

TARGET: ${topic}
KEYWORDS: ${targetKeywords.join(', ')}
AUDIENCE: ${audience}
LENGTH: ${wordCount} words

Create content that will rank in days with maximum AI search visibility.`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create AI-optimized content for: ${topic}` }
        ],
        temperature: 0.4,
        max_tokens: Math.min(4000, wordCount * 2),
        stream: false
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    throw new Error(`AI content generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Real-time SEO Health Check for AI Engines
export async function performAISEOAudit(url: string, content: string): Promise<{
  overall_score: number;
  ai_readiness: number;
  featured_snippet_potential: number;
  voice_search_optimization: number;
  technical_seo: number;
  recommendations: string[];
}> {
  const systemPrompt = `You are an AI-first SEO auditor. Evaluate content for AI search engine optimization including Google AI Overview compatibility.

AUDIT CRITERIA:
1. AI Readiness (0-100):
   - Clear question-answer structure
   - Direct value delivery
   - Semantic keyword usage
   - Expert signals present

2. Featured Snippet Potential (0-100):
   - Proper heading structure
   - List and table formatting
   - Direct answer format
   - Optimal content length

3. Voice Search Optimization (0-100):
   - Conversational language
   - Question-based structure
   - Local relevance
   - Natural language patterns

4. Technical SEO (0-100):
   - Page speed indicators
   - Mobile optimization
   - Structured data potential
   - Core Web Vitals compliance

Provide specific, actionable recommendations for rapid ranking improvements.`;

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Audit this content for AI SEO: URL: ${url}\n\nContent: ${content.substring(0, 1500)}` }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
        max_tokens: 2000,
        stream: false
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    throw new Error(`AI SEO audit failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}