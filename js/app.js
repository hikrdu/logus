document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    setupMenuToggle();
    setupLanguageToggle();
    setupButtons();
    setupSmoothScroll();
    setupCarousel();
});

// ======================== LANGUAGE MANAGEMENT ========================

function setupLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Update button states
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            closeMenu();
        });
    });
}

// ======================== MOBILE MENU MANAGEMENT ========================

function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

function closeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

// ======================== BUTTON ACTIONS ========================

function setupButtons() {
    const appointmentBtns = document.querySelectorAll('.appointment-btn');
    const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
    const instagramBtn = document.querySelector('.instagram-btn');
    
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            openWhatsAppChat();
        });
    });
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            openWhatsAppChat();
        });
    });
    
    if (instagramBtn) {
        instagramBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://www.instagram.com', '_blank');
        });
    }
}

function openWhatsAppChat() {
    // Generate WhatsApp message
    const currentLang = currentLanguage || 'en';
    let message = '';
    
    if (currentLang === 'pt') {
        message = 'Olá! Gostaria de agendar uma consulta de ultrassom na LOGUS.';
    } else {
        message = 'Hello! I would like to schedule an ultrasound appointment at LOGUS.';
    }
    
    // Placeholder phone number - replace with actual clinic number
    const phoneNumber = '551636007151'; // Format: country code + area code + number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// ======================== CAROUSEL MANAGEMENT ========================

function setupCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const totalSlides = slides.length;
    let autoplayInterval;

    function showSlide(index) {
        // Wrap around
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Update active slide
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Navigation buttons
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoplay();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Pause autoplay on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });

    heroSection.addEventListener('mouseleave', function() {
        startAutoplay();
    });

    // Start autoplay
    startAutoplay();
}

// ======================== SMOOTH SCROLLING ========================

function setupSmoothScroll() {
    // Smooth scroll is already enabled via CSS scroll-behavior
    // This function can be enhanced if needed for additional scroll effects
    
    // Add scroll animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe exam cards and gallery items
    const elementsToObserve = document.querySelectorAll('.exam-card, .gallery-item, .values-list li');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ======================== UTILITY FUNCTIONS ========================

// Prevent default behavior and provide feedback
function preventDefaultAndFeedback(action) {
    console.log('Action triggered:', action);
}

// Handle responsive images
function setupResponsiveImages() {
    const images = document.querySelectorAll('.gallery-placeholder');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

// ======================== KEYBOARD SHORTCUTS ========================

document.addEventListener('keydown', function(event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape') {
        closeMenu();
    }
    
    // Add more keyboard shortcuts as needed
});

// ======================== ACCESSIBILITY IMPROVEMENTS ========================

// Enhance focus management for keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Log page metrics
function logPageMetrics() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
}

window.addEventListener('load', function() {
    logPageMetrics();
});
