// Mouse trail effect
const trails = 20;
const trailElements = [];



for (let i = 0; i < trails; i++) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);
    trailElements.push({
        element: trail,
        x: 0,
        y: 0,
        delay: i * 2
    });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateTrails() {
    trailElements.forEach((trail, index) => {
        const currentX = trail.x;
        const currentY = trail.y;
        
        trail.x += (mouseX - trail.x) / (10 + trail.delay);
        trail.y += (mouseY - trail.y) / (10 + trail.delay);
        
        trail.element.style.left = `${trail.x}px`;
        trail.element.style.top = `${trail.y}px`;
        trail.element.style.scale = 1 - (index * 0.03);
        trail.element.style.opacity = 1 - (index * 0.05);
    });
    
    requestAnimationFrame(updateTrails);
}

updateTrails();

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
        const speed = section.dataset.speed || 0.5;
        section.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Language switcher interaction
const cyberOrb = document.querySelector('.cyber-orb');
let isAnimating = false;

cyberOrb.addEventListener('mouseenter', () => {
    if (!isAnimating) {
        isAnimating = true;
        cyberOrb.style.animation = 'none';
        cyberOrb.style.transform = 'rotateY(180deg)';
        
        setTimeout(() => {
            cyberOrb.style.animation = 'floatAnimation 3s ease-in-out infinite';
            isAnimating = false;
        }, 500);
    }
});

// Dynamic neon glow based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = (window.pageYOffset / 
        (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    const hue = Math.floor(scrollPercent * 3.6); // 360 degrees / 100
    document.documentElement.style.setProperty(
        '--neon-primary', 
        `hsl(${hue}, 100%, 50%)`
    );
});
// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});
