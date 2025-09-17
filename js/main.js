/**
 * Ball de Diables del Prat - Main JavaScript
 * Windows Compatible + Loading Screen + Mobile Menu
 * Author: Ball de Diables del Prat
 * Year: 2025
 */

// ================================
// Loading Screen Management
// ================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const percentageText = document.getElementById('percentageText');
    const body = document.body;

    if (!loadingScreen || !percentageText) return;

    let currentPercentage = 0;
    let progressInterval;
    let isLoadingComplete = false;

    // Función para simular el progreso de carga
    function simulateProgress() {
        progressInterval = setInterval(() => {
            if (currentPercentage < 95 && !isLoadingComplete) {
                // Incrementos variables para hacer más realista
                const increment = Math.random() * 10 + 3;
                currentPercentage = Math.min(currentPercentage + increment, 95);
                updateProgress(Math.floor(currentPercentage));
            }
        }, 200);
    }

    // Actualizar el porcentaje mostrado
    function updateProgress(percentage) {
        percentageText.textContent = percentage + '%';
        loadingScreen.setAttribute('aria-valuenow', percentage);
    }

    // Completar la carga
    function completeLoading() {
        if (isLoadingComplete) return;

        isLoadingComplete = true;
        clearInterval(progressInterval);

        // Completar al 100%
        currentPercentage = 100;
        updateProgress(100);

        // Esperar un momento antes de ocultar
        setTimeout(() => {
            hideLoadingScreen();
        }, 800);
    }

    // Ocultar el loading screen
    function hideLoadingScreen() {
        loadingScreen.classList.add('fade-out');
        body.classList.remove('loading');
        body.classList.add('content-loaded');

        // Remover del DOM después de la animación
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 600);
    }

    // Detectar cuando todos los recursos críticos están cargados
    function checkResourcesLoaded() {
        const promises = [];

        // Verificar imágenes críticas
        const criticalImages = [
            'images/Logo.png',
            'images/LogoBlanc.png',
            'images/Carretillada.jpg'
        ];

        criticalImages.forEach(src => {
            promises.push(new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // Resolver aunque falle para no bloquear
                img.src = src;
            }));
        });

        // Verificar fonts
        if ('fonts' in document) {
            promises.push(document.fonts.ready.catch(() => { }));
        }

        return Promise.all(promises);
    }

    // Iniciar el loading
    simulateProgress();

    // Verificar recursos y completar cuando esté todo listo
    Promise.all([
        checkResourcesLoaded(),
        new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        }),
        // Asegurar un mínimo de tiempo para mostrar el loading
        new Promise(resolve => setTimeout(resolve, 1500))
    ]).then(() => {
        completeLoading();
    }).catch(() => {
        // Si algo falla, completar de todos modos
        completeLoading();
    });

    // Máximo tiempo de loading (failsafe)
    setTimeout(() => {
        if (!isLoadingComplete) {
            console.warn('Loading timeout reached, forcing completion');
            completeLoading();
        }
    }, 5000);
}
/* ================================
   JAVASCRIPT FIXES PARA CHROME EN WINDOWS - COMPLETO
   Añadir al inicio de main.js, antes del DOMContentLoaded
   ================================ */

