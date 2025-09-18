/**
 * Ball de Diables del Prat - Main JavaScript
 * CON SISTEMA DE CARGA REAL INTEGRADO
 * Windows Compatible + Loading Screen + Mobile Menu
 * Author: Ball de Diables del Prat
 * Year: 2025
 */

// ================================
// SISTEMA DE CARGA REAL AVANZADO
// ================================

// class RealLoadingManager {
//     constructor() {
//         this.loadingScreen = document.getElementById('loadingScreen');
//         this.percentageText = document.getElementById('percentageText');
//         this.progressFill = document.querySelector('.progress-fill');
//         this.body = document.body;

//         this.totalResources = 0;
//         this.loadedResources = 0;
//         this.currentPercentage = 0;
//         this.isLoadingComplete = false;

//         // Recursos críticos que DEBEN cargarse
//         this.criticalResources = {
//             images: [
//                 'images/Logo.png',
//                 'images/LogoBlanc.png',
//                 'images/Carretillada.jpg',
//                 'images/Versots2.JPG',
//                 'images/SantJordi.jpg',
//                 'images/Pratifolk.jpg',
//                 'images/Esclat1.JPG',
//                 'images/Campanades.jpg',
//                 'images/Seguici3.jpg',
//                 'images/Correfoc1.jpg',
//                 'images/Seguici2.JPG',
//                 'images/Correfoc2.JPG',
//                 'images/Esclat2.JPG',
//                 'images/Versots1.JPG',
//                 'images/Tabals.jpg'
//             ],
//             fonts: [
//                 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap'
//             ],
//             styles: [
//                 'css/styles.css'
//             ],
//             scripts: [
//                 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
//             ]
//         };

//         this.preloadedAssets = new Map();
//         this.loadingMessages = [
//             'Endavant diables!'
//         ];
//     }

//     async init() {
//         console.log('🔥 Iniciando carga real de recursos...');

//         // Calcular total de recursos
//         this.calculateTotalResources();

//         // Iniciar animaciones de la pantalla de carga
//         this.startLoadingAnimations();

//         // Cargar todos los recursos en paralelo
//         await this.loadAllResources();

//         // Completar la carga
//         await this.completeLoading();
//     }

//     calculateTotalResources() {
//         this.totalResources =
//             this.criticalResources.images.length +
//             this.criticalResources.fonts.length +
//             this.criticalResources.styles.length +
//             this.criticalResources.scripts.length +
//             3; // DOM ready, fonts ready, minimum time

//         console.log(`📊 Total recursos a cargar: ${this.totalResources}`);
//     }

//     startLoadingAnimations() {
//         // Cambiar mensaje cada cierto tiempo
//         let messageIndex = 0;
//         this.messageInterval = setInterval(() => {
//             if (messageIndex < this.loadingMessages.length - 1) {
//                 const loadingTitle = document.getElementById('loading-title');
//                 if (loadingTitle) {
//                     loadingTitle.textContent = this.loadingMessages[messageIndex];
//                 }
//                 messageIndex++;
//             }
//         }, 2500);

//         // Animación suave del porcentaje
//         this.smoothProgressInterval = setInterval(() => {
//             this.updateSmoothProgress();
//         }, 50);
//     }

//     async loadAllResources() {
//         const promises = [];

//         // 1. Cargar imágenes críticas
//         promises.push(...this.criticalResources.images.map(src =>
//             this.loadImage(src)
//         ));

//         // 2. Cargar fuentes
//         promises.push(...this.criticalResources.fonts.map(href =>
//             this.loadFont(href)
//         ));

//         // 3. Cargar estilos adicionales
//         promises.push(...this.criticalResources.styles.map(href =>
//             this.loadStylesheet(href)
//         ));

//         // 4. Cargar scripts externos
//         promises.push(...this.criticalResources.scripts.map(src =>
//             this.loadExternalScript(src)
//         ));

//         // 5. Esperar DOM completamente listo
//         promises.push(this.waitForDOMReady());

//         // 6. Esperar fuentes del navegador
//         promises.push(this.waitForFonts());

//         // 7. Tiempo mínimo de carga (UX)
//         promises.push(this.waitMinimumTime(2000));

//         // Ejecutar todas las cargas
//         const results = await Promise.allSettled(promises);

