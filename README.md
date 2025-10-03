# Alvin Kibet - Portfolio

A modern portfolio website showcasing my work as a Full Stack Developer, Mobile Application Developer, and Data Scientist with a passion for agribusiness innovation.

## ✨ Features

### 🎨 Design Features
- **Dark/Light Mode Toggle** - Theme switching with persistent preferences
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Animations** - Scroll animations and transitions
- **Modern UI Components** - Clean, professional design with hover effects

### 🚀 Interactive Features
- **GitHub Integration** - Project fetching from GitHub API
- **Contact Form** - Functional contact form with validation
- **Scroll-to-Top Button** - Easy navigation with floating buttons
- **Typing Animation** - Hero section with typewriter effect
- **Parallax Effects** - Subtle parallax scrolling

### 📱 Sections
- **Skills Showcase** - Organized skill categories with interactive tags
- **Project Gallery** - Dynamic project cards with GitHub integration
- **Social Media Links** - Interactive social media buttons
- **Floating Action Buttons** - Quick access to resume and contact

### 🔧 Technical Features
- **CSS Variables** - Consistent theming and customization
- **Intersection Observer** - Performance-optimized scroll animations
- **Local Storage** - Theme preference persistence
- **Error Handling** - Graceful fallbacks for API failures
- **Loading States** - Skeleton loaders for better UX

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Interactive functionality and API integration
- **Font Awesome** - Professional iconography
- **Google Fonts** - Typography (Poppins & Playfair Display)

### APIs & Integration
- **GitHub API** - Dynamic project fetching
- **Form Handling** - Contact form with validation
- **Local Storage** - User preference persistence

## 📁 Project Structure

```
Alvin-Ruto/
├── index.html              # Main homepage
├── about.html              # About page
├── experience.html         # Experience page
├── work.html              # Work showcase page
├── contact.html           # Contact page with form and social links
├── styles.css             # CSS with theme support
├── script.js              # Main JavaScript functionality
├── github-api.js          # GitHub API integration
├── assets/                # Images and resources
│   ├── logo.jpg
│   ├── alvin-kibet.jpg
│   ├── profile-image.jpg
│   ├── my_resume.pdf
│   └── [other assets]
└── README.md              # This file
```

## 🚀 Getting Started

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/Alvin-Ruto/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Navigate the portfolio**
   - Explore different sections using the navigation
   - Try the dark/light mode toggle
   - Test the contact form
   - View GitHub projects

### Customization

#### Adding Your GitHub Projects
1. Update the username in `github-api.js`:
   ```javascript
   const github = new GitHubAPI('your-username');
   ```

2. Customize project display in `script.js`:
   - Modify `createProjectCard()` function
   - Update mock projects in `loadMockProjects()`

#### Theme Customization
1. Edit CSS variables in `styles.css`:
   ```css
   :root {
       --accent-color: #your-color;
       --bg-primary: #your-bg;
       /* ... other variables */
   }
   ```

#### Content Updates
1. **Personal Information**: Update contact details in all HTML files
2. **Skills**: Modify the skills section in `index.html`
3. **Experience**: Update experience details in `experience.html`
4. **About**: Customize the about section in `about.html`

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your portfolio will be available at `https://yourusername.github.io`

### Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings (no build process needed)
3. Deploy automatically on every push

### Vercel
1. Import your GitHub repository to Vercel
2. Configure as a static site
3. Deploy with automatic updates

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔧 Performance Features

- **Lazy Loading** - Images and content load as needed
- **Optimized Animations** - Hardware-accelerated CSS animations
- **Minimal Dependencies** - Lightweight and fast loading
- **Responsive Images** - Optimized for different screen sizes

## 📞 Contact & Support

- **Email**: alvinandy16@gmail.com
- **Phone**: +254 713 272 166
- **LinkedIn**: [Alvin Kibet Ruto](https://www.linkedin.com/in/alvin-kibet-ruto)
- **GitHub**: [Alvin-Ruto](https://github.com/Alvin-Ruto)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Alvin-Ruto/portfolio/issues).

## 🙏 Acknowledgments

- Font Awesome for the amazing icons
- Google Fonts for beautiful typography
- GitHub for the API integration
- All the open-source libraries that made this possible

---

**Built with ❤️ by Alvin Kibet Ruto**