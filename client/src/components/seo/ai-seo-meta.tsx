import { useEffect } from 'react';

// Enhanced AI-First SEO Meta Component
export default function AISEOMeta() {
  useEffect(() => {
    // AI-First Meta Tags for Rapid Ranking
    const metaTags = [
      // Core AI Search Optimization
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      
      // AI Understanding Signals
      { name: 'content-language', content: 'en-US' },
      { name: 'article:author', content: 'ContentScale Pro Expert Team' },
      { name: 'article:publisher', content: 'ContentScale Pro' },
      { name: 'article:section', content: 'AI SEO Tools & Content Optimization' },
      
      // Google AI Overview Optimization
      { name: 'google-site-verification', content: 'ai-optimized-content-platform' },
      { name: 'referrer', content: 'origin-when-cross-origin' },
      
      // Voice Search & Conversational AI
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      
      // Content Freshness for AI
      { name: 'article:modified_time', content: new Date().toISOString() },
      { name: 'article:published_time', content: new Date().toISOString() },
      
      // E-A-T Signals
      { name: 'author', content: 'ContentScale Pro AI Specialists' },
      { name: 'expertise-level', content: 'expert' },
      { name: 'content-authority', content: 'high' },
      { name: 'trust-score', content: '95' },
      
      // AI Search Engine Hints
      { name: 'ai-content-type', content: 'educational-tool' },
      { name: 'ai-audience', content: 'seo-professionals-marketers' },
      { name: 'ai-intent', content: 'solve-seo-problems' },
      { name: 'featured-snippet-ready', content: 'true' },
      
      // Technical SEO for AI Crawlers
      { name: 'theme-color', content: '#0066cc' },
      { name: 'msapplication-TileColor', content: '#0066cc' },
      { name: 'apple-mobile-web-app-title', content: 'ContentScale Pro' }
    ];

    // Open Graph for AI Social Understanding
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ContentScale Pro' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:updated_time', content: new Date().toISOString() },
      { property: 'article:tag', content: 'AI SEO, Content Optimization, Google AI Overview, Featured Snippets' }
    ];

    // Twitter Cards for AI Discovery
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ContentScalePro' },
      { name: 'twitter:creator', content: '@ContentScalePro' },
      { name: 'twitter:label1', content: 'Tools' },
      { name: 'twitter:data1', content: '14 AI-Powered SEO Tools' },
      { name: 'twitter:label2', content: 'Ranking Speed' },
      { name: 'twitter:data2', content: 'Days, Not Weeks' }
    ];

    // Apply all meta tags
    [...metaTags, ...ogTags, ...twitterTags].forEach(tag => {
      const attribute = 'property' in tag ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${tag[attribute as keyof typeof tag]}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, tag[attribute as keyof typeof tag] as string);
        document.head.appendChild(element);
      }
      
      element.content = tag.content;
    });

    // Enhanced Structured Data for AI Understanding
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": `${window.location.origin}/#webapp`,
          "name": "ContentScale Pro",
          "description": "AI-powered SEO platform with 14 revolutionary tools for rapid ranking success",
          "url": window.location.origin,
          "applicationCategory": "SEO & Content Marketing",
          "operatingSystem": "Web Browser",
          "browserRequirements": "Requires JavaScript. Works best with modern browsers.",
          "softwareVersion": "2.0",
          "dateCreated": "2024-01-01",
          "dateModified": new Date().toISOString(),
          "creator": {
            "@type": "Organization",
            "@id": `${window.location.origin}/#organization`
          },
          "featureList": [
            "AI Content Generation with CRAFT Framework",
            "Real-Time SEO Analysis",
            "Google AI Overview Optimization", 
            "Featured Snippet Creation",
            "E-A-T Enhancement for Authority",
            "Voice Search Optimization",
            "Competitor Intelligence Analysis",
            "Rapid Ranking Content Generation",
            "AI-Powered Analytics Dashboard",
            "Semantic Keyword Research"
          ],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/OnlineOnly"
          }
        },
        {
          "@type": "Organization",
          "@id": `${window.location.origin}/#organization`,
          "name": "ContentScale Pro",
          "url": window.location.origin,
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/logo.png`,
            "width": 400,
            "height": 400
          },
          "sameAs": [],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["en", "English"]
          },
          "description": "Leading AI-powered SEO platform helping businesses rank faster with advanced content optimization tools"
        },
        {
          "@type": "WebSite",
          "@id": `${window.location.origin}/#website`,
          "url": window.location.origin,
          "name": "ContentScale Pro",
          "description": "AI SEO Platform for Rapid Ranking Success",
          "publisher": {
            "@id": `${window.location.origin}/#organization`
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": window.location.origin
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "SEO Tools",
              "item": `${window.location.origin}/seo-tools`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Analytics",
              "item": `${window.location.origin}/analytics`
            }
          ]
        }
      ]
    };

    // Update structured data
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    // AI-First Performance Hints
    const preloadLinks = [
      { rel: 'preload', href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      { rel: 'preload', href: '/api/user/1', as: 'fetch', crossorigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://api.perplexity.ai' },
      { rel: 'dns-prefetch', href: 'https://api.openai.com' }
    ];

    preloadLinks.forEach(link => {
      let element = document.querySelector(`link[rel="${link.rel}"][href="${link.href}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        Object.entries(link).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        document.head.appendChild(element);
      }
    });

  }, []);

  return null;
}