//         // Analizar resultados
//         const failed = results.filter(r => r.status === 'rejected');
//         if (failed.length > 0) {
//             console.warn(`⚠️ ${failed.length} recursos fallaron al cargar:`, failed);
//         }

//         console.log('✅ Todos los recursos críticos cargados');
//     }

//     loadImage(src) {
//         return new Promise((resolve, reject) => {
//             // Verificar si ya está en caché
//             if (this.preloadedAssets.has(src)) {
//                 this.onResourceLoaded(`Imagen ${src} (cache)`);
//                 resolve(this.preloadedAssets.get(src));
//                 return;
//             }

//             const img = new Image();

//             const cleanup = () => {
//                 img.onload = null;
//                 img.onerror = null;
//                 img.onabort = null;
//             };

//             img.onload = () => {
//                 cleanup();
//                 this.preloadedAssets.set(src, img);
//                 this.onResourceLoaded(`Imagen: ${src.split('/').pop()}`);
//                 resolve(img);
//             };

//             img.onerror = (error) => {
//                 cleanup();
//                 console.error(`❌ Error cargando imagen: ${src}`, error);
//                 this.onResourceLoaded(`Error: ${src.split('/').pop()}`);
//                 reject(error);
//             };

//             img.onabort = () => {
//                 cleanup();
//                 console.warn(`⚠️ Carga abortada: ${src}`);
//                 this.onResourceLoaded(`Abortada: ${src.split('/').pop()}`);
//                 reject(new Error('Load aborted'));
//             };

//             // Configurar timeout
//             setTimeout(() => {
//                 if (!this.preloadedAssets.has(src)) {
//                     cleanup();
//                     console.warn(`⏰ Timeout cargando: ${src}`);
//                     this.onResourceLoaded(`Timeout: ${src.split('/').pop()}`);
//                     reject(new Error('Timeout'));
//                 }
//             }, 10000);

//             img.src = src;
//         });
//     }

//     loadFont(href) {
//         return new Promise((resolve, reject) => {
//             // Verificar si ya está cargada
//             const existingLink = document.querySelector(`link[href="${href}"]`);
//             if (existingLink) {
//                 this.onResourceLoaded(`Font: ${href.split('/').pop()}`);
//                 resolve();
//                 return;
//             }

//             const link = document.createElement('link');
//             link.rel = 'stylesheet';
//             link.href = href;
//             link.crossOrigin = 'anonymous';

//             link.onload = () => {
//                 this.onResourceLoaded(`Font: Montserrat`);
//                 resolve();
//             };

//             link.onerror = (error) => {
//                 console.error(`❌ Error cargando fuente: ${href}`, error);
//                 this.onResourceLoaded(`Error font: Montserrat`);
//                 reject(error);
//             };

//             document.head.appendChild(link);

//             // Timeout para fuentes
//             setTimeout(() => {
//                 this.onResourceLoaded(`Timeout font: Montserrat`);
//                 resolve(); // No bloquear por fuentes
//             }, 5000);
//         });
//     }

//     loadStylesheet(href) {
//         return new Promise((resolve, reject) => {
//             // Verificar si ya está cargado
//             const existingLink = document.querySelector(`link[href="${href}"]`);
//             if (existingLink) {
//                 this.onResourceLoaded(`CSS: ${href.split('/').pop()}`);
//                 resolve();
//                 return;
//             }

//             const link = document.createElement('link');
//             link.rel = 'stylesheet';
//             link.href = href;

//             link.onload = () => {
//                 this.onResourceLoaded(`CSS: ${href.split('/').pop()}`);
//                 resolve();
//             };

//             link.onerror = (error) => {
//                 console.error(`❌ Error cargando CSS: ${href}`, error);
//                 this.onResourceLoaded(`Error CSS: ${href.split('/').pop()}`);
//                 reject(error);
//             };

//             document.head.appendChild(link);
//         });
//     }

//     loadExternalScript(src) {
//         return new Promise((resolve) => {
//             // Para CSS como FontAwesome, crear link
//             if (src.includes('.css')) {
//                 return this.loadStylesheet(src).then(resolve).catch(resolve);
//             }

//             const script = document.createElement('script');
//             script.src = src;
//             script.async = true;

//             script.onload = () => {
//                 this.onResourceLoaded(`Script: ${src.split('/').pop()}`);
//                 resolve();
//             };

