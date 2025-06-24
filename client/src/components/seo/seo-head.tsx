import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  structuredData?: any;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  };
}

export default function SEOHead({
  title = "ContentScale Pro - AI-Powered SEO & Content Platform | Rank in Days Not Weeks",
  description = "Revolutionary AI-powered SEO platform with real-time analytics, competitor intelligence, and content optimization. 10 advanced tools for instant ranking improvements. E-A-T optimized for Google AI Overview.",
  keywords = ["AI SEO tools", "content optimization", "Google AI Overview", "featured snippets", "SEO ranking", "content marketing", "AI analytics", "competitor analysis", "E-A-T optimization", "real-time SEO"],
  canonicalUrl = window.location.href,
  structuredData,
  openGraph = {}
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set page title with optimal length for AI engines
    document.title = title;
    
    // Meta description optimized for AI understanding
    updateMetaTag('description', description);
    
    // Keywords for traditional and AI search engines
    updateMetaTag('keywords', keywords.join(', '));
    
    // Canonical URL to prevent duplicate content issues
    updateLinkTag('canonical', canonicalUrl);
    
    // Open Graph for social AI crawlers
    updateMetaTag('og:title', openGraph.title || title, 'property');
    updateMetaTag('og:description', openGraph.description || description, 'property');
    updateMetaTag('og:type', openGraph.type || 'website', 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:site_name', 'ContentScale Pro', 'property');
    
    // Twitter Cards for AI social crawlers
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    
    // Critical AI-first meta tags
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // AI search optimization
    updateMetaTag('article:author', 'ContentScale Pro AI Team');
    updateMetaTag('article:publisher', 'ContentScale Pro');
    updateMetaTag('article:section', 'SEO & Content Marketing');
    
    // Google AI Overview optimization
    updateMetaTag('google-site-verification', 'AI-optimized-content-platform');
    updateMetaTag('format-detection', 'telephone=no');
    
    // Structured data for AI understanding
    if (structuredData) {
      updateStructuredData(structuredData);
    } else {
      // Default structured data for AI engines
      updateStructuredData(getDefaultStructuredData());
    }
    
    // Language and locale for AI
    updateMetaTag('language', 'en-US');
    updateMetaTag('locale', 'en_US', 'property');
    
    // Content freshness signals for AI
    updateMetaTag('article:modified_time', new Date().toISOString(), 'property');
    updateMetaTag('article:published_time', new Date().toISOString(), 'property');
    
  }, [title, description, keywords, canonicalUrl, structuredData, openGraph]);

  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.content = content;
  };

  const updateLinkTag = (rel: string, href: string) => {
    let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    if (!element) {
      element = document.createElement('link');
      element.rel = rel;
      document.head.appendChild(element);
    }
    element.href = href;
  };

  const updateStructuredData = (data: any) => {
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  };

  const getDefaultStructuredData = () => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${window.location.origin}/#website`,
        "url": window.location.origin,
        "name": "ContentScale Pro",
        "description": "AI-Powered SEO & Content Optimization Platform",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${window.location.origin}/#organization`,
        "name": "ContentScale Pro",
        "url": window.location.origin,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "en"
        },
        "sameAs": []
      },
      {
        "@type": "WebPage",
        "@id": `${window.location.href}#webpage`,
        "url": window.location.href,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${window.location.origin}/#website`
        },
        "about": {
          "@id": `${window.location.origin}/#organization`
        },
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "inLanguage": "en-US",
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "ContentScale Pro",
          "applicationCategory": "SEO Software",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          }
        ]
      }
    ]
  });

  return null;
}