// Detectar Chrome en Windows específicamente
function isChromeWindows() {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isWindows = navigator.platform.indexOf('Win') > -1;
    const isNotEdge = !/Edge/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);
    
    return isChrome && isWindows && isNotEdge;
}
// Fix para Smooth Scroll en Chrome Windows - Ultra agressiu
function initSmoothScrollChrome() {
    if (!isChromeWindows()) return;
    
    console.log('Applying Chrome Windows smooth scroll fix');
    
    // Desactivar completament scroll behavior
    document.documentElement.style.scrollBehavior = 'auto !important';
    document.body.style.scrollBehavior = 'auto !important';
    
    // Override de la funció scroll nativa per Chrome Windows
    let isCustomScrolling = false;
    
    // Interceptar TOTS els enllaços, inclosos els del menú mòbil
    function handleClick(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link || isCustomScrolling) return;
        
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            isCustomScrolling = true;
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            console.log(`Smooth scrolling to: ${targetId}, position: ${targetPosition}`);
            
            // Tancar menú mòbil si està obert
            const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
                mobileNavOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
            
            // Scroll personalitzat amb delay per tancar menú
            setTimeout(() => {
                smoothScrollToChrome(targetPosition, 1200).then(() => {
                    isCustomScrolling = false;
                });
            }, mobileNavOverlay && mobileNavOverlay.classList.contains('active') ? 300 : 0);
        }
    }
    
    // Aplicar event listener amb alta prioritat
    document.addEventListener('click', handleClick, true); // true = capture phase
    
    // També aplicar als links després de que es carreguin
    setTimeout(() => {
        const allLinks = document.querySelectorAll('a[href^="#"]');
        allLinks.forEach(link => {
            link.addEventListener('click', handleClick, true);
        });
    }, 1000);
}// Smooth scroll millorat amb Promise
function smoothScrollToChrome(targetPosition, duration = 1200) {
    return new Promise((resolve) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();
        
        // Easing més pronunciat
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function scrollStep(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easeProgress = easeInOutCubic(progress);
            const currentPosition = startPosition + (distance * easeProgress);
            
            // Scroll forçat
            window.scrollTo({
                top: Math.round(currentPosition),
                behavior: 'auto'
            });
            
            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            } else {
                // Posició exacta final
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto'
                });
                console.log('Smooth scroll completed');
                resolve();
            }
        }
        
        requestAnimationFrame(scrollStep);
    });
}


// Fix para Gallery hover en Chrome Windows - Animación por JavaScript
function initGalleryChrome() {
    if (!isChromeWindows()) return;
    
    console.log('Applying Chrome Windows gallery fixes');
    
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach(card => {
        let isAnimating = false;
        
        // Hover personalizado con animación por JavaScript
        card.addEventListener('mouseenter', function() {
            if (isAnimating) return;
            isAnimating = true;
            
            animateElement(this, { translateY: -8 }, 300);
            
            // Imagen scale
            const img = this.querySelector('.gallery-image img');
            if (img) {
                animateElement(img, { scale: 1.1 }, 400);
            }
            
            // Overlay
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                animateElement(overlay, { translateY: 0 }, 300);
            }
            
            setTimeout(() => { isAnimating = false; }, 400);
        });
        
        card.addEventListener('mouseleave', function() {
            if (isAnimating) return;
            isAnimating = true;
            
            animateElement(this, { translateY: 0 }, 300);
            
            // Imagen reset
            const img = this.querySelector('.gallery-image img');
            if (img) {
                animateElement(img, { scale: 1 }, 400);
            }
            
            // Overlay reset
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                animateElement(overlay, { translateY: 100, unit: '%' }, 300);
            }
            
            setTimeout(() => { isAnimating = false; }, 400);
        });
    });
}

// Función de animación personalizada para Chrome Windows
function animateElement(element, properties, duration) {
    const startTime = performance.now();
    const startValues = {};
    
    // Obtener valores iniciales
    Object.keys(properties).forEach(prop => {
        if (prop === 'translateY') {
            const currentTransform = element.style.transform || '';
            const match = currentTransform.match(/translateY\(([^)]+)\)/);
            startValues[prop] = match ? parseFloat(match[1]) : 0;
        } else if (prop === 'scale') {
            const currentTransform = element.style.transform || '';
            const match = currentTransform.match(/scale\(([^)]+)\)/);
            startValues[prop] = match ? parseFloat(match[1]) : 1;
        }
    });
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        // Aplicar transformaciones
        let transform = '';
        Object.keys(properties).forEach(prop => {
            const startValue = startValues[prop];
            const endValue = properties[prop];
            const unit = properties.unit || (prop === 'translateY' ? 'px' : '');
            
            if (prop === 'translateY') {
                const currentValue = startValue + (endValue - startValue) * easeProgress;
                transform += `translateY(${currentValue}${unit}) `;
            } else if (prop === 'scale') {
                const currentValue = startValue + (endValue - startValue) * easeProgress;
                transform += `scale(${currentValue}) `;
            }
        });
        
        element.style.transform = transform.trim();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}
// Afegir aquesta funció al bloc dels Chrome Windows fixes, després de animateElement()
// SUBSTITUIR la funció initLoadingChrome() per aquesta versió amb debug:

