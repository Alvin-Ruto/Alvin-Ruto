(function () {
    'use strict';

    const body = document.body;

    // --- Theme ---
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        const saved = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', saved);
        updateThemeIcon(themeToggle, saved);
        themeToggle.addEventListener('click', function () {
            const current = body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(themeToggle, next);
        });
    }

    function updateThemeIcon(btn, theme) {
        const icon = btn && btn.querySelector('i');
        if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // --- Mobile navigation ---
    function initMobileNav() {
        const toggle = document.querySelector('.nav-toggle');
        const drawer = document.getElementById('nav-drawer');
        const overlay = document.getElementById('nav-overlay');

        if (!toggle || !drawer || !overlay) return;

        function open() {
            drawer.classList.add('open');
            overlay.classList.add('visible');
            body.classList.add('menu-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Close menu');
        }

        function close() {
            drawer.classList.remove('open');
            overlay.classList.remove('visible');
            body.classList.remove('menu-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
        }

        toggle.addEventListener('click', function () {
            if (body.classList.contains('menu-open')) close();
            else open();
        });

        overlay.addEventListener('click', close);

        drawer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', close);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) close();
        });
    }

    // --- Active nav link by current page ---
    function setActiveNav() {
        const path = (window.location.pathname || '').replace(/^\//, '') || 'index.html';
        const fileName = path.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a[href]').forEach(function (a) {
            const href = (a.getAttribute('href') || '').split('/').pop();
            a.classList.toggle('active', href === fileName);
        });
    }

    // --- Header scroll state ---
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    header.classList.toggle('scrolled', window.pageYOffset > 60);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Scroll reveal ---
    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) entry.target.classList.add('revealed');
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        els.forEach(function (el) { observer.observe(el); });
    }

    // --- Back to top ---
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'scroll-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.pageYOffset > 400);
        }, { passive: true });
    }

    // --- Smooth scroll for # links ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            const id = a.getAttribute('href').slice(1);
            if (!id) return;
            a.addEventListener('click', function (e) {
                const target = document.getElementById(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // --- Contact form ---
    function showFormMessage(type, message) {
        const el = document.getElementById('formMessage');
        if (!el) return;
        el.className = 'form-message ' + type;
        el.innerHTML = '<i class="fas ' + (type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle') + '" aria-hidden="true"></i> ' + message;
        el.style.display = 'block';
        el.setAttribute('role', 'alert');
        setTimeout(function () {
            el.style.display = 'none';
            el.innerHTML = '';
        }, 8000);
    }

    function validateForm(form) {
        var nameEl = form.querySelector('#name') || form.querySelector('[name="name"]');
        var emailEl = form.querySelector('#email') || form.querySelector('[name="email"]');
        var subjectEl = form.querySelector('#subject') || form.querySelector('[name="subject"]');
        var messageEl = form.querySelector('#message') || form.querySelector('[name="message"]');
        var name = nameEl ? nameEl.value.trim() : '';
        var email = emailEl ? emailEl.value.trim() : '';
        var subject = subjectEl ? subjectEl.value.trim() : '';
        var message = messageEl ? messageEl.value.trim() : '';
        var valid = true;
        var formMsg = document.getElementById('formMessage');
        if (formMsg) { formMsg.style.display = 'none'; formMsg.innerHTML = ''; }
        ['name', 'email', 'subject', 'message'].forEach(function (field) {
            var err = document.getElementById(field + '-error');
            if (err) err.textContent = '';
        });
        if (!name) {
            var e = document.getElementById('name-error');
            if (e) { e.textContent = 'Please enter your name.'; valid = false; }
        }
        if (!email) {
            var e = document.getElementById('email-error');
            if (e) { e.textContent = 'Please enter your email.'; valid = false; }
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            var e = document.getElementById('email-error');
            if (e) { e.textContent = 'Please enter a valid email address.'; valid = false; }
        }
        if (!subject) {
            var e = document.getElementById('subject-error');
            if (e) { e.textContent = 'Please enter a subject.'; valid = false; }
        }
        if (!message) {
            var e = document.getElementById('message-error');
            if (e) { e.textContent = 'Please enter your message.'; valid = false; }
        }
        return valid;
    }

    function handleContactForm(e) {
        e.preventDefault();
        var form = e.target;
        var submitBtn = form.querySelector('.submit-btn');
        var originalHtml = submitBtn ? submitBtn.innerHTML : '';

        if (!validateForm(form)) return;

        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
            submitBtn.disabled = true;
        }

        var formData = new FormData(form);
        var name = formData.get('name') || '';
        var email = formData.get('email') || '';
        var subject = formData.get('subject') || '';
        var message = formData.get('message') || '';

        var templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'alvinandy16@gmail.com'
        };

        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init('YOUR_PUBLIC_KEY');
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function () {
                        showFormMessage('success', 'Thank you! Your message has been sent. I\'ll get back to you soon.');
                        form.reset();
                    }, function () {
                        showFormMessage('error', 'Something went wrong. Please try again or email alvinandy16@gmail.com directly.');
                    })
                    .finally(function () {
                        if (submitBtn) {
                            submitBtn.innerHTML = originalHtml;
                            submitBtn.disabled = false;
                        }
                    });
            } catch (err) {
                showFormMessage('error', 'Configuration error. Please email alvinandy16@gmail.com directly.');
                if (submitBtn) {
                    submitBtn.innerHTML = originalHtml;
                    submitBtn.disabled = false;
                }
            }
        } else {
            var mailto = 'mailto:alvinandy16@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
            window.location.href = mailto;
            showFormMessage('success', 'Your email client should open. Send the message from there.');
            form.reset();
            if (submitBtn) {
                submitBtn.innerHTML = originalHtml;
                submitBtn.disabled = false;
            }
        }
    }

    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', handleContactForm);
            form.querySelectorAll('input, textarea').forEach(function (field) {
                field.addEventListener('blur', function () { validateForm(form); });
            });
        }
    }

    // --- Init on DOM ready ---
    function init() {
        initTheme();
        initMobileNav();
        setActiveNav();
        initHeaderScroll();
        initReveal();
        initBackToTop();
        initSmoothScroll();
        initContactForm();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
