document.addEventListener("DOMContentLoaded", function () {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Smooth scrolling for navigation (only for same-page links)
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            // Only prevent default for same-page links (starting with #)
            if (href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
            // For external page links (like about.html, contact.html), let them navigate normally
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .skill-category, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Load GitHub projects (mock data for now)
    // loadGitHubProjects(); // Projects are now static in HTML

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Typing animation for hero text
    const heroTitle = document.querySelector('.hero-left h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Contact Form Handler with EmailJS
function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // EmailJS template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'alvinandy16@gmail.com'
    };
    
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        // Initialize EmailJS with your public key (you'll need to replace this)
        emailjs.init('YOUR_PUBLIC_KEY');
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showFormMessage('error', 'Sorry, there was an error sending your message. Please try again or contact me directly at alvinandy16@gmail.com');
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    } else {
        // Fallback: Open email client
        const emailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:alvinandy16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink);
        
        showFormMessage('success', 'Your email client has been opened. Please send the message from there.');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showFormMessage(type, message) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert before submit button
    const submitBtn = form.querySelector('.submit-btn');
    form.insertBefore(messageDiv, submitBtn);
    
    // Auto-remove message after 8 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 8000);
}

// GitHub Projects Loading Function
async function loadGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    try {
        // Try to load GitHub API script
        if (typeof GitHubAPI !== 'undefined') {
            const github = new GitHubAPI('Alvin-Ruto');
            const projects = await github.fetchRepositories();
            
            // Clear loading skeleton
            projectsGrid.innerHTML = '';

            // Add project cards
            projects.forEach(project => {
                const projectCard = createProjectCard(project);
                projectsGrid.appendChild(projectCard);
            });
        } else {
            // Fallback to mock data
            loadMockProjects();
        }
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        loadMockProjects();
    }
}

function loadMockProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    // Mock projects data
    const mockProjects = [
        {
            name: "AgriTech Dashboard",
            description: "A comprehensive dashboard for managing agricultural data and analytics with real-time monitoring capabilities.",
            language: "React",
            stars: 15,
            forks: 8,
            url: "https://github.com/Alvin-Ruto/agritech-dashboard",
            topics: ["React", "Data Visualization", "Agriculture"]
        },
        {
            name: "Mobile Farm Management",
            description: "Cross-platform mobile application for farm management with offline capabilities and GPS integration.",
            language: "React Native",
            stars: 23,
            forks: 12,
            url: "https://github.com/Alvin-Ruto/mobile-farm-management",
            topics: ["React Native", "Mobile", "Agriculture"]
        },
        {
            name: "Data Science Portfolio",
            description: "Collection of data science projects including machine learning models and data analysis notebooks.",
            language: "Python",
            stars: 31,
            forks: 18,
            url: "https://github.com/Alvin-Ruto/data-science-portfolio",
            topics: ["Python", "Machine Learning", "Data Analysis"]
        },
        {
            name: "E-commerce Platform",
            description: "Full-stack e-commerce platform with payment integration and admin dashboard.",
            language: "Node.js",
            stars: 19,
            forks: 7,
            url: "https://github.com/Alvin-Ruto/ecommerce-platform",
            topics: ["Node.js", "E-commerce", "Payment Integration"]
        }
    ];

    // Clear loading skeleton
    projectsGrid.innerHTML = '';

    // Add project cards
    mockProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-content">
            <div class="project-header">
                <h3>${project.name}</h3>
                <div class="project-stats">
                    <span class="stat"><i class="fas fa-star"></i> ${project.stars}</span>
                    <span class="stat"><i class="fas fa-code-branch"></i> ${project.forks}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                <span class="tech-badge">${project.language}</span>
                ${project.topics.map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
            </div>
            <div class="project-actions">
                <a href="${project.url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View Code
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Add CSS for project cards
const projectCardStyles = `
    .project-content {
        padding: 25px;
    }
    
    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 15px;
    }
    
    .project-header h3 {
        font-size: 20px;
        font-weight: 600;
        color: var(--accent-color);
        margin: 0;
    }
    
    .project-stats {
        display: flex;
        gap: 15px;
    }
    
    .stat {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        color: var(--text-secondary);
    }
    
    .project-description {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 20px;
    }
    
    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 20px;
    }
    
    .tech-badge {
        background: var(--accent-color);
        color: var(--bg-primary);
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .tech-tag {
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 12px;
        border: 1px solid var(--border-color);
    }
    
    .project-actions {
        text-align: center;
    }
    
    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 10px 20px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 500;
        font-size: 14px;
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;
    }
    
    .project-link:hover {
        background: var(--accent-color);
        color: var(--bg-primary);
        transform: translateY(-2px);
    }
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.textContent = projectCardStyles;
document.head.appendChild(styleSheet);
