class NavigationEffects {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.sections = document.querySelectorAll('section');
        this.setupScrollProgress();
        this.setupNavIndicator();
        this.initScrollEvents();
    }

    setupScrollProgress() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    setupNavIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';

        this.sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            
            const label = document.createElement('span');
            label.className = 'section-label';
            label.textContent = section.id;
            dot.appendChild(label);

            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });

            indicator.appendChild(dot);
        });

        document.body.appendChild(indicator);
    }

    initScrollEvents() {
        const dots = document.querySelectorAll('.nav-dot');

        window.addEventListener('scroll', () => {
            // Navigation background
            if (window.scrollY > 50) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }

            // Active section indicator
            this.sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[index].classList.add('active');
                }
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new NavigationEffects();
});
