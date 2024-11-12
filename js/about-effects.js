// Portal Effect and Advanced Animations
class PortalEffect {
    constructor() {
        this.aboutSection = document.querySelector('.about-section');
        this.aboutContainer = document.querySelector('.about-container');
        this.stats = document.querySelectorAll('.stat-item');
        
        this.init();
    }

    init() {
        // Parallax effect
        this.aboutSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (window.innerWidth / 2 - clientX) * 0.02;
            const y = (window.innerHeight / 2 - clientY) * 0.02;

            this.aboutContainer.style.transform = 
                `translateZ(50px) rotateX(${y}deg) rotateY(${-x}deg)`;
        });

        // Stats counter animation
        this.initStatsCounter();

        // Scroll reveal
        this.initScrollReveal();
    }

    initStatsCounter() {
        const options = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        observer.observe(this.aboutContainer);
    }

    animateStats() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.querySelector('.stat-number').textContent = 
                        Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.querySelector('.stat-number').textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    initScrollReveal() {
        const options = {
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, options);

        observer.observe(this.aboutContainer);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new PortalEffect();
});