function initLoadingChrome() {
    if (!isChromeWindows()) return;
    
    console.log('🔧 Chrome Windows: Starting loading screen fixes');
    
    // Buscar elements immediatament
    const loadingLogo = document.querySelector('.loading-logo-image');
    const spinnerRings = document.querySelectorAll('.spinner-ring');
    const progressFill = document.querySelector('.progress-fill');
    
    console.log('🔍 Elements found:', {
        logo: !!loadingLogo,
        spinners: spinnerRings.length,
        progressBar: !!progressFill
    });
    
    // Si no trobem elements, intentar més tard
    if (!loadingLogo || spinnerRings.length === 0 || !progressFill) {
        console.log('⏰ Elements not found, retrying in 500ms...');
        setTimeout(() => initLoadingChrome(), 500);
        return;
    }
    
    // LOGO ANIMATION
    if (loadingLogo) {
        console.log('🎭 Animating logo');
        loadingLogo.style.animation = 'none !important';
        loadingLogo.style.webkitAnimation = 'none !important';
        loadingLogo.style.opacity = '0';
        loadingLogo.style.transform = 'scale(0.8) translateY(-20px)';
        
        setTimeout(() => {
            animateLoadingLogo(loadingLogo);
        }, 300);
    }
    
    // SPINNER ANIMATION
    spinnerRings.forEach((ring, index) => {
        console.log(`🌀 Animating spinner ${index + 1}`);
        ring.style.animation = 'none !important';
        ring.style.webkitAnimation = 'none !important';
        
        // Començar rotació immediata
        let rotation = 0;
        const speed = index === 0 ? 2 : -1.5; // Primera normal, segona inversa i més lenta
        
        function spin() {
            rotation += speed;
            ring.style.transform = `rotate(${rotation}deg)`;
            ring.style.webkitTransform = `rotate(${rotation}deg)`;
            requestAnimationFrame(spin);
        }
        requestAnimationFrame(spin);
    });
    
    // PROGRESS BAR ANIMATION
    if (progressFill) {
        console.log('📊 Animating progress bar');
        progressFill.style.animation = 'none !important';
        progressFill.style.webkitAnimation = 'none !important';
        progressFill.style.width = '0%';
        
        // Començar animació de la barra
        animateProgressBarImproved(progressFill);
    }
}

