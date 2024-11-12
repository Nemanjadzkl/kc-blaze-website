// Scroll Progress
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
scrollProgress.appendChild(progressBar);
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalScroll) * 100;
    progressBar.style.width = `${progress}%`;
});

// Section Visibility
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add cyber lines
            const cyberLine = document.createElement('div');
            cyberLine.className = 'cyber-line';
            entry.target.prepend(cyberLine);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Dynamic Track Visualizer
document.querySelectorAll('.track').forEach(track => {
    const visualizer = document.createElement('div');
    visualizer.className = 'track-visualizer';
    
    for(let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.setProperty('--i', i);
        visualizer.appendChild(bar);
    }
    
    track.appendChild(visualizer);
});

// Mouse Movement Effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', mouseX);
    document.documentElement.style.setProperty('--mouse-y', mouseY);
    
    // Update grid perspective
    const grid = document.querySelector('.cyber-grid');
    if(grid) {
        grid.style.transform = `
            perspective(500px)
            rotateX(60deg)
            translateY(${mouseY * 20}px)
            translateX(${(mouseX - 0.5) * 20}px)
        `;
    }
});
