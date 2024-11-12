// Particle System
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        this.canvas.className = 'particle-canvas';
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for(let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1
            });
        }
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if(particle.x > this.canvas.width) particle.x = 0;
            if(particle.x < 0) particle.x = this.canvas.width;
            if(particle.y > this.canvas.height) particle.y = 0;
            if(particle.y < 0) particle.y = this.canvas.height;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 45, 85, 0.5)';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 3D Text Effect
class NeonText {
    constructor(element) {
        this.element = element;
        this.text = element.innerText;
        this.init();
    }

    init() {
        this.element.innerHTML = '';
        [...this.text].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'neon-char';
            this.element.appendChild(span);
        });
    }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    document.querySelectorAll('.glitch').forEach(el => new NeonText(el));
});