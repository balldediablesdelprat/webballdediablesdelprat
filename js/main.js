/**
 * Ball de Diables del Prat - Main JavaScript
 * Author: Ball de Diables del Prat
 * Year: 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Smooth Scrolling Navigation
    // ================================
    
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ================================
    // Countdown Timer
    // ================================
    
    function initCountdownTimer() {
        function updateCountdown() {
            // Festa Major 2025 - Last weekend of September (assumed Sept 27, 2025)
            const festaMajor = new Date('2025-09-27T00:00:00').getTime();
            const now = new Date().getTime();
            const distance = festaMajor - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Update DOM elements
                const daysElement = document.getElementById('days');
                const hoursElement = document.getElementById('hours');
                const minutesElement = document.getElementById('minutes');
                const secondsElement = document.getElementById('seconds');

                if (daysElement) daysElement.textContent = days;
                if (hoursElement) hoursElement.textContent = hours;
                if (minutesElement) minutesElement.textContent = minutes;
                if (secondsElement) secondsElement.textContent = seconds;
            } else {
                // Event has passed
                const countdownElements = document.querySelectorAll('.countdown-number');
                countdownElements.forEach(el => el.textContent = '0');
                
                // Update title
                const titleElement = document.querySelector('.counter-title');
                if (titleElement) {
                    titleElement.textContent = "Festa Major 2025 Finalitzada!";
                }
            }
        }

        // Update countdown every second
        updateCountdown(); // Initial call
        setInterval(updateCountdown, 1000);
    }

    // ================================
    // Interactive Timeline
    // ================================
    
    function initInteractiveTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                timelineItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // Optional: Add analytics or tracking here
                const eventName = this.getAttribute('data-event');
                if (eventName) {
                    console.log(`Timeline event clicked: ${eventName}`);
                }
            });

            // Add keyboard accessibility
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Make items focusable
            item.setAttribute('tabindex', '0');
        });
    }

    // ================================
    // Contact Form Handling
    // ================================
    
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const name = form.querySelector('#name').value.trim();
                const email = form.querySelector('#email').value.trim();
                const subject = form.querySelector('#subject').value.trim();
                const message = form.querySelector('#message').value.trim();

                if (!name || !email || !subject || !message) {
                    alert('Si us plau, omple tots els camps del formulari.');
                    return;
                }

                if (!isValidEmail(email)) {
                    alert('Si us plau, introdueix una adreça de correu electrònic vàlida.');
                    return;
                }

                // If using Formspree or similar service, submit the form
                // For now, show success message
                showFormSuccess();
            });
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormSuccess() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviat ✓';
            submitBtn.style.background = '#28a745';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--primary-red)';
                submitBtn.disabled = false;
            }, 3000);
        }

        alert('Gràcies pel teu missatge! Ens posarem en contacte aviat.');
    }

    // ================================
    // Navbar Scroll Effects
    // ================================
    
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            });
        }
    }

    // ================================
    // Gallery Image Loading
    // ================================
    
    function initGalleryImages() {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        
        galleryItems.forEach(img => {
            // Add loading state
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });

            // Handle loading errors
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbGUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjVmNWY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYXRnZSBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
                this.alt = 'Imatge no disponible';
            });

            // Set initial opacity for smooth loading
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        });
    }

    // ================================
    // Mobile Menu (Future Implementation)
    // ================================
    
    function initMobileMenu() {
        // Mobile menu toggle functionality can be added here
        // For now, the mobile menu is hidden in CSS
        
        const mobileBreakpoint = 768;
        
        function handleResize() {
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth <= mobileBreakpoint) {
                // Mobile view logic
                if (navLinks) {
                    navLinks.style.display = 'none';
                }
            } else {
                // Desktop view logic
                if (navLinks) {
                    navLinks.style.display = 'flex';
                }
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }

    // ================================
    // Performance Optimizations
    // ================================
    
    function initPerformanceOptimizations() {
        // Lazy loading for images (if needed)
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ================================
    // Analytics and Tracking
    // ================================
    
    function initAnalytics() {
        // Add Google Analytics or other tracking code here
        // Example:
        /*
        gtag('config', 'GA_TRACKING_ID', {
            page_title: 'Ball de Diables del Prat',
            page_location: window.location.href
        });
        */
    }

    // ================================
    // Error Handling
    // ================================
    
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            // You can send errors to a logging service here
        });

        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    // ================================
    // Initialize All Functions
    // ================================
    
    try {
        initSmoothScrolling();
        initCountdownTimer();
        initInteractiveTimeline();
        initContactForm();
        initNavbarEffects();
        initGalleryImages();
        initMobileMenu();
        initPerformanceOptimizations();
        initAnalytics();
        initErrorHandling();
        
        console.log('Ball de Diables del Prat - Website initialized successfully! 🔥');
    } catch (error) {
        console.error('Error initializing website:', error);
    }

});

// ================================
// Utility Functions
// ================================

/**
 * Debounce function to limit the rate of function execution
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}