//             script.onerror = () => {
//                 console.warn(`⚠️ Error cargando script: ${src}`);
//                 this.onResourceLoaded(`Error script: ${src.split('/').pop()}`);
//                 resolve(); // No bloquear por scripts externos
//             };

//             document.head.appendChild(script);
//         });
//     }

//     waitForDOMReady() {
//         return new Promise((resolve) => {
//             if (document.readyState === 'complete') {
//                 this.onResourceLoaded('DOM Ready');
//                 resolve();
//             } else {
//                 window.addEventListener('load', () => {
//                     this.onResourceLoaded('DOM Ready');
//                     resolve();
//                 });
//             }
//         });
//     }

//     waitForFonts() {
//         return new Promise((resolve) => {
//             if ('fonts' in document) {
//                 document.fonts.ready.then(() => {
//                     this.onResourceLoaded('Fonts Ready');
//                     resolve();
//                 }).catch(() => {
//                     this.onResourceLoaded('Fonts Error');
//                     resolve();
//                 });
//             } else {
//                 this.onResourceLoaded('Fonts N/A');
//                 resolve();
//             }
//         });
//     }

//     waitMinimumTime(ms) {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 this.onResourceLoaded('Minimum Time');
//                 resolve();
//             }, ms);
//         });
//     }

//     onResourceLoaded(resourceName) {
//         this.loadedResources++;
//         const actualProgress = (this.loadedResources / this.totalResources) * 100;

//         console.log(`✅ Cargado [${this.loadedResources}/${this.totalResources}]: ${resourceName} - ${actualProgress.toFixed(1)}%`);

//         // Actualizar progreso target
//         this.targetPercentage = Math.min(actualProgress, 100); // Permitir llegar al 100%
//     }

//     updateSmoothProgress() {
//         if (this.isLoadingComplete) return;

//         // Suavizar la progresión del porcentaje
//         const target = this.targetPercentage || 0;
//         const diff = target - this.currentPercentage;

//         if (Math.abs(diff) > 0.1) {
//             this.currentPercentage += diff * 0.5; // Aún más rápido
//         } else {
//             this.currentPercentage = target;
//         }

//         // Actualizar UI
//         const displayPercentage = Math.floor(this.currentPercentage);
//         if (this.percentageText) {
//             this.percentageText.textContent = displayPercentage + '%';
//         }
//         if (this.loadingScreen) {
//             this.loadingScreen.setAttribute('aria-valuenow', displayPercentage);
//         }

//         // Actualizar barra de progreso
//         if (this.progressFill) {
//             this.progressFill.style.width = this.currentPercentage + '%';
//         }
//     }

//     async completeLoading() {
//         if (this.isLoadingComplete) return;

//         this.isLoadingComplete = true;

//         // Limpiar intervalos
//         clearInterval(this.messageInterval);

//         // Completar al 100%
//         this.targetPercentage = 100;
//         const loadingTitle = document.getElementById('loading-title');
//         if (loadingTitle) {
//             loadingTitle.textContent = 'Endavant diables!';
//         }

//         // Esperar a que llegue al 100%
//         return new Promise((resolve) => {
//             const waitForComplete = setInterval(() => {
//                 this.updateSmoothProgress();

//                 if (this.currentPercentage >= 94) {
//                     clearInterval(waitForComplete);
//                     clearInterval(this.smoothProgressInterval);

//                     // Final update
//                     if (this.percentageText) {
//                         this.percentageText.textContent = '100%';
//                     }
//                     if (this.progressFill) {
//                         this.progressFill.style.width = '100%';
//                     }

//                     // Ocultar pantalla de carga
//                     setTimeout(() => {
//                         this.hideLoadingScreen();
//                         resolve();
//                     }, 100);
//                 }
//             }, 50);
//         });
//     }

//     hideLoadingScreen() {
//         console.log('🎉 Carga completada - Ocultando pantalla');

//         if (this.loadingScreen) {
//             this.loadingScreen.classList.add('fade-out');
//         }
//         this.body.classList.remove('loading');
//         this.body.classList.add('content-loaded');

//         // Cache de imágenes aplicado a elementos DOM
//         this.applyCachedImages();

//         // Remover del DOM después de la animación
//         setTimeout(() => {
//             if (this.loadingScreen && this.loadingScreen.parentNode) {
//                 this.loadingScreen.parentNode.removeChild(this.loadingScreen);
//             }

