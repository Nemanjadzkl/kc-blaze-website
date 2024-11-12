class UnifiedPlayer {
    constructor() {
        this.tracks = document.querySelectorAll('.track-item');
        this.currentTrack = null;
        this.audio = new Audio();
        
        this.initTracks();
        this.setupProgressBar();
        this.setupTimeDisplay();
        this.setupSeek();
    }

    initTracks() {
        this.tracks.forEach(track => {
            // Create progress container
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-container';
            
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            
            // Create time display
            const timeDisplay = document.createElement('div');
            timeDisplay.className = 'time-display';
            timeDisplay.innerHTML = '<span class="current-time">0:00</span> / <span class="total-time">0:00</span>';
            
            progressContainer.appendChild(progressBar);
            track.appendChild(progressContainer);
            track.appendChild(timeDisplay);
            
            const playBtn = track.querySelector('.play-btn');
            playBtn.addEventListener('click', () => this.togglePlay(track));
        });
    }

    setupProgressBar() {
        this.audio.addEventListener('timeupdate', () => {
            if (this.currentTrack) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                this.currentTrack.querySelector('.progress-bar').style.width = `${progress}%`;
            }
        });
    }

    setupTimeDisplay() {
        this.audio.addEventListener('timeupdate', () => {
            if (this.currentTrack) {
                const currentTime = this.formatTime(this.audio.currentTime);
                const totalTime = this.formatTime(this.audio.duration);
                
                this.currentTrack.querySelector('.current-time').textContent = currentTime;
                this.currentTrack.querySelector('.total-time').textContent = totalTime;
            }
        });
    }

    setupSeek() {
        this.tracks.forEach(track => {
            const progressContainer = track.querySelector('.progress-container');
            
            progressContainer.addEventListener('click', (e) => {
                if (this.currentTrack === track) {
                    const rect = progressContainer.getBoundingClientRect();
                    const clickPosition = (e.clientX - rect.left) / rect.width;
                    this.audio.currentTime = this.audio.duration * clickPosition;
                }
            });
        });
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    togglePlay(track) {
        if (this.currentTrack === track) {
            if (this.audio.paused) {
                this.audio.play();
                track.querySelector('.play-btn i').classList.replace('fa-play', 'fa-pause');
            } else {
                this.audio.pause();
                track.querySelector('.play-btn i').classList.replace('fa-pause', 'fa-play');
            }
        } else {
            if (this.currentTrack) {
                this.currentTrack.querySelector('.play-btn i').classList.replace('fa-pause', 'fa-play');
            }
            
            this.currentTrack = track;
            this.audio.src = track.dataset.track;
            this.audio.play();
            track.querySelector('.play-btn i').classList.replace('fa-play', 'fa-pause');
        }
    }
}
