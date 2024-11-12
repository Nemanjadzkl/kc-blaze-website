class ServicesSection {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.initializeHoverEffects();
        this.initializePricing();
    }

    initializeHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        });
    }

    initializePricing() {
        const toggle = document.querySelector('.toggle-switch');
        const prices = document.querySelectorAll('.price');
        
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('monthly');
            prices.forEach(price => {
                const monthly = price.dataset.monthly;
                const yearly = price.dataset.yearly;
                price.textContent = toggle.classList.contains('monthly') ? 
                    monthly : yearly;
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ServicesSection();
});
