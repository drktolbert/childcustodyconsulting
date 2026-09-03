/**
 * Premium Professional Services - Main JavaScript
 * Interactive features and enhancements
 */

// Mobile Menu Toggle - Updated for new navigation
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scroll for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();

    // Smooth scrolling for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll animations
    addScrollAnimations();

    // Form validation enhancements
    enhanceForms();

    // Add number counter animations
    animateCounters();

    // Navbar scroll effect
    handleNavbarScroll();
});

// Scroll Animation Observer
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const cards = document.querySelectorAll('.card, .service-card, .blog-card, .product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Enhanced Form Validation
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Skip forms with real action URLs (e.g., FormSpree)
        if (form.getAttribute('action') && form.getAttribute('action').startsWith('http')) {
            // Only add real-time validation, don't intercept submission
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            successMsg.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 24px;">✓</span>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">Message Sent Successfully!</div>
                        <div style="font-size: 14px; opacity: 0.9;">We'll respond within 24 hours.</div>
                    </div>
                </div>
            `;
            document.body.appendChild(successMsg);

            // Remove after 5 seconds
            setTimeout(() => {
                successMsg.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => successMsg.remove(), 300);
            }, 5000);

            // Reset form
            form.reset();
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    } else if (type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }

    // Remove existing error
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();

    // Add error if invalid
    if (!isValid) {
        field.style.borderColor = '#e74c3c';
        const error = document.createElement('div');
        error.className = 'field-error';
        error.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 4px;';
        error.textContent = message;
        field.parentElement.appendChild(error);
    } else {
        field.style.borderColor = '';
    }
}

// Email Validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Animate Number Counters
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = target.getAttribute('data-counter');
                animateValue(target, 0, parseFloat(targetValue), 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Animate Value Function
function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;
    const suffix = element.textContent.replace(/[0-9.,]/g, '');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;

        element.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 4px 12px rgba(26, 43, 71, 0.15)';
        } else {
            nav.style.boxShadow = '0 1px 3px rgba(26, 43, 71, 0.08)';
        }

        lastScroll = currentScroll;
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.6s ease;
    }

    /* Loading States */
    .btn:active {
        transform: scale(0.98);
    }

    /* Improved Focus States */
    input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: var(--color-primary) !important;
        box-shadow: 0 0 0 3px rgba(26, 43, 71, 0.1) !important;
    }

    /* Smooth Page Transitions */
    body {
        animation: fadeIn 0.3s ease;
    }

    /* Enhanced Button Interactions */
    .btn {
        position: relative;
        overflow: hidden;
    }

    .btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }

    .btn:active::before {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(style);

// Back to Top Button
window.addEventListener('scroll', function() {
    let backToTop = document.getElementById('backToTop');

    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.innerHTML = '↑';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 999;
            display: none;
        `;
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        backToTop.addEventListener('mouseenter', () => {
            backToTop.style.transform = 'scale(1.1)';
        });
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'scale(1)';
        });
        document.body.appendChild(backToTop);
    }

    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Console branding
console.log('%c Premium Professional Services ', 'background: linear-gradient(135deg, #1a2b47, #c9b18a); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Strategic Excellence Since 2010 ', 'color: #1a2b47; font-size: 12px;');
