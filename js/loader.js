// Novi, samostalni fajl za loader
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});
