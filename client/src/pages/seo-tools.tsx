import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolCard from "@/components/tools/tool-card";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Dna, 
  Mic, 
  Search, 
  GitBranch,
  Loader2,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Award
} from "lucide-react";

export default function SeoTools() {
  const [activeResults, setActiveResults] = useState<any>(null);
  const [activeToolType, setActiveToolType] = useState<string>("");
  
  const { toast } = useToast();

  const intentMappingMutation = useMutation({
    mutationFn: (data: any) => api.seo.intentMapping(data),
    onSuccess: (response) => {
      setActiveResults(response.results);
      setActiveToolType("intent-mapping");
      toast({
        title: "Intent Mapping Complete",
        description: "Search intent analysis has been generated successfully.",
      });
    },
  });

  const competitorDNAMutation = useMutation({
    mutationFn: (data: any) => api.seo.competitorDNA(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("competitor-dna");
      toast({
        title: "Competitor DNA Analysis Complete",
        description: "Content structure analysis has been completed.",
      });
    },
  });

  const voiceSearchMutation = useMutation({
    mutationFn: (data: any) => api.seo.voiceSearch(data),
    onSuccess: (response) => {
      setActiveResults(response.results);
      setActiveToolType("voice-search");
      toast({
        title: "Voice Search Optimization Complete",
        description: "Conversational keyword analysis has been generated.",
      });
    },
  });

  const serpFeaturesMutation = useMutation({
    mutationFn: (data: any) => api.seo.serpFeatures(data),
    onSuccess: (response) => {
      setActiveResults(response.results);
      setActiveToolType("serp-features");
      toast({
        title: "SERP Features Analysis Complete",
        description: "Search feature predictions have been generated.",
      });
    },
  });

  const semanticWebMutation = useMutation({
    mutationFn: (data: any) => api.seo.semanticWeb(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("semantic-web");
      toast({
        title: "Semantic Keyword Web Complete",
        description: "Keyword relationship map has been created.",
      });
    },
  });

  // Perplexity-powered mutations
  const trendingKeywordsMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/trending-keywords', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("trending-keywords");
      toast({
        title: "Real-Time Trending Keywords Complete",
        description: "Latest trending keywords have been identified.",
      });
    },
  });

  const competitorGapsMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/competitor-gaps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("competitor-gaps");
      toast({
        title: "Real-Time Competitor Gap Analysis Complete",
        description: "Live competitor content gaps have been identified.",
      });
    },
  });

  const serpOpportunitiesMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/serp-opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("serp-opportunities");
      toast({
        title: "Live SERP Opportunities Complete",
        description: "Real-time search opportunities have been found.",
      });
    },
  });

  const eatOptimizationMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/eat-optimization', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("eat-optimization");
      toast({
        title: "E-A-T Optimization Complete",
        description: "Content authority optimization completed.",
      });
    },
  });

  // AI-First SEO Power Tools
  const craftOptimizerMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/ai-seo/craft-optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("craft-optimizer");
      toast({
        title: "CRAFT Optimization Complete",
        description: "Content optimized for rapid ranking with AI-first approach.",
      });
    },
  });

  const aiEatEnhancerMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/ai-seo/eat-enhance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("ai-eat-enhancer");
      toast({
        title: "AI E-A-T Enhancement Complete",
        description: "Advanced E-A-T optimization for AI search engines completed.",
      });
    },
  });

  const rapidRankingMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/ai-seo/generate-optimized', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("rapid-ranking");
      toast({
        title: "Rapid Ranking Content Generated",
        description: "AI-optimized content ready for fast ranking success.",
      });
    },
  });

  const aiSeoAuditMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/ai-seo/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("ai-seo-audit");
      toast({
        title: "AI SEO Audit Complete",
        description: "Comprehensive analysis for AI search optimization completed.",
      });
    },
  });

  const handleLaunchTool = (toolType: string) => {
    const userId = 1; // Demo user ID
    
    switch (toolType) {
      case "intent-mapping":
        const queries = ["best laptops 2024", "laptop buying guide", "buy laptop online"];
        intentMappingMutation.mutate({ queries, userId });
        break;
      case "competitor-dna":
        competitorDNAMutation.mutate({ 
          url: "https://example.com", 
          content: "Sample competitor content for analysis...",
          userId 
        });
        break;
      case "voice-search":
        voiceSearchMutation.mutate({ 
          keywords: ["digital marketing", "SEO tools", "content strategy"],
          userId 
        });
        break;
      case "serp-features":
        serpFeaturesMutation.mutate({ 
          keywords: ["content marketing", "SEO optimization", "keyword research"],
          userId 
        });
        break;
      case "semantic-web":
        semanticWebMutation.mutate({ 
          keyword: "digital marketing",
          userId 
        });
        break;
      case "trending-keywords":
        trendingKeywordsMutation.mutate({ 
          topic: "AI content marketing trends 2024",
          userId 
        });
        break;
      case "competitor-gaps":
        competitorGapsMutation.mutate({ 
          domain: "hubspot.com",
          topic: "content marketing",
          userId 
        });
        break;
      case "serp-opportunities":
        serpOpportunitiesMutation.mutate({ 
          keywords: ["AI marketing", "content automation", "SEO tools 2024"],
          userId 
        });
        break;
      case "eat-optimization":
        eatOptimizationMutation.mutate({ 
          content: "Sample content about AI marketing strategies for modern businesses...",
          topic: "AI marketing strategies",
          userId 
        });
        break;
      case "craft-optimizer":
        craftOptimizerMutation.mutate({ 
          content: "Create comprehensive guide about AI-powered SEO tools that help businesses rank faster in search engines...",
          targetKeywords: ["AI SEO tools", "search engine optimization", "content marketing"],
          contentType: "guide",
          audience: "digital marketers and SEO professionals",
          userId 
        });
        break;
      case "ai-eat-enhancer":
        aiEatEnhancerMutation.mutate({ 
          content: "Expert guide to AI-powered content optimization with 10+ years of SEO experience and proven results...",
          topic: "AI content optimization strategies",
          userId 
        });
        break;
      case "rapid-ranking":
        rapidRankingMutation.mutate({ 
          topic: "AI SEO Tools for Rapid Ranking",
          targetKeywords: ["AI SEO", "rapid ranking", "search optimization", "content AI"],
          contentGoal: "rank_fast",
          wordCount: 2000,
          audience: "SEO professionals and content marketers",
          userId 
        });
        break;
      case "ai-seo-audit":
        aiSeoAuditMutation.mutate({ 
          url: window.location.href,
          content: "ContentScale Pro is an advanced AI-powered SEO platform with revolutionary tools for content optimization...",
          userId 
        });
        break;
    }
  };

  const isLoading = (toolType: string) => {
    switch (toolType) {
      case "intent-mapping": return intentMappingMutation.isPending;
      case "competitor-dna": return competitorDNAMutation.isPending;
      case "voice-search": return voiceSearchMutation.isPending;
      case "serp-features": return serpFeaturesMutation.isPending;
      case "semantic-web": return semanticWebMutation.isPending;
      case "trending-keywords": return trendingKeywordsMutation.isPending;
      case "competitor-gaps": return competitorGapsMutation.isPending;
      case "serp-opportunities": return serpOpportunitiesMutation.isPending;
      case "eat-optimization": return eatOptimizationMutation.isPending;
      case "craft-optimizer": return craftOptimizerMutation.isPending;
      case "ai-eat-enhancer": return aiEatEnhancerMutation.isPending;
      case "rapid-ranking": return rapidRankingMutation.isPending;
      case "ai-seo-audit": return aiSeoAuditMutation.isPending;
      default: return false;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Revolutionary SEO Tools</h1>
        <p className="text-muted-foreground">Advanced AI-powered SEO analysis and optimization tools</p>
      </div>

      {/* Revolutionary SEO Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ToolCard
          title="AI Intent Mapper"
          description="Analyzes search queries to predict user intent stages with content gap identification"
          icon={Brain}
          iconColor="blue"
          buttonColor="bg-blue-600 hover:bg-blue-700 text-white"
          onLaunch={() => handleLaunchTool("intent-mapping")}
        />

        <ToolCard
          title="Competitor Content DNA"
          description="Reverse engineers top-ranking content structure and semantic patterns"
          icon={Dna}
          iconColor="purple"
          buttonColor="bg-purple-600 hover:bg-purple-700 text-white"
          onLaunch={() => handleLaunchTool("competitor-dna")}
        />

        <ToolCard
          title="Voice Search Optimizer"
          description="Optimizes content for voice queries with conversational keyword suggestions"
          icon={Mic}
          iconColor="green"
          buttonColor="bg-green-600 hover:bg-green-700 text-white"
          onLaunch={() => handleLaunchTool("voice-search")}
        />

        <ToolCard
          title="SERP Feature Predictor"
          description="Predicts which SERP features content can target based on keyword analysis"
          icon={Search}
          iconColor="orange"
          buttonColor="bg-orange-600 hover:bg-orange-700 text-white"
          onLaunch={() => handleLaunchTool("serp-features")}
        />

        <ToolCard
          title="Semantic Keyword Web"
          description="Creates visual keyword relationship maps showing semantic connections and topic clusters"
          icon={GitBranch}
          iconColor="red"
          buttonColor="bg-red-600 hover:bg-red-700 text-white"
          onLaunch={() => handleLaunchTool("semantic-web")}
        />
      </div>

      {/* Perplexity-Powered Revolutionary Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">🚀 Real-Time Intelligence Tools</h2>
        <p className="text-muted-foreground mb-6">Powered by live web data and real-time search intelligence</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            title="Real-Time Trending Keywords"
            description="Identifies trending keywords based on live search data and current market demand"
            icon={TrendingUp}
            iconColor="cyan"
            buttonColor="bg-cyan-600 hover:bg-cyan-700 text-white"
            onLaunch={() => handleLaunchTool("trending-keywords")}
          />

          <ToolCard
            title="Live Competitor Gap Analyzer"
            description="Real-time analysis of competitor content gaps using current web data"
            icon={Target}
            iconColor="indigo"
            buttonColor="bg-indigo-600 hover:bg-indigo-700 text-white"
            onLaunch={() => handleLaunchTool("competitor-gaps")}
          />

          <ToolCard
            title="Live SERP Opportunity Finder"
            description="Discovers real-time SERP features and content opportunities from current search results"
            icon={Zap}
            iconColor="yellow"
            buttonColor="bg-yellow-600 hover:bg-yellow-700 text-white"
            onLaunch={() => handleLaunchTool("serp-opportunities")}
          />

          <ToolCard
            title="E-A-T Authority Optimizer"
            description="Optimizes content for Google's Expertise, Authoritativeness, and Trustworthiness signals"
            icon={Shield}
            iconColor="emerald"
            buttonColor="bg-emerald-600 hover:bg-emerald-700 text-white"
            onLaunch={() => handleLaunchTool("eat-optimization")}
          />
        </div>
      </div>

      {/* AI-First SEO Power Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">⚡ AI-First SEO Power Tools</h2>
        <p className="text-muted-foreground mb-6">Advanced optimization for Google AI Overview, Featured Snippets, and AI Search Engines</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            title="CRAFT Content Optimizer"
            description="Apply the CRAFT framework to create AI-optimized content that ranks in days, not weeks"
            icon={Award}
            iconColor="gold"
            buttonColor="bg-amber-600 hover:bg-amber-700 text-white"
            onLaunch={() => handleLaunchTool("craft-optimizer")}
          />

          <ToolCard
            title="AI E-A-T Enhancer"
            description="Advanced E-A-T optimization specifically designed for AI search engines and Google AI Overview"
            icon={Shield}
            iconColor="blue"
            buttonColor="bg-blue-600 hover:bg-blue-700 text-white"
            onLaunch={() => handleLaunchTool("ai-eat-enhancer")}
          />

          <ToolCard
            title="Rapid Ranking Generator"
            description="Generate AI-optimized content designed to rank in days with maximum search visibility"
            icon={Zap}
            iconColor="purple"
            buttonColor="bg-purple-600 hover:bg-purple-700 text-white"
            onLaunch={() => handleLaunchTool("rapid-ranking")}
          />

          <ToolCard
            title="AI SEO Health Audit"
            description="Comprehensive SEO audit optimized for AI search engines and modern ranking factors"
            icon={Search}
            iconColor="green"
            buttonColor="bg-green-600 hover:bg-green-700 text-white"
            onLaunch={() => handleLaunchTool("ai-seo-audit")}
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Loading State */}
      {Object.values({
        "intent-mapping": intentMappingMutation.isPending,
        "competitor-dna": competitorDNAMutation.isPending,
        "voice-search": voiceSearchMutation.isPending,
        "serp-features": serpFeaturesMutation.isPending,
        "semantic-web": semanticWebMutation.isPending,
        "trending-keywords": trendingKeywordsMutation.isPending,
        "competitor-gaps": competitorGapsMutation.isPending,
        "serp-opportunities": serpOpportunitiesMutation.isPending,
        "eat-optimization": eatOptimizationMutation.isPending,
        "craft-optimizer": craftOptimizerMutation.isPending,
        "ai-eat-enhancer": aiEatEnhancerMutation.isPending,
        "rapid-ranking": rapidRankingMutation.isPending,
        "ai-seo-audit": aiSeoAuditMutation.isPending,
      }).some(Boolean) && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-lg font-medium">Analyzing data with AI...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {activeResults && (
        <Card>
          <CardHeader>
            <CardTitle>
              {activeToolType === "intent-mapping" && "Intent Mapping Results"}
              {activeToolType === "competitor-dna" && "Competitor DNA Analysis"}
              {activeToolType === "voice-search" && "Voice Search Optimization"}
              {activeToolType === "serp-features" && "SERP Features Prediction"}
              {activeToolType === "semantic-web" && "Semantic Keyword Web"}
              {activeToolType === "trending-keywords" && "Real-Time Trending Keywords"}
              {activeToolType === "competitor-gaps" && "Live Competitor Gap Analysis"}
              {activeToolType === "serp-opportunities" && "Live SERP Opportunities"}
              {activeToolType === "eat-optimization" && "E-A-T Authority Optimization"}
              {activeToolType === "craft-optimizer" && "CRAFT Content Optimization"}
              {activeToolType === "ai-eat-enhancer" && "AI E-A-T Enhancement"}
              {activeToolType === "rapid-ranking" && "Rapid Ranking Content Generation"}
              {activeToolType === "ai-seo-audit" && "AI SEO Health Audit"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm whitespace-pre-wrap overflow-auto max-h-96">
                {JSON.stringify(activeResults, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
