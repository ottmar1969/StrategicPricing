import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/ui/stats-card";
import { 
  FileText, 
  Coins, 
  Search, 
  TrendingUp, 
  Download,
  Plus,
  Eye,
  Key,
  Heading,
  List,
  Brain,
  CheckCircle,
  Activity,
  BarChart3
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content & SEO Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Manage your content strategy with AI-powered tools and analytics</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Link href="/content-writer">
              <Button className="h-10">
                <Plus className="h-4 w-4 mr-2" />
                New Content
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Articles"
          value="1,247"
          change="+12% this month"
          changeType="positive"
          icon={FileText}
          iconColor="icon-bg blue"
        />
        <StatsCard
          title="Credits Remaining"
          value="89"
          change="API Key Active"
          changeType="neutral"
          icon={Coins}
          iconColor="icon-bg purple"
        />
        <StatsCard
          title="SEO Score"
          value="94/100"
          change="Excellent"
          changeType="positive"
          icon={Search}
          iconColor="icon-bg emerald"
        />
        <StatsCard
          title="Traffic Growth"
          value="+287%"
          change="vs last quarter"
          changeType="positive"
          icon={TrendingUp}
          iconColor="icon-bg orange"
        />
      </div>

      {/* Content Writer Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Content Writer</CardTitle>
              <p className="text-muted-foreground">Generate high-quality content with AI assistance</p>
            </div>
            <Link href="/pricing">
              <Button className="gradient-button h-10">
                <Eye className="h-4 w-4 mr-2" />
                View Pricing
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Content Topic</label>
                <input 
                  type="text" 
                  placeholder="Enter your content topic..." 
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Content Type</label>
                  <select className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground">
                    <option>Blog Article</option>
                    <option>Product Description</option>
                    <option>Social Media Post</option>
                    <option>Email Newsletter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">AI Provider</label>
                  <select className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground">
                    <option>OpenAI GPT-4</option>
                    <option>Anthropic Claude</option>
                    <option>Perplexity AI (Recommended)</option>
                    <option>Google Gemini</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start h-10">
                  <Key className="h-4 w-4 mr-2 text-primary" />
                  Generate Keywords
                </Button>
                <Button variant="outline" className="w-full justify-start h-10">
                  <Heading className="h-4 w-4 mr-2 text-secondary" />
                  Create Titles
                </Button>
                <Button variant="outline" className="w-full justify-start h-10">
                  <List className="h-4 w-4 mr-2 text-emerald-600" />
                  Generate Outline
                </Button>
                <Button variant="outline" className="w-full justify-start h-10">
                  <Brain className="h-4 w-4 mr-2 text-orange-600" />
                  NLP Analysis
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" className="text-primary">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-950/20 rounded-full">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Article Generated: "AI in Marketing"</p>
                  <p className="text-sm text-muted-foreground">2 hours ago • 1 credit used</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">Completed</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-950/20 rounded-full">
                  <Search className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">SEO Analysis: "Digital Marketing Keywords"</p>
                  <p className="text-sm text-muted-foreground">4 hours ago • Free tool</p>
                </div>
              </div>
              <span className="text-sm text-blue-600 font-medium">Analyzed</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-950/20 rounded-full">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Analytics Report Generated</p>
                  <p className="text-sm text-muted-foreground">1 day ago • Traffic insights</p>
                </div>
              </div>
              <span className="text-sm text-purple-600 font-medium">Ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