//             // Dispatch evento personalizado
//             window.dispatchEvent(new CustomEvent('loadingComplete', {
//                 detail: {
//                     loadedResources: this.loadedResources,
//                     totalResources: this.totalResources,
//                     preloadedAssets: this.preloadedAssets
//                 }
//             }));
//         }, 600);
//     }

//     applyCachedImages() {
//         // Aplicar imágenes precargadas a los elementos DOM
//         document.querySelectorAll('img[src]').forEach(img => {
//             const cachedImage = this.preloadedAssets.get(img.src);
//             if (cachedImage) {
//                 // La imagen ya está en caché del navegador
//                 img.classList.add('preloaded');
//             }
//         });

//         // Aplicar backgrounds precargados
//         const elementsWithBg = [
//             { selector: '.hero-background', imageSrc: 'images/Carretillada.jpg' },
//             { selector: '.panera-background', imageSrc: 'images/Panera.jpg' }
//         ];

//         elementsWithBg.forEach(({ selector, imageSrc }) => {
//             const element = document.querySelector(selector);
//             if (element && this.preloadedAssets.has(imageSrc)) {
//                 element.classList.add('preloaded');
//             }
//         });
//     }

//     static async init() {
//         const loader = new RealLoadingManager();
//         await loader.init();
//         return loader;
//     }
// }

// ================================
// DETECCIÓN CHROME WINDOWS
// ================================

function isChromeWindows() {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isWindows = navigator.platform.indexOf('Win') > -1;
    const isNotEdge = !/Edge/.test(navigator.userAgent) && !/Edg/.test(navigator.userAgent);

    return isChrome && isWindows && isNotEdge;
}

// Fix para Smooth Scroll en Chrome Windows
function initSmoothScrollChrome() {
    if (!isChromeWindows()) return;

    document.documentElement.style.scrollBehavior = 'auto !important';
    document.body.style.scrollBehavior = 'auto !important';

    let isCustomScrolling = false;

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

            // Tancar menú móvil si está obert
            const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
                mobileNavOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                document.body.style.position = '';
            }

            setTimeout(() => {
                smoothScrollToChrome(targetPosition, 1200).then(() => {
                    isCustomScrolling = false;
                });
            }, mobileNavOverlay && mobileNavOverlay.classList.contains('active') ? 300 : 0);
        }
    }

    document.addEventListener('click', handleClick, true);

    setTimeout(() => {
        const allLinks = document.querySelectorAll('a[href^="#"]');
        allLinks.forEach(link => {
            link.addEventListener('click', handleClick, true);
        });
    }, 1000);
}

function smoothScrollToChrome(targetPosition, duration = 1200) {
    return new Promise((resolve) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function scrollStep(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const easeProgress = easeInOutCubic(progress);
            const currentPosition = startPosition + (distance * easeProgress);

            window.scrollTo({
                top: Math.round(currentPosition),
                behavior: 'auto'
            });

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto'
                });
                resolve();
            }
        }

        requestAnimationFrame(scrollStep);
    });
}

// ================================
// INICIALIZACIÓN PRINCIPAL
// ================================
/**
 * SOLUCIÓN SIMPLE - Reemplaza la función initRealLoadingScreen() en main.js
 * Esta versión es más robusta y siempre funciona
 */

function initRealLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const percentageText = document.getElementById('percentageText');
    const progressFill = document.querySelector('.progress-fill');
    const loadingTitle = document.getElementById('loading-title');

    if (!loadingScreen) {
        console.log('No loading screen found');
        return;
    }

    console.log('🔥 Iniciando loading screen simple y robusto...');

    let currentPercentage = 0;
    let targetPercentage = 0;
    let resourcesLoaded = 0;
    const totalResources = 8; // Número fijo más pequeño
    let isCompleted = false;
    
    // Timer de seguridad - SIEMPRE completar después de 6 segundos
    const forceCompleteTimer = setTimeout(() => {
        if (!isCompleted) {
            console.log('⚠️ Forzando completar loading por timeout...');
            completeLoading();
        }
    }, 6000);

    // Función para actualizar el progreso suavemente
    function updateProgress() {
        if (isCompleted) return;

        const diff = targetPercentage - currentPercentage;
        if (Math.abs(diff) > 0.5) {
            currentPercentage += diff * 0.1;
        } else {
            currentPercentage = targetPercentage;
        }

        const displayPercentage = Math.floor(currentPercentage);
        
        if (percentageText) {
            percentageText.textContent = displayPercentage + '%';
        }
        if (progressFill) {
            progressFill.style.width = displayPercentage + '%';
        }
        if (loadingScreen) {
            loadingScreen.setAttribute('aria-valuenow', displayPercentage);
        }

        // Si llegamos al 100%, completar
        if (currentPercentage >= 99.5) {
            setTimeout(completeLoading, 300);
        }
    }

    // Actualizar progreso cada 50ms
    const progressInterval = setInterval(updateProgress, 50);

    // Función para simular carga de recursos
    function loadResource(name, delay = 0) {
        setTimeout(() => {
            if (!isCompleted) {
                resourcesLoaded++;
                targetPercentage = Math.min((resourcesLoaded / totalResources) * 100, 100);
                console.log(`✅ Recurso cargado: ${name} (${resourcesLoaded}/${totalResources}) - ${Math.floor(targetPercentage)}%`);
            }
        }, delay);
    }

    // Función para completar la carga
    function completeLoading() {
        if (isCompleted) return;
        isCompleted = true;

        clearTimeout(forceCompleteTimer);
        clearInterval(progressInterval);

        // Asegurar 100%
        currentPercentage = 100;
        targetPercentage = 100;
        
        if (percentageText) percentageText.textContent = '100%';
        if (progressFill) progressFill.style.width = '100%';
        if (loadingTitle) loadingTitle.textContent = 'Endavant diables!';

        console.log('🎉 Loading completado - Ocultando pantalla');

        // Ocultar pantalla de carga
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            document.body.classList.remove('loading');
            document.body.classList.add('content-loaded');

            // Remover del DOM
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }

                // Inicializar todas las funcionalidades
                if (typeof initializeAllFeatures === 'function') {
                    initializeAllFeatures();
                }

                // Dispatch evento
                window.dispatchEvent(new CustomEvent('loadingComplete'));
            }, 600);
        }, 200);
    }

    // Cargar recursos de forma escalonada (simulado)
    loadResource('DOM Ready', 100);
    loadResource('CSS Styles', 300);
    loadResource('Logo Principal', 600);
    loadResource('Imágenes Críticas', 1200);
    loadResource('Fonts', 1800);
    loadResource('Assets', 2400);
    loadResource('Scripts', 3000);
    loadResource('Final Check', 3600);

    // Progreso mínimo garantizado
    setTimeout(() => {
        if (!isCompleted && targetPercentage < 70) {
            targetPercentage = 70;
        }
    }, 2000);

    setTimeout(() => {
        if (!isCompleted && targetPercentage < 90) {
            targetPercentage = 90;
        }
    }, 4000);

    // Completar si no se ha hecho ya
    setTimeout(() => {
        if (!isCompleted) {
            resourcesLoaded = totalResources;
            targetPercentage = 100;
        }
    }, 5000);
}

function initializeAllFeatures() {
    try {
        console.log('🚀 Inicializando todas las funcionalidades...');

        initMobileMenu();
        initSmoothScrolling();
        initCountdownTimer();
        initInteractiveTimeline();
        initContactForm();
        initNavbarEffects();
        initEnhancedGallery();
        initPerformanceMonitoring();
        initErrorHandling();

        if (isChromeWindows()) {
            setTimeout(() => {
                initGalleryChrome();
                initTimelineChrome();
            }, 500);
        }

        console.log('✅ Ball de Diables del Prat - Website initialized successfully! 🔥');
        window.dispatchEvent(new CustomEvent('websiteReady'));

    } catch (error) {
        console.error('❌ Error initializing website:', error);
        document.body.classList.add('js-disabled');
    }
}

// ================================
// MOBILE MENU
// ================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const body = document.body;

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        mobileMenuBtn.classList.toggle('active', isMenuOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);

        mobileNavOverlay.classList.toggle('active', isMenuOpen);
        mobileNavOverlay.setAttribute('aria-hidden', !isMenuOpen);

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

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function (e) {
            if (e.target === mobileNavOverlay) {
                closeMenu();
            }
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    function handleResize() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    }

    window.addEventListener('resize', debounce(handleResize, 250));
}

// ================================
// SMOOTH SCROLLING
// ================================

