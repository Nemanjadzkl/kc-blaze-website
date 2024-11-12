class MusicPortfolio {
    constructor() {
        this.tracks = document.querySelectorAll('.track-card');
        this.currentAudio = null;
        this.currentWave = null;
        
        this.init();
    }

    init() {
        this.tracks.forEach(track => {
            const playButton = track.querySelector('.play-button');
            const audioUrl = track.dataset.audioUrl;
            const visualizer = track.querySelector('.wave-visualizer');
            
            // Create wave bars
            for(let i = 0; i < 20; i++) {
                const bar = document.createElement('div');
                bar.className = 'wave-bar';
                bar.style.animationDelay = `${i * 0.05}s`;
                visualizer.appendChild(bar);
            }
            
            playButton.addEventListener('click', () => {
                this.togglePlay(track, audioUrl, visualizer);
            });
        });
    }

    togglePlay(track, audioUrl, visualizer) {
        if(this.currentAudio && this.currentAudio.src === audioUrl) {
            if(this.currentAudio.paused) {
                this.currentAudio.play();
                this.startWaveAnimation(visualizer);
            } else {
                this.currentAudio.pause();
                this.stopWaveAnimation(visualizer);
            }
        } else {
            if(this.currentAudio) {
                this.currentAudio.pause();
                this.stopWaveAnimation(this.currentWave);
            }
            
            const audio = new Audio(audioUrl);
            audio.addEventListener('ended', () => {
                this.stopWaveAnimation(visualizer);
                track.querySelector('.play-button i').className = 'fas fa-play';
            });
            
            audio.play();
            this.currentAudio = audio;
            this.currentWave = visualizer;
            this.startWaveAnimation(visualizer);
        }
        
        const icon = track.querySelector('.play-button i');
        icon.className = this.currentAudio.paused ? 'fas fa-play' : 'fas fa-pause';
    }

    startWaveAnimation(visualizer) {
        visualizer.querySelectorAll('.wave-bar').forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
    }

    stopWaveAnimation(visualizer) {
        visualizer.querySelectorAll('.wave-bar').forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new MusicPortfolio();
});
