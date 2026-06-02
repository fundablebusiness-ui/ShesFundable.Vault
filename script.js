// Smooth scroll function
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Scroll to Top Button
const scrollToTopButton = document.getElementById('scrollToTop');
const mobileStickyCtaHero = document.getElementById('mobileStickyCtaHero');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add('show');
        if (mobileStickyCtaHero) {
            mobileStickyCtaHero.style.display = 'block';
        }
    } else {
        scrollToTopButton.classList.remove('show');
        if (mobileStickyCtaHero) {
            mobileStickyCtaHero.style.display = 'none';
        }
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FAQ Accordion
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Toggle current item
    faqItem.classList.toggle('active');
}

// Intersection Observer for Fade-in Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-up elements
document.querySelectorAll('.fade-in-up').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Sticky Navigation Background
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// Form Submission Handler (for future integration)
const ctaButton = document.getElementById('ctaButton');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // This will integrate with your payment processor
        console.log('CTA Button clicked - Ready for payment integration');
        // Placeholder for payment integration (Stripe, PayPal, etc.)
    });
}

// Lazy Loading Images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Performance: Prefetch key resources
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Prefetch fonts or other resources
        const link = document.createElement('link');
        link.rel = 'prefetch';
        document.head.appendChild(link);
    });
}

// Analytics Event Tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
}

// Track CTA clicks
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        trackEvent('cta_click', {
            text: button.innerText,
            timestamp: new Date().toISOString()
        });
    });
});

// Prevent double-clicks on buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.disabled) e.preventDefault();
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, 1000);
    });
});

// Check for mobile view and show sticky CTA
function checkMobileView() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && mobileStickyCtaHero) {
        mobileStickyCtaHero.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
}

window.addEventListener('resize', checkMobileView);
checkMobileView();

// Initial page load optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading states
    document.body.classList.remove('loading');

    // Initialize any third-party scripts (if needed)
    console.log('Page loaded and ready');
});

// Performance monitoring
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });
        perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

// Utility function for form validation (for future forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

console.log('ShesFundable.Vault Landing Page - Script loaded successfully');