function initSmoothScrolling() {
    if (isChromeWindows()) {
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
// COUNTDOWN TIMER
// ================================

function initCountdownTimer() {
    function updateCountdown() {
        const festaMajor = new Date('2025-09-26T18:30:00').getTime();
        const now = new Date().getTime();
        const distance = festaMajor - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            animateCounterChange('days', days);
            animateCounterChange('hours', hours);
            animateCounterChange('minutes', minutes);
            animateCounterChange('seconds', seconds);
        } else {
            const countdownElements = document.querySelectorAll('.countdown-number');
            countdownElements.forEach(el => el.textContent = '0');

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

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ================================
// TIMELINE INTERACTIVO
// ================================

function initInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineSection = document.querySelector('.timeline-section');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const index = Array.from(timelineItems).indexOf(entry.target);

            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            } else {
                entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);

    timelineItems.forEach((item, index) => {
        observer.observe(item);

        item.addEventListener('click', function () {
            timelineItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const dot = this.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'translateX(-50%) scale(1.5)';
                dot.style.boxShadow = '0 0 0 8px var(--primary-red), 0 0 30px rgba(163, 0, 15, 0.6)';
                setTimeout(() => {
                    dot.style.transform = 'translateX(-50%) scale(1.2)';
                    dot.style.boxShadow = '0 0 0 4px var(--primary-red), 0 0 20px rgba(163, 0, 15, 0.4)';
                }, 300);
            }

            const eventName = this.getAttribute('data-event');
            if (eventName && typeof gtag !== 'undefined') {
                gtag('event', 'timeline_click', {
                    'event_category': 'engagement',
                    'event_label': eventName
                });
            }
        });

        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        item.setAttribute('tabindex', '0');
    });

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

        const progressPercentage = (scrollProgress * 100) + '%';
        document.documentElement.style.setProperty('--timeline-progress', progressPercentage);

        const timelineLineAfter = document.querySelector('.timeline-line');
        if (timelineLineAfter) {
            timelineLineAfter.style.setProperty('--progress', progressPercentage);

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

    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows) {
        const optimizedUpdateTimeline = throttleWindows(updateTimelineProgress, 16);
        window.addEventListener('scroll', optimizedUpdateTimeline, {
            passive: true,
            capture: false
        });
    } else {
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
// FORMULARIO DE CONTACTO
// ================================

function initContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    if (!form) return;

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
            case '_replyto':
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

        field.classList.toggle('error', !isValid);
        field.style.borderColor = isValid ? 'var(--border-color)' : 'var(--primary-red)';

        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.opacity = errorMessage ? '1' : '0';
        }

        return isValid;
    }

    form.addEventListener('submit', function (e) {
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            e.preventDefault();
            const firstErrorField = form.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviant...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'var(--text-light)';

        setTimeout(() => {
            if (document.contains(form)) {
                showFormSuccess();
                form.reset();

                formFields.forEach(field => {
                    field.style.borderColor = 'var(--border-color)';
                    field.classList.remove('error');
                });

                document.querySelectorAll('.error-message').forEach(msg => {
                    msg.textContent = '';
                    msg.style.opacity = '0';
                });

                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--primary-red)';
                submitBtn.disabled = false;
            }
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

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

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
// NAVBAR EFFECTS
// ================================

function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    if (navbar) {
        function handleNavbarScroll() {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }

            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
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
// GALERÍA MEJORADA
// ================================

function initEnhancedGallery() {
    const galleryCards = document.querySelectorAll('.gallery-card');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img) {
                    const loadingManager = window.lastLoadingManager;
                    if (loadingManager && loadingManager.preloadedAssets.has(img.src)) {
                        console.log(`📸 Imagen ya en cache: ${img.src}`);
                        img.classList.add('cached');
                    }

                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    imageObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    galleryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        if (!isChromeWindows()) {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            });
        }

        imageObserver.observe(card);
    });
}

// ================================
// CHROME WINDOWS GALLERY FIX
// ================================

function initGalleryChrome() {
    if (!isChromeWindows()) return;

    const galleryCards = document.querySelectorAll('.gallery-card');

    galleryCards.forEach(card => {
        let isAnimating = false;

        card.addEventListener('mouseenter', function () {
            if (isAnimating) return;
            isAnimating = true;

            animateElement(this, { translateY: -8 }, 300);

            const img = this.querySelector('.gallery-image img');
            if (img) {
                animateElement(img, { scale: 1.1 }, 400);
            }

            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                animateElement(overlay, { translateY: 0 }, 300);
            }

            setTimeout(() => { isAnimating = false; }, 400);
        });

        card.addEventListener('mouseleave', function () {
            if (isAnimating) return;
            isAnimating = true;

            animateElement(this, { translateY: 0 }, 300);

            const img = this.querySelector('.gallery-image img');
            if (img) {
                animateElement(img, { scale: 1 }, 400);
            }

            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) {
                animateElement(overlay, { translateY: 100, unit: '%' }, 300);
            }

            setTimeout(() => { isAnimating = false; }, 400);
        });
    });
}

