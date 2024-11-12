// Audio Visualizer in Hero Section
function createAudioVisualizer() {
    const visualizer = document.querySelector('.audio-visualizer');
    const barsCount = 30;
    
    for (let i = 0; i < barsCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.animationDuration = `${Math.random() * 0.7 + 0.3}s`;
        bar.style.animationDelay = `${Math.random() * 0.5}s`;
        visualizer.appendChild(bar);
    }
}

// Parallax Effect for Hero Section
function initParallax() {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelector('.hero-content').style.transform = 
            `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Intersection Observer for Fade-in Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Dynamic Stats Counter
function initStatsCounter() {
    const stats = document.querySelectorAll('.number');
    const observerOptions = {
        threshold: 1
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    const increment = target / 50;
                    if (count < target) {
                        count += increment;
                        entry.target.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                updateCount();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        stat.setAttribute('data-target', stat.textContent);
        stat.textContent = '0';
        statsObserver.observe(stat);
    });
}

// Form Validation and Submit Handler
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitButton = form.querySelector('button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                form.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }
}

// Navigation Background Change on Scroll
function initNavBackground() {
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createAudioVisualizer();
    initParallax();
    initSmoothScroll();
    initScrollAnimations();
    initStatsCounter();
    initContactForm();
    initNavBackground();
});

// Add dynamic cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect for interactive elements
document.querySelectorAll('a, button, .service-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-expanded');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-expanded');
    });
});
