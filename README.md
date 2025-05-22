# Turbo Blog – AI-Powered Blog Generator

Turbo Blog is a full-stack web application that lets users generate high-quality, SEO-optimized blog posts using AI (DeepSeek API). Users can fill out a form with their blog requirements, generate content, preview and edit the result, and save or publish their posts.

## Features

- **AI Blog Generation:** Fill out a form (title, keywords, language, size, tone, details) and generate a complete blog post using DeepSeek's AI.
- **SEO Optimization:** Prompts are crafted to ensure the generated content is SEO-friendly and human-like.
- **User Authentication:** Secure login and session management using Supabase.
- **Blog Management:** Save generated blogs, view all your saved posts, and manage them from a dashboard.
- **Export & Publish:** Download your blog as HTML or publish directly to WordPress (with credentials).
- **Subscription Plans:** Blog generation limits and upgrade options based on user plans.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API routes, Supabase (database & auth)
- **AI Integration:** DeepSeek API for blog content generation
- **Other:** WordPress REST API integration, Markdown rendering

## Project Structure

```
src/
  app/
    blog-generator/         # Blog generation form & interface
    saved-blogs/            # Saved blogs dashboard & detail pages
    api/                    # API routes (generate, save, retrieve blogs)
  components/               # UI components (forms, dialogs, blog cards, etc.)
  lib/                      # Shared types and utilities
  utils/                    # Supabase and other helpers
public/                     # Static assets (images, icons)
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/turbo-blog.git
   cd turbo-blog
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your Supabase and DeepSeek API keys.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage

- Go to `/blog-generator` to create a new blog post.
- Fill out the form with your topic, keywords, language, size, tone, and any extra details.
- Click "Generate Blog Post" to let the AI create your content.
- Preview, edit, and save your blog, or publish it to WordPress if your plan allows.
- Manage your saved blogs from the `/saved-blogs` page.

## Deployment

- Deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js.
- Make sure to set all required environment variables in your deployment settings.