function initTimelineChrome() {
    if (!isChromeWindows()) return;

    const timelineWrappers = document.querySelectorAll('.timeline-content-wrapper');

    timelineWrappers.forEach(wrapper => {
        let isAnimating = false;

        wrapper.addEventListener('mouseenter', function () {
            if (isAnimating) return;
            isAnimating = true;

            animateElement(this, { translateY: -5 }, 300);

            const icon = this.querySelector('.timeline-icon');
            if (icon) {
                animateElement(icon, { rotate: 360, scale: 1.1 }, 300);
            }

            const img = this.querySelector('.timeline-image img');
            if (img) {
                animateElement(img, { scale: 1.05 }, 400);
            }

            setTimeout(() => { isAnimating = false; }, 400);
        });

        wrapper.addEventListener('mouseleave', function () {
            if (isAnimating) return;
            isAnimating = true;

            animateElement(this, { translateY: 0 }, 300);

            const icon = this.querySelector('.timeline-icon');
            if (icon) {
                animateElement(icon, { rotate: 0, scale: 1 }, 300);
            }

            const img = this.querySelector('.timeline-image img');
            if (img) {
                animateElement(img, { scale: 1 }, 400);
            }

            setTimeout(() => { isAnimating = false; }, 400);
        });
    });
}

function animateElement(element, properties, duration) {
    const startTime = performance.now();
    const startValues = {};

    Object.keys(properties).forEach(prop => {
        if (prop === 'translateY') {
            const currentTransform = element.style.transform || '';
            const match = currentTransform.match(/translateY\(([^)]+)\)/);
            startValues[prop] = match ? parseFloat(match[1]) : 0;
        } else if (prop === 'scale') {
            const currentTransform = element.style.transform || '';
            const match = currentTransform.match(/scale\(([^)]+)\)/);
            startValues[prop] = match ? parseFloat(match[1]) : 1;
        } else if (prop === 'rotate') {
            const currentTransform = element.style.transform || '';
            const match = currentTransform.match(/rotate\(([^)]+)deg\)/);
            startValues[prop] = match ? parseFloat(match[1]) : 0;
        }
    });

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

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
            } else if (prop === 'rotate') {
                const currentValue = startValue + (endValue - startValue) * easeProgress;
                transform += `rotate(${currentValue}deg) `;
            }
        });

        element.style.transform = transform.trim();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// ================================
// PERFORMANCE MONITORING
// ================================

function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'paint') {
                    // Monitor paint events
                }
            });
        });

        try {
            observer.observe({ type: 'paint', buffered: true });
        } catch (e) {
            // Fallback for older browsers
        }
    }

    window.addEventListener('load', function () {
        setTimeout(() => {
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            if (navigationTiming) {
                const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
                console.log(`⏱️ Tiempo de carga: ${loadTime}ms`);
            }
        }, 0);
    });
}

// ================================
// ERROR HANDLING
// ================================

