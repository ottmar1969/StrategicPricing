import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useApiKey } from "@/hooks/use-api-key";
import { 
  Eye, 
  Key, 
  Heading, 
  List, 
  Brain, 
  Wand2,
  Loader2,
  Settings,
  AlertCircle
} from "lucide-react";
import { Link } from "wouter";

export default function ContentWriter() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("Blog Article");
  const [aiProvider, setAiProvider] = useState("OpenAI GPT-4");
  const [generatedContent, setGeneratedContent] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [outline, setOutline] = useState("");
  const [nlpKeywords, setNlpKeywords] = useState<string[]>([]);

  const { toast } = useToast();
  const { hasApiKey, provider, creditsRemaining, getCostPerArticle } = useApiKey();

  const generateContentMutation = useMutation({
    mutationFn: (data: any) => api.generate.content(data),
    onSuccess: (response) => {
      setGeneratedContent(response.content);
      toast({
        title: "Content Generated",
        description: "Your content has been successfully generated!",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const generateKeywordsMutation = useMutation({
    mutationFn: (topic: string) => api.generate.keywords(topic),
    onSuccess: (response) => {
      setKeywords(response.keywords);
      toast({
        title: "Keywords Generated",
        description: `Generated ${response.keywords.length} keywords for your topic.`,
      });
    },
  });

  const generateTitlesMutation = useMutation({
    mutationFn: (topic: string) => api.generate.titles(topic),
    onSuccess: (response) => {
      setTitles(response.titles);
      toast({
        title: "Titles Generated",
        description: `Generated ${response.titles.length} title suggestions.`,
      });
    },
  });

  const generateOutlineMutation = useMutation({
    mutationFn: (topic: string) => api.generate.outline(topic),
    onSuccess: (response) => {
      setOutline(response.outline);
      toast({
        title: "Outline Generated",
        description: "Content outline has been created successfully.",
      });
    },
  });

  const generateNLPMutation = useMutation({
    mutationFn: (content: string) => api.generate.nlpKeywords(content),
    onSuccess: (response) => {
      setNlpKeywords(response.keywords);
      toast({
        title: "NLP Keywords Generated",
        description: `Extracted ${response.keywords.length} semantic keywords.`,
      });
    },
  });

  const handleGenerateContent = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a content topic before generating.",
        variant: "destructive",
      });
      return;
    }

    generateContentMutation.mutate({
      topic,
      contentType,
      provider: aiProvider
    });
  };

  const costPerArticle = getCostPerArticle();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Writer</h1>
            <p className="mt-2 text-muted-foreground">Generate high-quality content with AI assistance</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Link href="/pricing">
              <Button className="gradient-button h-10">
                <Eye className="h-4 w-4 mr-2" />
                View Pricing
              </Button>
            </Link>
            <Button variant="outline" className="h-10">
              <Settings className="h-4 w-4 mr-2" />
              API Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Info Banner */}
      <Card className="mb-6 border-l-4 border-l-primary">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">
                  Current Cost: ${costPerArticle} per article
                </p>
                <p className="text-sm text-muted-foreground">
                  {hasApiKey 
                    ? `Using your ${provider} API key • ${creditsRemaining} credits remaining`
                    : "Using platform API • No API key configured"
                  }
                </p>
              </div>
            </div>
            <Badge variant={hasApiKey ? "default" : "secondary"}>
              {hasApiKey ? "API Connected" : "Platform Credits"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Generation */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">Content Topic</Label>
                <Input
                  id="topic"
                  placeholder="Enter your content topic..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contentType">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blog Article">Blog Article</SelectItem>
                      <SelectItem value="Product Description">Product Description</SelectItem>
                      <SelectItem value="Social Media Post">Social Media Post</SelectItem>
                      <SelectItem value="Email Newsletter">Email Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="aiProvider">AI Provider</Label>
                  <Select value={aiProvider} onValueChange={setAiProvider}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OpenAI GPT-4">OpenAI GPT-4</SelectItem>
                      <SelectItem value="Anthropic Claude">Anthropic Claude</SelectItem>
                      <SelectItem value="Perplexity AI">Perplexity AI (Recommended)</SelectItem>
                      <SelectItem value="Google Gemini">Google Gemini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerateContent}
                disabled={generateContentMutation.isPending || !topic.trim()}
                className="w-full h-12"
              >
                {generateContentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4 mr-2" />
                )}
                Generate Content (${costPerArticle})
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  rows={15}
                  className="w-full"
                />
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline">
                    Copy Content
                  </Button>
                  <Button variant="outline">
                    Export as Doc
                  </Button>
                  <Button>
                    Save Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-10"
                onClick={() => topic && generateKeywordsMutation.mutate(topic)}
                disabled={!topic || generateKeywordsMutation.isPending}
              >
                {generateKeywordsMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Key className="h-4 w-4 mr-2 text-primary" />
                )}
                Generate Keywords
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-10"
                onClick={() => topic && generateTitlesMutation.mutate(topic)}
                disabled={!topic || generateTitlesMutation.isPending}
              >
                {generateTitlesMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Heading className="h-4 w-4 mr-2 text-secondary" />
                )}
                Create Titles
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-10"
                onClick={() => topic && generateOutlineMutation.mutate(topic)}
                disabled={!topic || generateOutlineMutation.isPending}
              >
                {generateOutlineMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <List className="h-4 w-4 mr-2 text-emerald-600" />
                )}
                Generate Outline
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-10"
                onClick={() => generatedContent && generateNLPMutation.mutate(generatedContent)}
                disabled={!generatedContent || generateNLPMutation.isPending}
              >
                {generateNLPMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4 mr-2 text-orange-600" />
                )}
                NLP Analysis
              </Button>
            </CardContent>
          </Card>

          {/* Generated Keywords */}
          {keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Titles */}
          {titles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Title Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {titles.map((title, index) => (
                    <div 
                      key={index} 
                      className="p-2 border border-border rounded cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(title);
                        toast({ title: "Title copied to clipboard" });
                      }}
                    >
                      <p className="text-sm">{title}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Outline */}
          {outline && (
            <Card>
              <CardHeader>
                <CardTitle>Content Outline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">{outline}</pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* NLP Keywords */}
          {nlpKeywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>NLP Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {nlpKeywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
