import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import ContentWriterPro from "@/pages/content-writer-pro";
import SeoTools from "@/pages/seo-tools";
import Analytics from "@/pages/analytics";
import Pricing from "@/pages/pricing";
import Navbar from "@/components/layout/navbar";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <Navbar />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/content-writer" component={ContentWriterPro} />
        <Route path="/seo-tools" component={SeoTools} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/pricing" component={Pricing} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