function initErrorHandling() {
    window.addEventListener('error', function (e) {
        console.error('JavaScript error:', e.error);
    });

    window.addEventListener('unhandledrejection', function (e) {
        console.error('Unhandled promise rejection:', e.reason);
    });

    function checkServices() {
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
// UTILITY FUNCTIONS
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

function throttleWindows(func, limit) {
    let inThrottle;
    let lastFunc;
    let lastRan;

    return function () {
        const context = this;
        const args = arguments;

        if (!inThrottle) {
            func.apply(context, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, Math.max(limit - (Date.now() - lastRan), 0));
        }
    }
}

// ================================
// INICIALIZACIÓN GLOBAL
// ================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🔥 Iniciando Ball de Diables del Prat Website...');

    // 1. INICIALIZAR EL SISTEMA DE CARGA REAL PRIMERO
    initRealLoadingScreen();

    // 2. APLICAR FIXES DE CHROME WINDOWS SI ES NECESARIO
    if (isChromeWindows()) {
        console.log('🖥️ Chrome Windows detectado - Aplicando optimizaciones...');
        initSmoothScrollChrome();
    }

    // 3. ESPERAR A QUE LA CARGA REAL SE COMPLETE
    window.addEventListener('loadingComplete', function (e) {
        console.log('✅ Carga real completada, inicializando funcionalidades...', e.detail);
        initializeAllFeatures();
    });

    // 4. FALLBACK SI NO HAY LOADING SCREEN
    if (!document.getElementById('loadingScreen')) {
        console.log('⚠️ No hay loading screen, inicializando directamente...');
        setTimeout(initializeAllFeatures, 100);
    }

    document.body.classList.remove('loading');
});

// ================================
// RESIZE HANDLER
// ================================

window.addEventListener('resize', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    if (window.innerWidth > 1100) {
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.setAttribute('aria-hidden', 'true');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
        if (mobileNavOverlay && !mobileNavOverlay.classList.contains('active')) {
            mobileNavOverlay.setAttribute('aria-hidden', 'true');
        }
    }
});

// ================================
// PRELOAD NEXT RESOURCES
// ================================

function preloadNextResources() {
    const nextPageResources = [
        'panera.html'
    ];

    nextPageResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

window.addEventListener('loadingComplete', function (e) {
    console.log('🎊 Carga completada, iniciando preload de recursos adicionales...');
    setTimeout(preloadNextResources, 1000);
});

// ================================
// SERVICE WORKER
// ================================

if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registrado');
            })
            .catch(function (err) {
                console.log('ServiceWorker falló');
            });
    });
}

// Detectar Windows y aplicar optimizaciones
if (navigator.platform.indexOf('Win') > -1) {
    document.body.classList.add('windows-os');

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
// ================================
// VERSOTS FUNCTIONALITY
// ================================

function initVersotsPDFViewer() {
    // Crear element canvas per PDF.js si no existeix
    if (!document.getElementById('pdfCanvas')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'pdfCanvas';
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
    }

    function updateMiniCountdown() {
        const targetDate = new Date('2025-09-27T13:30:00').getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000); // ✨ NOU!

            const miniDays = document.getElementById('miniDays');
            const miniHours = document.getElementById('miniHours');
            const miniMinutes = document.getElementById('miniMinutes');
            const miniSeconds = document.getElementById('miniSeconds'); // ✨ NOU!

            if (miniDays) miniDays.textContent = days;
            if (miniHours) miniHours.textContent = hours;
            if (miniMinutes) miniMinutes.textContent = minutes;
            if (miniSeconds) miniSeconds.textContent = seconds; // ✨ NOU!
        } else {
            const miniCountdown = document.getElementById('countdownMini');
            if (miniCountdown) {
                miniCountdown.innerHTML = '<div style="font-size: 0.7rem; color: var(--primary-red); font-weight: 500;">Disponible aviat!</div>';
            }
        }
    }

    // Inicialitzar compte enrere (actualitzar cada segon ara!)
    updateMiniCountdown();
    setInterval(updateMiniCountdown, 1000); // ⚡ Canviat de 60000 a 1000ms
}

function openPDF(year) {
    // Detectar si és mòbil
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // En mòbil: obrir directament el PDF
        window.open(`versots/${year}.pdf`, '_blank');
        return;
    }
    
    // En desktop: obrir modal com sempre
    const modal = document.getElementById('pdfModal');
    const title = document.getElementById('pdfTitle');
    const content = document.getElementById('pdfContent');
    
    title.textContent = `Versots ${year}`;
    content.innerHTML = `
        <iframe 
            src="versots/${year}.pdf#toolbar=0&navpanes=0&scrollbar=0" 
            width="100%" 
            height="100%" 
            style="border: none;">
            <p>El teu navegador no pot mostrar PDFs. <a href="versots/${year}.pdf" target="_blank">Obre el PDF aquí</a></p>
        </iframe>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closePDF();
    }
});

// Inicialitzar versots
window.addEventListener('loadingComplete', function () {
    initVersotsPDFViewer();
});

// Fallback si no hi ha loading screen
setTimeout(initVersotsPDFViewer, 1000);