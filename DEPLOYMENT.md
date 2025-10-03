# 🚀 Deployment Guide - Alvin Kibet Portfolio

This guide will help you deploy your portfolio to Vercel with proper configuration.

## 📋 Prerequisites

- GitHub account with your portfolio repository
- Vercel account (free tier available)
- Git installed on your local machine

## 🔧 Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your repository contains all the necessary files:
- `index.html` (main page)
- `styles.css` (styling)
- `script.js` (JavaScript functionality)
- `github-api.js` (GitHub integration)
- `vercel.json` (Vercel configuration)
- `package.json` (project metadata)
- `assets/` folder (images and resources)

### 2. Connect to Vercel

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a static site

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Deploy to production
vercel --prod
```

### 3. Configure Project Settings

In the Vercel dashboard:
- **Project Name**: `alvin-kibet-portfolio`
- **Framework Preset**: Other
- **Root Directory**: `./` (default)
- **Build Command**: Leave empty (static site)
- **Output Directory**: Leave empty (static site)

### 4. Environment Variables (Optional)

If you need any environment variables:
1. Go to Project Settings → Environment Variables
2. Add any required variables (e.g., GitHub API tokens)

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## 🔧 Configuration Files Explained

### `vercel.json`
- Configures caching headers for better performance
- Sets up security headers
- Defines redirects and routes

### `package.json`
- Defines project metadata
- Includes deployment scripts
- Specifies dependencies

### `.vercelignore`
- Excludes unnecessary files from deployment
- Reduces deployment size and time

## 🚀 Deployment Commands

```bash
# Quick deployment
./deploy.sh

# Or manually:
vercel --prod

# Preview deployment
vercel
```

## 📊 Performance Optimization

The portfolio is optimized for:
- **Fast Loading**: Minified CSS/JS, optimized images
- **SEO**: Meta tags, sitemap, robots.txt
- **Caching**: Proper cache headers for static assets
- **Security**: Security headers configured

## 🔍 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Contact form works
- [ ] GitHub projects load
- [ ] Dark/light mode toggle works
- [ ] Mobile responsiveness
- [ ] SEO meta tags display correctly

## 🐛 Troubleshooting

### Common Issues:

1. **404 Errors**: Check file paths and `vercel.json` configuration
2. **GitHub API Issues**: Verify API endpoints and fallback data
3. **Styling Issues**: Check CSS file paths and CDN links
4. **Performance Issues**: Verify caching headers in `vercel.json`

### Debug Commands:
```bash
# Check deployment logs
vercel logs

# Test locally
vercel dev

# Check build output
vercel build
```

## 📈 Analytics & Monitoring

Consider adding:
- Google Analytics
- Vercel Analytics
- Performance monitoring
- Error tracking

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Easy rollback to previous versions

## 📞 Support

If you encounter issues:
1. Check Vercel documentation
2. Review deployment logs
3. Test locally first
4. Contact Vercel support if needed

---

**Your portfolio should now be live at: `https://your-project-name.vercel.app`**

🎉 **Congratulations! Your portfolio is now deployed and ready to impress!**
