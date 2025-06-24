import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PricingCard from "@/components/pricing/pricing-card";
import { useApiKey } from "@/hooks/use-api-key";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { 
  Key, 
  ShoppingCart, 
  MessageCircle, 
  Check,
  Star,
  Zap,
  Shield,
  Headphones
} from "lucide-react";

export default function Pricing() {
  const { hasApiKey, provider, creditsRemaining, getCostPerArticle } = useApiKey();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const purchaseCreditsMutation = useMutation({
    mutationFn: (data: { amount: number; credits: number }) => 
      api.credits.create({
        userId: 1, // Demo user ID
        amount: data.amount,
        type: "purchase",
        description: `Purchased ${data.credits} credits`
      }),
    onSuccess: () => {
      toast({
        title: "Credits Purchased",
        description: "Your credits have been added to your account successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Purchase Failed",
        description: "Failed to purchase credits. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePlanSelect = (planType: string) => {
    setSelectedPlan(planType);
    
    switch (planType) {
      case "free":
        toast({
          title: "Current Plan",
          description: "You're already on the free plan!",
        });
        break;
      case "api":
        toast({
          title: "API Key Setup",
          description: "Please configure your API key in the settings.",
        });
        break;
      case "platform":
        toast({
          title: "Platform Credits",
          description: "Choose a credit package below to get started.",
        });
        break;
    }
  };

  const handleCreditPurchase = (credits: number, price: number) => {
    purchaseCreditsMutation.mutate({ amount: price, credits });
  };

  const costPerArticle = getCostPerArticle();

  const creditPackages = [
    {
      credits: 25,
      price: 50,
      pricePerArticle: 2.00,
      savings: null,
      popular: false
    },
    {
      credits: 50,
      price: 90,
      pricePerArticle: 1.80,
      savings: "Save 10%",
      popular: true
    },
    {
      credits: 100,
      price: 160,
      pricePerArticle: 1.60,
      savings: "Save 20%",
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that works best for your content strategy. All plans include access to our revolutionary SEO and analytics tools.
        </p>
      </div>

      {/* Current Status Banner */}
      {hasApiKey && (
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-950/20 rounded-full">
                  <Key className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">API Key Connected</p>
                  <p className="text-sm text-muted-foreground">
                    Using {provider} • {creditsRemaining} credits remaining • ${costPerArticle} per article
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        <PricingCard
          title="Free Starter"
          price="$0"
          period="/month"
          features={[
            "1 AI-generated article",
            "Basic SEO tools access",
            "Community support",
            "Standard templates"
          ]}
          buttonText="Current Plan"
          buttonVariant="outline"
          onSelect={() => handlePlanSelect("free")}
        />

        <PricingCard
          title="API Key Plan"
          price="$1"
          period="/article"
          features={[
            "Unlimited articles (with your API)",
            "All SEO & Analytics tools",
            "Multi-provider AI support",
            "Priority support",
            "Advanced templates",
            "Export functionality"
          ]}
          buttonText={hasApiKey ? "Current Plan" : "Setup API Key"}
          buttonVariant={hasApiKey ? "outline" : "default"}
          featured={!hasApiKey}
          onSelect={() => handlePlanSelect("api")}
        />

        <PricingCard
          title="Platform Credits"
          price="$2"
          period="/article"
          features={[
            "No API key required",
            "All SEO & Analytics tools", 
            "Credit packages available",
            "Bulk discounts via WhatsApp",
            "Premium support",
            "Priority processing"
          ]}
          buttonText="Buy Credits"
          onSelect={() => handlePlanSelect("platform")}
        />
      </div>

      {/* Credit Packages */}
      <Card className="mb-12">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Credit Packages</CardTitle>
          <p className="text-muted-foreground">
            Choose from our flexible credit packages. Larger packages offer better value.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {creditPackages.map((pkg, index) => (
              <div 
                key={index}
                className={`pricing-card ${pkg.popular ? "featured" : ""}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-medium">
                      Best Value
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{pkg.credits} Credits</div>
                  <div className="text-2xl font-bold text-primary mt-2">${pkg.price}</div>
                  <div className="text-sm text-muted-foreground">${pkg.pricePerArticle.toFixed(2)} per article</div>
                  {pkg.savings && (
                    <div className="text-sm text-emerald-600 font-medium mt-2">{pkg.savings}</div>
                  )}
                  <Button 
                    onClick={() => handleCreditPurchase(pkg.credits, pkg.price)}
                    disabled={purchaseCreditsMutation.isPending}
                    className="w-full mt-4 h-12"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Comparison */}
      <Card className="mb-12">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Feature Comparison</CardTitle>
          <p className="text-muted-foreground">
            See what's included with each plan
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Features</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4">API Key</th>
                  <th className="text-center py-4 px-4">Platform</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3 px-4">AI-generated articles</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                  <td className="text-center py-3 px-4">Per credit</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">SEO Tools</td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Analytics Tools</td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Multi-provider AI</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Priority Support</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Export functionality</td>
                  <td className="text-center py-3 px-4">-</td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Purchase CTA */}
      <Card className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Need More Credits?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For bulk purchases, enterprise plans, or custom solutions, contact us directly on WhatsApp. 
              We offer special pricing for high-volume users and agencies.
            </p>
            <Button 
              size="lg" 
              className="gradient-button"
              onClick={() => window.open("https://wa.me/1234567890", "_blank")}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">How do API keys work?</h4>
              <p className="text-sm text-muted-foreground">
                Connect your own OpenAI, Anthropic, or other provider API keys to get the best rates ($1/article) 
                and unlimited usage within your API limits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What if I don't have an API key?</h4>
              <p className="text-sm text-muted-foreground">
                No problem! Use our platform credits at $2/article with no setup required. 
                Perfect for trying out the service or occasional use.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do credits expire?</h4>
              <p className="text-sm text-muted-foreground">
                No, your credits never expire. Use them at your own pace and they'll always be available in your account.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Can I switch between plans?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! You can switch between using your API key and platform credits anytime. 
                The system automatically uses the most cost-effective option.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What's included in SEO tools?</h4>
              <p className="text-sm text-muted-foreground">
                All plans include our 5 revolutionary SEO tools: AI Intent Mapper, Competitor DNA, 
                Voice Search Optimizer, SERP Feature Predictor, and Semantic Keyword Web.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee on credit purchases. 
                Contact support if you're not satisfied with our service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
