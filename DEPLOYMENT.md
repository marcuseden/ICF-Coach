# Deployment Guide

## Quick Deploy to Vercel

The easiest way to deploy YourCoachAgent is using Vercel:

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Next.js and deploy

**Build Settings:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## Deploy to Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: (leave empty)

### Railway

1. Visit [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Railway will auto-detect and deploy

### DigitalOcean App Platform

1. Visit [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create new App
3. Connect your repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`

## Environment Variables

Currently no environment variables are required. When you add backend features, you'll need:

```env
# Example for future backend integration
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=your_api_url
AUTH_SECRET=your_auth_secret
```

## Production Checklist

- [ ] Test all flows (landing → onboarding → session)
- [ ] Verify mobile responsiveness
- [ ] Check dark mode appearance
- [ ] Test package selection
- [ ] Verify questionnaire submissions
- [ ] Test reading material tracking
- [ ] Verify progress tracking
- [ ] Check all navigation flows
- [ ] Test 404 page
- [ ] Verify SEO metadata

## Performance Optimization

The app is already optimized with:
- Next.js App Router for automatic code splitting
- Tailwind CSS for minimal CSS bundle
- Static components where possible
- Optimized fonts (Geist Sans & Mono)

## Monitoring

Consider adding:
- **Analytics**: Vercel Analytics, Google Analytics, or Plausible
- **Error Tracking**: Sentry or LogRocket
- **Performance**: Vercel Speed Insights or Lighthouse CI

## Custom Domain

### Vercel
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as shown

### Netlify
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps

## SSL/HTTPS

All modern platforms (Vercel, Netlify, etc.) provide automatic SSL certificates via Let's Encrypt. No configuration needed.

## Scaling

Current architecture is serverless and scales automatically. When you add backend:
- Use serverless functions for API routes
- Implement database connection pooling
- Add caching layer (Redis/Upstash)
- Consider CDN for static assets

## Backup & Recovery

1. Keep code in version control (Git)
2. Regular database backups (when backend added)
3. Document deployment process
4. Maintain staging environment

## Cost Estimates

### Vercel (Recommended)
- **Hobby**: Free for personal projects
- **Pro**: $20/month for commercial use
- Includes: Automatic deployments, SSL, CDN, Analytics

### Netlify
- **Starter**: Free
- **Pro**: $19/month
- Includes: 100GB bandwidth, forms, functions

### Railway
- **Free**: $5 credit/month
- **Pro**: Pay as you go
- Good for full-stack apps with database

## Support

For deployment issues:
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Vercel support: [vercel.com/support](https://vercel.com/support)
- Community help: [GitHub Discussions](https://github.com/vercel/next.js/discussions)

