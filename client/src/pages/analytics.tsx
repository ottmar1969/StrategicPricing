import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolCard from "@/components/tools/tool-card";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Map, 
  Gem, 
  DollarSign, 
  BarChart3, 
  Heart,
  Loader2,
  TrendingUp,
  Zap,
  Radar,
  Brain,
  Eye
} from "lucide-react";

export default function Analytics() {
  const [activeResults, setActiveResults] = useState<any>(null);
  const [activeToolType, setActiveToolType] = useState<string>("");
  
  const { toast } = useToast();

  const userJourneyMutation = useMutation({
    mutationFn: (data: any) => api.analytics.userJourney(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("user-journey");
      toast({
        title: "User Journey Analysis Complete",
        description: "User behavior heatmap has been generated.",
      });
    },
  });

  const contentPerformanceMutation = useMutation({
    mutationFn: (data: any) => api.analytics.contentPerformance(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("content-performance");
      toast({
        title: "Content Performance Prediction Complete",
        description: "Performance predictions have been generated.",
      });
    },
  });

  const revenueAttributionMutation = useMutation({
    mutationFn: (data: any) => api.analytics.revenueAttribution(data),
    onSuccess: (response) => {
      setActiveResults(response.results);
      setActiveToolType("revenue-attribution");
      toast({
        title: "Revenue Attribution Analysis Complete",
        description: "Multi-touch attribution report has been generated.",
      });
    },
  });

  const competitorTrafficMutation = useMutation({
    mutationFn: (data: any) => api.analytics.competitorTraffic(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("competitor-traffic");
      toast({
        title: "Competitor Traffic Analysis Complete",
        description: "Traffic estimates have been calculated.",
      });
    },
  });

  const socialSentimentMutation = useMutation({
    mutationFn: (data: any) => api.analytics.socialSentiment(data),
    onSuccess: (response) => {
      setActiveResults(response.results);
      setActiveToolType("social-sentiment");
      toast({
        title: "Social Sentiment Analysis Complete",
        description: "Sentiment correlation analysis has been completed.",
      });
    },
  });

  // Perplexity-powered Next-Gen Analytics Tools
  const trendingTopicsMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/trending-topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("trending-topics");
      toast({
        title: "Real-Time Trend Analysis Complete",
        description: "Latest industry trends have been identified.",
      });
    },
  });

  const realTimeCompetitorMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/competitor-gaps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("real-time-competitor");
      toast({
        title: "Live Competitor Intelligence Complete",
        description: "Real-time competitor analysis completed.",
      });
    },
  });

  const viralContentPredictorMutation = useMutation({
    mutationFn: (data: any) => api.analytics.contentPerformance(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("viral-predictor");
      toast({
        title: "Viral Content Prediction Complete",
        description: "Content virality potential has been analyzed.",
      });
    },
  });

  const audienceInsightsMutation = useMutation({
    mutationFn: (data: any) => api.analytics.userJourney(data),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("audience-insights");
      toast({
        title: "Deep Audience Insights Complete",
        description: "Advanced audience behavior analysis completed.",
      });
    },
  });

  const marketIntelligenceMutation = useMutation({
    mutationFn: (data: any) => fetch('/api/perplexity/trending-topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json()),
    onSuccess: (response) => {
      setActiveResults(response);
      setActiveToolType("market-intelligence");
      toast({
        title: "Market Intelligence Analysis Complete",
        description: "Comprehensive market data analysis completed.",
      });
    },
  });

  const handleLaunchTool = (toolType: string) => {
    const userId = 1; // Demo user ID
    
    switch (toolType) {
      case "user-journey":
        userJourneyMutation.mutate({ 
          behaviorData: { 
            pageViews: 1250, 
            sessionDuration: 180, 
            bounceRate: 0.45,
            conversionRate: 0.032
          },
          userId 
        });
        break;
      case "content-performance":
        contentPerformanceMutation.mutate({ 
          contentData: {
            title: "AI Marketing Trends 2024",
            type: "blog",
            length: 2500,
            keywords: ["AI", "marketing", "trends"]
          },
          userId 
        });
        break;
      case "revenue-attribution":
        revenueAttributionMutation.mutate({ 
          conversionData: {
            touchpoints: ["blog", "email", "social", "search"],
            revenue: 15000,
            conversions: 25
          },
          userId 
        });
        break;
      case "competitor-traffic":
        competitorTrafficMutation.mutate({ 
          domain: "competitor-example.com",
          userId 
        });
        break;
      case "social-sentiment":
        socialSentimentMutation.mutate({ 
          socialData: {
            mentions: 450,
            platforms: ["twitter", "linkedin", "facebook"],
            sentiment: 0.75
          },
          performanceData: {
            traffic: 25000,
            conversions: 180
          },
          userId 
        });
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Next-Gen Analytics Tools</h1>
        <p className="text-muted-foreground">Advanced analytics and performance tracking capabilities</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ToolCard
          title="User Journey Heatmapper"
          description="Combines behavioral data with conversion paths to show visual user journey patterns"
          icon={Map}
          iconColor="cyan"
          buttonColor="bg-cyan-600 hover:bg-cyan-700 text-white"
          onLaunch={() => handleLaunchTool("user-journey")}
        />

        <ToolCard
          title="Content Performance Prophet"
          description="Predicts content performance using AI analysis of engagement patterns"
          icon={Gem}
          iconColor="indigo"
          buttonColor="bg-indigo-600 hover:bg-indigo-700 text-white"
          onLaunch={() => handleLaunchTool("content-performance")}
        />

        <ToolCard
          title="Revenue Attribution Tracker"
          description="Multi-touch attribution showing exact content pieces that drive revenue"
          icon={DollarSign}
          iconColor="emerald"
          buttonColor="bg-emerald-600 hover:bg-emerald-700 text-white"
          onLaunch={() => handleLaunchTool("revenue-attribution")}
        />

        <ToolCard
          title="Competitor Traffic Estimator"
          description="Estimates competitor website traffic and top-performing pages"
          icon={BarChart3}
          iconColor="pink"
          buttonColor="bg-pink-600 hover:bg-pink-700 text-white"
          onLaunch={() => handleLaunchTool("competitor-traffic")}
        />

        <ToolCard
          title="Social Sentiment Correlator"
          description="Correlates social media sentiment with website performance and conversion rates"
          icon={Heart}
          iconColor="yellow"
          buttonColor="bg-yellow-600 hover:bg-yellow-700 text-white"
          onLaunch={() => handleLaunchTool("social-sentiment")}
        />
      </div>

      {/* Next-Gen Analytics Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">🧠 Next-Gen Intelligence Analytics</h2>
        <p className="text-muted-foreground mb-6">AI-powered analytics with real-time market intelligence</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            title="Real-Time Trend Radar"
            description="Identifies emerging trends and viral content opportunities using live social and search data"
            icon={TrendingUp}
            iconColor="purple"
            buttonColor="bg-purple-600 hover:bg-purple-700 text-white"
            onLaunch={() => handleLaunchTool("trending-topics")}
          />

          <ToolCard
            title="Live Competitor Intelligence"
            description="Real-time competitor strategy analysis with actionable insights from current market data"
            icon={Radar}
            iconColor="red"
            buttonColor="bg-red-600 hover:bg-red-700 text-white"
            onLaunch={() => handleLaunchTool("real-time-competitor")}
          />

          <ToolCard
            title="Viral Content Predictor"
            description="Predicts content virality potential using AI analysis of engagement patterns and trends"
            icon={Zap}
            iconColor="orange"
            buttonColor="bg-orange-600 hover:bg-orange-700 text-white"
            onLaunch={() => handleLaunchTool("viral-predictor")}
          />

          <ToolCard
            title="Deep Audience Insights"
            description="Advanced audience behavior analysis with psychographic profiling and intent prediction"
            icon={Brain}
            iconColor="indigo"
            buttonColor="bg-indigo-600 hover:bg-indigo-700 text-white"
            onLaunch={() => handleLaunchTool("audience-insights")}
          />

          <ToolCard
            title="Market Intelligence Engine"
            description="Comprehensive market analysis combining multiple data sources for strategic insights"
            icon={Eye}
            iconColor="teal"
            buttonColor="bg-teal-600 hover:bg-teal-700 text-white"
            onLaunch={() => handleLaunchTool("market-intelligence")}
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Loading State */}
      {Object.values({
        "user-journey": userJourneyMutation.isPending,
        "content-performance": contentPerformanceMutation.isPending,
        "revenue-attribution": revenueAttributionMutation.isPending,
        "competitor-traffic": competitorTrafficMutation.isPending,
        "social-sentiment": socialSentimentMutation.isPending,
        "trending-topics": trendingTopicsMutation.isPending,
        "real-time-competitor": realTimeCompetitorMutation.isPending,
        "viral-predictor": viralContentPredictorMutation.isPending,
        "audience-insights": audienceInsightsMutation.isPending,
        "market-intelligence": marketIntelligenceMutation.isPending,
      }).some(Boolean) && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-lg font-medium">Processing analytics data...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {activeResults && (
        <Card>
          <CardHeader>
            <CardTitle>
              {activeToolType === "user-journey" && "User Journey Analysis"}
              {activeToolType === "content-performance" && "Content Performance Prediction"}
              {activeToolType === "revenue-attribution" && "Revenue Attribution Report"}
              {activeToolType === "competitor-traffic" && "Competitor Traffic Estimates"}
              {activeToolType === "social-sentiment" && "Social Sentiment Correlation"}
              {activeToolType === "trending-topics" && "Real-Time Trend Analysis"}
              {activeToolType === "real-time-competitor" && "Live Competitor Intelligence"}
              {activeToolType === "viral-predictor" && "Viral Content Prediction"}
              {activeToolType === "audience-insights" && "Deep Audience Insights"}
              {activeToolType === "market-intelligence" && "Market Intelligence Analysis"}
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