// Logo animation millorada
function animateLoadingLogo(logo) {
    console.log('🎭 Starting logo animation');
    const startTime = performance.now();
    const duration = 1200;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const opacity = easeProgress;
        const scale = 0.8 + (0.2 * easeProgress);
        const translateY = -20 + (20 * easeProgress);
        
        logo.style.opacity = opacity;
        logo.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        logo.style.webkitTransform = `scale(${scale}) translateY(${translateY}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            console.log('✅ Logo animation completed');
        }
    }
    
    requestAnimationFrame(animate);
}

// Progress bar animation millorada
function animateProgressBarImproved(progressBar) {
    console.log('📊 Starting progress bar animation');
    const startTime = performance.now();
    const duration = 2500;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        const width = easeProgress * 100;
        
        progressBar.style.width = `${width}%`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            console.log('✅ Progress bar animation completed');
        }
    }
    
    requestAnimationFrame(animate);
}

// TAMBÉ cal modificar l'inicialització per cridar-ho més aviat:
// En lloc de posar-ho dins del setTimeout de 1000ms, posa-ho directament al DOMContentLoaded:

// Animació del logo per Chrome Windows
function animateLoadingLogo(logo) {
    const startTime = performance.now();
    const duration = 1200;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const opacity = easeProgress;
        const scale = 0.8 + (0.2 * easeProgress);
        const translateY = -20 + (20 * easeProgress);
        
        logo.style.opacity = opacity;
        logo.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Animació del spinner per Chrome Windows
function animateSpinner(ring, duration) {
    let rotation = 0;
    
    function spin() {
        rotation = (rotation + 3) % 360;
        ring.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(spin);
    }
    
    requestAnimationFrame(spin);
}

// Animació de la progress bar per Chrome Windows
function animateProgressBar(progressBar) {
    const keyFrames = [
        { time: 0, width: 0 },
        { time: 20, width: 15 },
        { time: 40, width: 35 },
        { time: 60, width: 60 },
        { time: 80, width: 85 },
        { time: 100, width: 100 }
    ];
    
    const startTime = performance.now();
    const duration = 2500;
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        // Trobar el keyframe actual
        let currentWidth = 0;
        for (let i = 0; i < keyFrames.length - 1; i++) {
            const current = keyFrames[i];
            const next = keyFrames[i + 1];
            
            if (progress >= current.time && progress <= next.time) {
                const segmentProgress = (progress - current.time) / (next.time - current.time);
                currentWidth = current.width + (next.width - current.width) * segmentProgress;
                break;
            }
        }
        
        progressBar.style.width = `${currentWidth}%`;
        
        if (progress < 100) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Modificar el bloc de Chrome Windows per afegir aquest fix
// Afegir aquesta línia al setTimeout dins del DOMContentLoaded:
// initLoadingChrome();
// Solo aplicar fix si es Chrome Windows
if (isChromeWindows()) {
    console.log('Chrome Windows detected - applying minimal fixes');
    
    document.addEventListener('DOMContentLoaded', function() {
           // Loading screen fixes - ABANS que desaparegui
    initLoadingChrome();
        // Asegurar que el loading screen tenga hardware acceleration
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.webkitBackfaceVisibility = 'hidden';
            loadingScreen.style.backfaceVisibility = 'hidden';
        }
        
        // Aplicar fixes específicos
        initSmoothScrollChrome();
        
        // Timeline items (después de que se inicialice)
        setTimeout(() => {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                item.style.webkitBackfaceVisibility = 'hidden';
                item.style.backfaceVisibility = 'hidden';
            });
            
// Gallery fixes
initGalleryChrome();

// Loading screen fixes
initLoadingChrome();
}, 1000);
    });
}
document.addEventListener('DOMContentLoaded', function () {

    // Inicializar loading screen PRIMERO
    initLoadingScreen();

    // ================================
    // Mobile Menu Management
    // ================================

    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        const body = document.body;

        let isMenuOpen = false;

        function toggleMenu() {
            isMenuOpen = !isMenuOpen;

            // Toggle button animation
            mobileMenuBtn.classList.toggle('active', isMenuOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);

            // Toggle overlay
            mobileNavOverlay.classList.toggle('active', isMenuOpen);
            mobileNavOverlay.setAttribute('aria-hidden', !isMenuOpen);

            // Prevent body scroll when menu is open
            if (isMenuOpen) {
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.width = '100%';
                body.style.top = `-${window.scrollY}px`;
            } else {
                const scrollY = body.style.top;
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
                body.style.top = '';
                if (scrollY) {
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);
                }
            }
        }

        function closeMenu() {
            if (isMenuOpen) {
                toggleMenu();
            }
        }

        // Menu button click handler
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking on overlay
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', function (e) {
                if (e.target === mobileNavOverlay) {
                    closeMenu();
                }
            });
        }

        // Close menu when clicking on navigation links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });

        // Handle window resize
        function handleResize() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }

        window.addEventListener('resize', debounce(handleResize, 250));

        // Focus trap for mobile menu accessibility
        function trapFocus(e) {
            if (!isMenuOpen) return;

            const focusableElements = mobileNavOverlay.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            );
            const firstFocusableElement = focusableElements[0];
            const lastFocusableElement = focusableElements[focusableElements.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }

        document.addEventListener('keydown', trapFocus);
    }

   // ================================
    // Smooth Scrolling Navigation
    // ================================

    function initSmoothScrolling() {
        // NO executar si és Chrome Windows (ja té el seu propi fix)
        if (isChromeWindows()) {
            console.log('Skipping original smooth scroll - Chrome Windows has custom fix');
            return;
        }
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ================================
    // Enhanced Countdown Timer
    // ================================

    function initCountdownTimer() {
        function updateCountdown() {
            // Festa Major 2025 - 26 de setembre a les 18:30h
            const festaMajor = new Date('2025-09-26T18:30:00').getTime();
            const now = new Date().getTime();
            const distance = festaMajor - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Update DOM elements with animation
                animateCounterChange('days', days);
                animateCounterChange('hours', hours);
                animateCounterChange('minutes', minutes);
                animateCounterChange('seconds', seconds);
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

        function animateCounterChange(id, newValue) {
            const element = document.getElementById(id);
            if (element && element.textContent != newValue) {
                element.textContent = newValue;
            }
        }

        // Update countdown every second
        updateCountdown(); // Initial call
        setInterval(updateCountdown, 1000);
    }

    // ================================
    // TIMELINE WINDOWS-COMPATIBLE
    // ================================

    function initInteractiveTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineSection = document.querySelector('.timeline-section');

        // Intersection Observer for timeline items with fade in/out
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = Array.from(timelineItems).indexOf(entry.target);

                if (entry.isIntersecting) {
                    // Element enters viewport - fade in
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                } else {
                    // Element leaves viewport - fade out
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        timelineItems.forEach((item, index) => {
            observer.observe(item);

            // Enhanced click interactions
            item.addEventListener('click', function () {
                timelineItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                // Pulse animation for dot
                const dot = this.querySelector('.timeline-dot');
                if (dot) {
                    dot.style.transform = 'translateX(-50%) scale(1.5)';
                    dot.style.boxShadow = '0 0 0 8px var(--primary-red), 0 0 30px rgba(163, 0, 15, 0.6)';
                    setTimeout(() => {
                        dot.style.transform = 'translateX(-50%) scale(1.2)';
                        dot.style.boxShadow = '0 0 0 4px var(--primary-red), 0 0 20px rgba(163, 0, 15, 0.4)';
                    }, 300);
                }

                // Analytics tracking
                const eventName = this.getAttribute('data-event');
                if (eventName && typeof gtag !== 'undefined') {
                    gtag('event', 'timeline_click', {
                        'event_category': 'engagement',
                        'event_label': eventName
                    });
                }
            });

            // Keyboard accessibility
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Enhanced hover effects
            item.addEventListener('mouseenter', function () {
                if (!this.classList.contains('animate-in')) return;

                const icon = this.querySelector('.timeline-icon');
                if (icon) {
                    icon.style.transform = 'rotate(15deg) scale(1.1)';
                }
            });

            item.addEventListener('mouseleave', function () {
                const icon = this.querySelector('.timeline-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
            });

            item.setAttribute('tabindex', '0');
        });

        // ===== WINDOWS COMPATIBLE TIMELINE PROGRESS =====
        function updateTimelineProgress() {
            if (!timelineSection) return;

            const rect = timelineSection.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;

            let scrollProgress = 0;

            if (sectionTop <= windowHeight && sectionBottom >= 0) {
                const totalScrollDistance = windowHeight + sectionHeight;
                const currentScrolled = windowHeight - sectionTop;
                scrollProgress = Math.max(0, Math.min(1, currentScrolled / totalScrollDistance));
            }

            // WINDOWS FIX: Usar tanto CSS custom property como style directo
            const progressPercentage = (scrollProgress * 100) + '%';
            
            // Método 1: CSS Custom Property
            document.documentElement.style.setProperty('--timeline-progress', progressPercentage);
            
            // Método 2: Direct style para Windows (más compatible)
            const timelineLineAfter = document.querySelector('.timeline-line');
            if (timelineLineAfter) {
                // Forzar el update usando ::after con CSS
                timelineLineAfter.style.setProperty('--progress', progressPercentage);
                
                // También crear un elemento hijo si no existe para mayor compatibilidad
                let progressBar = timelineLineAfter.querySelector('.timeline-progress-bar');
                if (!progressBar) {
                    progressBar = document.createElement('div');
                    progressBar.className = 'timeline-progress-bar';
                    progressBar.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: ${progressPercentage};
                        background: linear-gradient(to bottom, var(--primary-red), var(--light-red));
                        border-radius: 2px;
                        transition: height 0.1s ease-out;
                        z-index: 1;
                    `;
                    timelineLineAfter.appendChild(progressBar);
                } else {
                    progressBar.style.height = progressPercentage;
                }
            }
        }

        // DETECCIÓN WINDOWS Y OPTIMIZACIÓN
        const isWindows = navigator.platform.indexOf('Win') > -1;
        
        if (isWindows) {
            // Windows: usar throttle optimizado
            const optimizedUpdateTimeline = throttleWindows(updateTimelineProgress, 16);
            window.addEventListener('scroll', optimizedUpdateTimeline, { 
                passive: true,
                capture: false 
            });
            
            // Force repaint en Windows
            requestAnimationFrame(() => {
                document.body.style.transform = 'translateZ(0)';
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 100);
            });
        } else {
            // Mac/Linux: método original optimizado
            let ticking = false;
            const requestTick = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateTimelineProgress();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            window.addEventListener('scroll', requestTick, { passive: true });
        }
    }

    // ================================
    // Enhanced Contact Form
    // ================================

    function initContactForm() {
        const form = document.querySelector('.contact-form');
        const submitBtn = document.querySelector('.submit-btn');

        if (!form) return;

        // Real-time validation
        const formFields = form.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function () {
                validateField(this);
            });

            field.addEventListener('input', function () {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            const errorElement = document.getElementById(fieldName + '-error');

            let isValid = true;
            let errorMessage = '';

            switch (fieldName) {
                case 'name':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El nom és obligatori.';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'El nom ha de tenir almenys 2 caràcters.';
                    }
                    break;

                case 'email':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El correu electrònic és obligatori.';
                    } else if (!isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Introdueix una adreça de correu electrònic vàlida.';
                    }
                    break;

                case 'subject':
                    if (!value) {
                        isValid = false;
                        errorMessage = "L'assumpte és obligatori.";
                    } else if (value.length < 5) {
                        isValid = false;
                        errorMessage = "L'assumpte ha de tenir almenys 5 caràcters.";
                    }
                    break;

                case 'message':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'El missatge és obligatori.';
                    } else if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'El missatge ha de tenir almenys 10 caràcters.';
                    }
                    break;
            }

            // Update field appearance
            field.classList.toggle('error', !isValid);
            field.style.borderColor = isValid ? 'var(--border-color)' : 'var(--primary-red)';

            // Update error message
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.opacity = errorMessage ? '1' : '0';
            }

            return isValid;
        }

        // Form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate all fields
            let isFormValid = true;
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                // Focus first error field
                const firstErrorField = form.querySelector('.error');
                if (firstErrorField) {
                    firstErrorField.focus();
                }
                return;
            }

            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviant...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'var(--text-light)';

            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                showFormSuccess();
                form.reset();
                formFields.forEach(field => {
                    field.style.borderColor = 'var(--border-color)';
                    field.classList.remove('error');
                });

                // Clear error messages
                document.querySelectorAll('.error-message').forEach(msg => {
                    msg.textContent = '';
                    msg.style.opacity = '0';
                });

                // Reset button
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'var(--primary-red)';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormSuccess() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'Enviat ✓';
            submitBtn.style.background = '#28a745';
        }

        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        notification.textContent = "Gràcies pel teu missatge! Ens posarem en contacte aviat.";

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // ================================
    // Enhanced Navbar Effects
    // ================================

    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;

        if (navbar) {
            function handleNavbarScroll() {
                const currentScrollY = window.scrollY;

                // Background opacity based on scroll
                if (currentScrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }

                // Hide/show navbar on scroll (mobile only)
                if (window.innerWidth <= 768) {
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scrolling down
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        navbar.style.transform = 'translateY(0)';
                    }
                }

                lastScrollY = currentScrollY;
            }

            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleNavbarScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    }

    // ================================
    // Enhanced Gallery
    // ================================

    function initGallery() {
        const galleryCards = document.querySelectorAll('.gallery-card');

        // Lazy loading with Intersection Observer
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img');
                    if (img && img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(entry.target);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        galleryCards.forEach((card, index) => {
            // Staggered animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);

            // Enhanced hover effects
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Observe for lazy loading
            imageObserver.observe(card);
        });
    }

    // ================================
    // Performance Monitoring
    // ================================

    function initPerformanceMonitoring() {
        // Web Vitals monitoring (if needed)
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'paint') {
                        console.log(`${entry.name}: ${entry.startTime}ms`);
                    }
                });
            });

            try {
                observer.observe({ type: 'paint', buffered: true });
            } catch (e) {
                // Fallback for older browsers
                console.log('Performance Observer not supported');
            }
        }

        // Page load metrics
        window.addEventListener('load', function () {
            setTimeout(() => {
                const navigationTiming = performance.getEntriesByType('navigation')[0];
                if (navigationTiming) {
                    const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
                    console.log(`Page load time: ${loadTime}ms`);
                }
            }, 0);
        });
    }

    // ================================
    // Error Handling & Recovery
    // ================================

    function initErrorHandling() {
        // Global error handler
        window.addEventListener('error', function (e) {
            console.error('JavaScript error:', e.error);
            // Could send to analytics service
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', function (e) {
            console.error('Unhandled promise rejection:', e.reason);
            // Could send to analytics service
        });

        // Service availability checks
        function checkServices() {
            // Check if external services are available
            const services = [
                { name: 'FontAwesome', check: () => document.querySelector('[class*="fa-"]') },
                { name: 'Google Fonts', check: () => getComputedStyle(document.body).fontFamily.includes('Montserrat') }
            ];

            services.forEach(service => {
                if (!service.check()) {
                    console.warn(`${service.name} may not be loaded properly`);
                }
            });
        }

        setTimeout(checkServices, 2000);
    }

    // ================================
    // Initialize All Functions
    // ================================

    try {
        // Solo inicializar las funciones después de que el loading se complete
        const initializeAfterLoading = () => {
            initMobileMenu();
            initSmoothScrolling();
            initCountdownTimer();
            initInteractiveTimeline();
            initContactForm();
            initNavbarEffects();
            initGallery();
            initPerformanceMonitoring();
            initErrorHandling();

            console.log('Ball de Diables del Prat - Website initialized successfully! 🔥');
        };

        // Si el loading ya se completó, inicializar inmediatamente
        if (document.body.classList.contains('content-loaded')) {
            initializeAfterLoading();
        } else {
            // Esperar a que se complete el loading
            const checkLoadingComplete = setInterval(() => {
                if (document.body.classList.contains('content-loaded')) {
                    clearInterval(checkLoadingComplete);
                    setTimeout(initializeAfterLoading, 300);
                }
            }, 100);
        }

        // Remove loading class if present
        document.body.classList.remove('loading');

    } catch (error) {
        console.error('Error initializing website:', error);
        // Graceful degradation
        document.body.classList.add('js-disabled');
    }

});

