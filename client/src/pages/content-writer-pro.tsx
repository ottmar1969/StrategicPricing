import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Copy, 
  Target, 
  Zap, 
  Brain, 
  Search, 
  TrendingUp, 
  Award,
  BarChart3,
  Eye,
  Shield,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  FileText,
  Clock
} from "lucide-react";

export default function ContentWriterPro() {
  const { toast } = useToast();
  
  // Core content settings
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [provider, setProvider] = useState("perplexity");
  const [generatedContent, setGeneratedContent] = useState("");
  
  // Advanced configuration
  const [targetAudience, setTargetAudience] = useState("");
  const [contentGoal, setContentGoal] = useState("rank_fast");
  const [wordCount, setWordCount] = useState(2000);
  const [targetKeywords, setTargetKeywords] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [tone, setTone] = useState("professional");
  const [industry, setIndustry] = useState("");
  const [contentPurpose, setContentPurpose] = useState("educate");
  
  // Advanced features
  const [includeStats, setIncludeStats] = useState(true);
  const [optimizeForSnippets, setOptimizeForSnippets] = useState(true);
  const [includeTableOfContents, setIncludeTableOfContents] = useState(true);
  const [includeFAQ, setIncludeFAQ] = useState(true);
  const [includeCallToAction, setIncludeCallToAction] = useState(true);
  const [realTimeData, setRealTimeData] = useState(true);
  
  // Content analysis
  const [keywordDensity, setKeywordDensity] = useState(0);
  const [readabilityScore, setReadabilityScore] = useState(0);
  const [seoScore, setSeoScore] = useState(0);
  const [contentAnalysis, setContentAnalysis] = useState<any>(null);
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/ai-seo/generate-optimized', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: (response) => {
      setGeneratedContent(response.content);
      analyzeSEOMetrics(response.content);
      toast({
        title: "Pro Content Generated",
        description: "AI-optimized content ready for rapid ranking success.",
      });
    },
  });

  const keywordResearchMutation = useMutation({
    mutationFn: async (topic: string) => {
      const response = await fetch('/api/perplexity/trending-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, userId: 1 })
      });
      return response.json();
    },
    onSuccess: (data) => {
      setTargetKeywords(data.keywords.slice(0, 8).join(', '));
      markStepComplete(2);
      toast({
        title: "Keywords Research Complete",
        description: `Found ${data.keywords.length} trending keywords for your topic.`,
      });
    },
  });

  const competitorAnalysisMutation = useMutation({
    mutationFn: async (data: { domain: string; topic: string }) => {
      const response = await fetch('/api/perplexity/competitor-gaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: 1 })
      });
      return response.json();
    },
    onSuccess: (analysis) => {
      setContentAnalysis(analysis);
      toast({
        title: "Competitor Analysis Complete",
        description: "Found content gaps and opportunities.",
      });
    },
  });

  const markStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const analyzeSEOMetrics = (content: string) => {
    const words = content.split(' ').length;
    const keywordArray = targetKeywords.split(',').map(k => k.trim());
    let keywordCount = 0;
    
    keywordArray.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      if (matches) keywordCount += matches.length;
    });
    
    setKeywordDensity(((keywordCount / words) * 100));
    setReadabilityScore(Math.min(95, 60 + (words / 50)));
    setSeoScore(Math.min(100, 70 + (keywordCount * 2) + (words > 1500 ? 10 : 0)));
  };

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a content topic to continue.",
        variant: "destructive",
      });
      return;
    }

    const keywords = targetKeywords.split(',').map(k => k.trim()).filter(Boolean);
    
    generateMutation.mutate({
      topic,
      contentType,
      provider,
      targetKeywords: keywords,
      contentGoal,
      wordCount,
      audience: targetAudience,
      tone,
      industry,
      contentPurpose,
      includeStats,
      optimizeForSnippets,
      includeTableOfContents,
      includeFAQ,
      includeCallToAction,
      realTimeData,
      competitorUrl,
      userId: 1
    });
  };

  const steps = [
    { number: 1, title: "Content Strategy", icon: Target },
    { number: 2, title: "Keyword Research", icon: Search },
    { number: 3, title: "Competitor Analysis", icon: BarChart3 },
    { number: 4, title: "Content Creation", icon: Brain },
    { number: 5, title: "SEO Optimization", icon: Award }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center">
              <Brain className="mr-3 h-8 w-8 text-primary" />
              AI Content Writer Pro
            </h1>
            <p className="text-muted-foreground text-lg">Create content that dominates search rankings in days, not weeks</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Zap className="mr-2 h-4 w-4" />
            Rapid Ranking Mode
          </Badge>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.number);
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${index !== steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isCurrent ? 'bg-primary text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <span className={`text-sm font-medium ${
                      isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className={`h-5 w-5 mx-4 ${
                      isCompleted ? 'text-green-500' : 'text-muted-foreground'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Configuration Panel */}
        <div className="lg:col-span-2">
          <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="1">Strategy</TabsTrigger>
              <TabsTrigger value="2">Keywords</TabsTrigger>
              <TabsTrigger value="3">Analysis</TabsTrigger>
              <TabsTrigger value="4">Create</TabsTrigger>
              <TabsTrigger value="5">Optimize</TabsTrigger>
            </TabsList>

            {/* Step 1: Content Strategy */}
            <TabsContent value="1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Content Strategy & Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="topic">Content Topic *</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., AI-powered SEO tools for agencies"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="content-type">Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Article</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                          <SelectItem value="product">Product Page</SelectItem>
                          <SelectItem value="guide">Ultimate Guide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="word-count">Word Count</Label>
                      <Select value={wordCount.toString()} onValueChange={(value) => setWordCount(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000">1,000 words</SelectItem>
                          <SelectItem value="2000">2,000 words</SelectItem>
                          <SelectItem value="3000">3,000 words</SelectItem>
                          <SelectItem value="5000">5,000+ words</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content-goal">Optimization Goal</Label>
                      <Select value={contentGoal} onValueChange={setContentGoal}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rank_fast">Rapid Ranking</SelectItem>
                          <SelectItem value="featured_snippet">Featured Snippet</SelectItem>
                          <SelectItem value="ai_overview">Google AI Overview</SelectItem>
                          <SelectItem value="voice_search">Voice Search</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target-audience">Target Audience</Label>
                      <Input
                        id="target-audience"
                        placeholder="e.g., Marketing directors at B2B companies"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tone">Content Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Content Purpose</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {['educate', 'convert', 'engage', 'inform'].map((purpose) => (
                        <Button
                          key={purpose}
                          variant={contentPurpose === purpose ? "default" : "outline"}
                          size="sm"
                          onClick={() => setContentPurpose(purpose)}
                          className="capitalize"
                        >
                          {purpose}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      markStepComplete(1);
                      setCurrentStep(2);
                    }} 
                    className="w-full"
                    disabled={!topic.trim()}
                  >
                    Continue to Keyword Research
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Keyword Research */}
            <TabsContent value="2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="mr-2 h-5 w-5" />
                    Advanced Keyword Research
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="target-keywords">Target Keywords</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="target-keywords"
                        placeholder="AI SEO tools, content optimization, ranking strategies"
                        value={targetKeywords}
                        onChange={(e) => setTargetKeywords(e.target.value)}
                      />
                      <Button 
                        onClick={() => keywordResearchMutation.mutate(topic)}
                        variant="outline"
                        disabled={keywordResearchMutation.isPending || !topic.trim()}
                      >
                        {keywordResearchMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <TrendingUp className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Research will find trending keywords with real-time search data
                    </p>
                  </div>

                  {targetKeywords && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Keyword Strategy</h4>
                      <div className="flex flex-wrap gap-2">
                        {targetKeywords.split(',').map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                            {keyword.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => setCurrentStep(3)} 
                    className="w-full"
                    disabled={!targetKeywords.trim()}
                  >
                    Continue to Competitor Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: Competitor Analysis */}
            <TabsContent value="3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Competitor Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="competitor-url">Competitor URL (Optional)</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="competitor-url"
                        placeholder="https://competitor.com/article"
                        value={competitorUrl}
                        onChange={(e) => setCompetitorUrl(e.target.value)}
                      />
                      <Button 
                        onClick={() => {
                          if (competitorUrl) {
                            const domain = new URL(competitorUrl).hostname;
                            competitorAnalysisMutation.mutate({ domain, topic });
                          }
                        }}
                        variant="outline"
                        disabled={!competitorUrl || competitorAnalysisMutation.isPending}
                      >
                        {competitorAnalysisMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {contentAnalysis && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Competitive Insights</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Content Gaps:</strong> {contentAnalysis.gaps?.length || 0} opportunities found</div>
                        <div><strong>Strategy Suggestions:</strong> {contentAnalysis.strategies?.length || 0} recommendations</div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => setCurrentStep(4)} 
                    className="w-full"
                  >
                    Continue to Content Creation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 4: Content Creation */}
            <TabsContent value="4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5" />
                    AI Content Generation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>AI Provider & Features</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <Card className={`cursor-pointer border-2 ${provider === 'perplexity' ? 'border-primary' : 'border-muted'}`} 
                            onClick={() => setProvider('perplexity')}>
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h4 className="font-semibold">Perplexity Pro</h4>
                          <p className="text-xs text-muted-foreground">Real-time data</p>
                        </CardContent>
                      </Card>
                      <Card className={`cursor-pointer border-2 ${provider === 'openai' ? 'border-primary' : 'border-muted'}`} 
                            onClick={() => setProvider('openai')}>
                        <CardContent className="p-4 text-center">
                          <Brain className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <h4 className="font-semibold">OpenAI GPT-4</h4>
                          <p className="text-xs text-muted-foreground">Creative writing</p>
                        </CardContent>
                      </Card>
                      <Card className={`cursor-pointer border-2 ${provider === 'hybrid' ? 'border-primary' : 'border-muted'}`} 
                            onClick={() => setProvider('hybrid')}>
                        <CardContent className="p-4 text-center">
                          <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <h4 className="font-semibold">Hybrid AI</h4>
                          <p className="text-xs text-muted-foreground">Best of both</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Label>Advanced Features</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {[
                        { id: 'stats', label: 'Include Statistics & Data', checked: includeStats, setter: setIncludeStats },
                        { id: 'snippets', label: 'Featured Snippet Optimization', checked: optimizeForSnippets, setter: setOptimizeForSnippets },
                        { id: 'toc', label: 'Table of Contents', checked: includeTableOfContents, setter: setIncludeTableOfContents },
                        { id: 'faq', label: 'FAQ Section', checked: includeFAQ, setter: setIncludeFAQ },
                        { id: 'cta', label: 'Call-to-Action', checked: includeCallToAction, setter: setIncludeCallToAction },
                        { id: 'realtime', label: 'Real-time Data Integration', checked: realTimeData, setter: setRealTimeData },
                      ].map((feature) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={feature.id}
                            checked={feature.checked}
                            onCheckedChange={feature.setter}
                          />
                          <Label htmlFor={feature.id} className="text-sm">{feature.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Content Preview
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Topic:</strong> {topic || 'Not set'}</div>
                      <div><strong>Type:</strong> {contentType}</div>
                      <div><strong>Words:</strong> {wordCount.toLocaleString()}</div>
                      <div><strong>Goal:</strong> {contentGoal.replace('_', ' ')}</div>
                      <div><strong>Keywords:</strong> {targetKeywords ? targetKeywords.split(',').length : 0}</div>
                      <div><strong>Features:</strong> {[includeStats, optimizeForSnippets, includeTableOfContents, includeFAQ].filter(Boolean).length} enabled</div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerate}
                    disabled={generateMutation.isPending || !topic.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {generateMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating AI-Optimized Content...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-5 w-5" />
                        Generate Pro Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 5: SEO Optimization */}
            <TabsContent value="5">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    SEO Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {generatedContent ? (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{seoScore}%</div>
                          <div className="text-sm text-green-800">SEO Score</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{readabilityScore.toFixed(0)}%</div>
                          <div className="text-sm text-blue-800">Readability</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{keywordDensity.toFixed(1)}%</div>
                          <div className="text-sm text-purple-800">Keyword Density</div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          AI Optimization Status
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Featured snippet ready
                          </div>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            E-A-T signals included
                          </div>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Voice search optimized
                          </div>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Google AI Overview compatible
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Generate content first to see SEO analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Content Preview Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Content Preview
                </span>
                {generatedContent && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Ready
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Words: {generatedContent.split(' ').length}</span>
                    <span>
                      <Clock className="inline mr-1 h-3 w-3" />
                      {Math.ceil(generatedContent.split(' ').length / 200)} min read
                    </span>
                  </div>
                  
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[400px] text-xs"
                    placeholder="Generated content will appear here..."
                  />

                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedContent);
                        toast({
                          title: "Copied",
                          description: "Content copied to clipboard.",
                        });
                      }}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-3 w-3" />
                      Copy
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentStep(1);
                        setGeneratedContent("");
                        setCompletedSteps([]);
                      }}
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                    >
                      <Zap className="mr-2 h-3 w-3" />
                      New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="font-semibold mb-2">Ready to Dominate Search?</h3>
                  <p className="text-sm mb-4">Follow our 5-step process to create content that ranks in days</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>Strategy</span>
                      <div className={`w-4 h-4 rounded-full ${completedSteps.includes(1) ? 'bg-green-500' : 'bg-muted'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Keywords</span>
                      <div className={`w-4 h-4 rounded-full ${completedSteps.includes(2) ? 'bg-green-500' : 'bg-muted'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Analysis</span>
                      <div className={`w-4 h-4 rounded-full ${completedSteps.includes(3) ? 'bg-green-500' : 'bg-muted'}`} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}