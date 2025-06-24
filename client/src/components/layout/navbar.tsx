import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, ChartLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white dark:bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ChartLine className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">ContentScale Pro</span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link href="/">
                <a className={`nav-link ${isActive("/") ? "active" : ""}`}>
                  Dashboard
                </a>
              </Link>
              <Link href="/content-writer">
                <a className={`nav-link ${isActive("/content-writer") ? "active" : ""}`}>
                  Content Writer
                </a>
              </Link>
              <Link href="/seo-tools">
                <a className={`nav-link ${isActive("/seo-tools") ? "active" : ""}`}>
                  SEO Tools
                </a>
              </Link>
              <Link href="/analytics">
                <a className={`nav-link ${isActive("/analytics") ? "active" : ""}`}>
                  Analytics
                </a>
              </Link>
              <Link href="/pricing">
                <a className={`nav-link ${isActive("/pricing") ? "active" : ""}`}>
                  Pricing
                </a>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                    U
                  </div>
                  <span className="text-foreground">User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