// ================================
// Utility Functions
// ================================

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// THROTTLE ESPECÍFICO PARA WINDOWS
function throttleWindows(func, limit) {
    let inThrottle;
    let lastFunc;
    let lastRan;
    
    return function() {
        const context = this;
        const args = arguments;
        
        if (!inThrottle) {
            func.apply(context, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, Math.max(limit - (Date.now() - lastRan), 0));
        }
    }
}

function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
}

// ================================
// Service Worker Registration (Optional)
// ================================

if ('serviceWorker' in navigator && 'production' === 'production') {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Solución bug redimensionament navbar
window.addEventListener('resize', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    // Resetear el menú quan canviï la mida de pantalla
    if (window.innerWidth > 1100) {
        // Desktop: assegurar que el menú mòbil està tancat
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.setAttribute('aria-hidden', 'true');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
        // Mobile/Tablet: assegurar visibilitat correcta
        if (mobileNavOverlay && !mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
        }
    }
});

// ================================
// Utilidad para precargar recursos críticos
// ================================

function preloadCriticalResources() {
    const criticalResources = [
        'css/styles.css',
        'images/Logo.png',
        'images/LogoBlanc.png',
        'images/Carretillada.jpg'
    ];

    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;

        if (url.endsWith('.css')) {
            link.as = 'style';
        } else if (url.match(/\.(jpg|png|webp)$/)) {
            link.as = 'image';
        }

        document.head.appendChild(link);
    });
}

// Precargar recursos en cuanto se pueda
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}

// Detectar Windows y aplicar optimizaciones
if (navigator.platform.indexOf('Win') > -1) {
    document.body.classList.add('windows-os');
    
    // CSS específico para Windows
    const style = document.createElement('style');
    style.textContent = `
        .windows-os .timeline-item {
            transition: all 0.6s ease !important;
        }
        .windows-os .loading-logo-image {
            animation-duration: 1.8s !important;
        }
    `;
    document.head.appendChild(style);
}