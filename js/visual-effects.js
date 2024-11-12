class VisualEffects {
    constructor() {
        this.initParallax();
        this.initGlowEffects();
        this.initScrollAnimations();
    }

    initParallax() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                section.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    initGlowEffects() {
        const glowElements = document.querySelectorAll('.service-card, .track-item, .info-card');
        glowElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const { left, top, width, height } = element.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                
                element.style.setProperty('--x', x);
                element.style.setProperty('--y', y);
            });
        });
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
}
