# Content & SEO Platform - Replit Project Guide

## Overview

This is a full-stack web application for AI-powered content creation and SEO optimization. The platform provides tools for generating content, analyzing SEO performance, and tracking analytics. It's built with a modern React frontend and Express.js backend, using PostgreSQL for data persistence and OpenAI for AI-powered features.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Radix UI with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with structured error handling
- **Middleware**: Custom logging, JSON parsing, and error handling
- **Development**: Hot reload with Vite integration in development mode

### Database Architecture
- **Database**: PostgreSQL (configured for use but may need setup)
- **ORM**: Drizzle ORM with TypeScript support
- **Schema**: Centralized in `shared/schema.ts` for type safety
- **Migrations**: Drizzle Kit for database migrations and schema management

## Key Components

### Content Management System
- **Content Generation**: AI-powered content creation using OpenAI GPT-4
- **Content Types**: Support for various content formats (blog articles, etc.)
- **Keyword Analysis**: Automated keyword generation and NLP processing
- **Content Storage**: PostgreSQL tables for content items with metadata

### SEO Tools Suite
- **Intent Mapping**: Search query intent analysis and classification
- **Competitor DNA**: Content structure and pattern analysis
- **Voice Search Optimization**: Conversational query optimization
- **SERP Features**: Search result feature prediction and optimization
- **Semantic Keyword Web**: Related term and topic cluster generation

### Analytics Platform
- **User Journey Analysis**: Behavior tracking and conversion funnel analysis
- **Content Performance**: Predictive analytics for content success metrics
- **Revenue Attribution**: Multi-touch attribution modeling
- **Competitor Traffic**: Traffic estimation and competitive analysis
- **Social Sentiment**: Social media sentiment correlation analysis

### User Management
- **User Accounts**: Basic user registration and profile management
- **Credit System**: Usage-based credit tracking for AI operations
- **API Key Management**: External AI service key management
- **Session Handling**: PostgreSQL-based session storage

## Data Flow

### Content Generation Flow
1. User submits content request through frontend forms
2. Frontend validates input and sends API request to backend
3. Backend processes request and calls OpenAI API services
4. Generated content is processed and stored in database
5. Response sent back to frontend with generated content and metadata
6. Frontend displays results and updates user interface

### SEO Analysis Flow
1. User inputs target keywords or content for analysis
2. Frontend sends analysis request to appropriate SEO service endpoint
3. Backend processes request using OpenAI-powered analysis functions
4. Analysis results are formatted and returned to frontend
5. Frontend renders interactive charts, tables, and recommendations

### Database Interaction Flow
1. All database operations go through the storage interface layer
2. Drizzle ORM handles query building and type safety
3. Connection pooling managed by Neon serverless database driver
4. Schema validation using Drizzle-Zod integration
5. Transactions handled at the service layer for data consistency

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4 model for content generation and analysis
- **API Key**: Required environment variable (OPENAI_API_KEY)
- **Usage Limits**: Managed through application credit system

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: DATABASE_URL environment variable required
- **Driver**: @neondatabase/serverless for optimized connections

### UI Dependencies
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library with consistent theming

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit integration
- **Database**: PostgreSQL 16 module in Replit environment
- **Port Configuration**: Frontend on 5000, auto-scaling deployment
- **Hot Reload**: Vite middleware integration for instant updates

### Production Build Process
1. Frontend built using Vite to `dist/public` directory
2. Backend bundled using ESBuild to `dist/index.js`
3. Static assets served directly by Express in production
4. Environment variables validated at startup

### Deployment Configuration
- **Target**: Autoscale deployment on Replit infrastructure
- **Build Command**: `npm run build` (Vite + ESBuild)
- **Start Command**: `npm run start` (production Node.js server)
- **Health Check**: Application serves on port 5000 (mapped to port 80)

### Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string (required)
- **OPENAI_API_KEY**: OpenAI API access key (required)
- **NODE_ENV**: Set to "production" for production builds

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
- June 24, 2025. Added Perplexity AI integration with 5 revolutionary SEO tools and 5 next-gen analytics tools
```

## Recent Changes

✓ Integrated Perplexity AI for real-time web data analysis
✓ Added 5 Revolutionary SEO Tools:
  - Real-Time Trending Keywords (live search data)
  - Live Competitor Gap Analyzer (current web data)
  - Live SERP Opportunity Finder (real-time search results)
  - E-A-T Authority Optimizer (Google ranking signals)
  - Enhanced existing tools with AI intelligence

✓ Added 5 Next-Gen Analytics Tools:
  - Real-Time Trend Radar (emerging trends detection)
  - Live Competitor Intelligence (real-time strategy analysis)
  - Viral Content Predictor (engagement pattern analysis)
  - Deep Audience Insights (psychographic profiling)
  - Market Intelligence Engine (multi-source data analysis)

✓ Fixed TypeScript errors and improved error handling
✓ Enhanced UI with proper tool categorization and visual indicators
✓ All tools now support both OpenAI and Perplexity AI backends

## User Preferences

```
Preferred communication style: Simple, everyday language.
```