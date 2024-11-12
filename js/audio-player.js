class AudioPlayer {
    constructor() {
        this.tracks = document.querySelectorAll('.track-item');
        this.currentTrack = null;
        this.audio = new Audio();
        
        this.initTracks();
        this.setupTimeDisplay();
        this.setupProgressBar();
    }

    initTracks() {
        this.tracks.forEach(track => {
            const playBtn = track.querySelector('.play-btn');
            const progressBar = document.createElement('div');
            progressBar.className = 'track-progress';
            
            const timeDisplay = document.createElement('div');
            timeDisplay.className = 'time-display';
            timeDisplay.innerHTML = '<span class="current-time">0:00</span> / <span class="total-time">0:00</span>';
            
            track.appendChild(progressBar);
            track.appendChild(timeDisplay);
            
            playBtn.addEventListener('click', () => this.togglePlay(track));
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

    setupProgressBar() {
        this.audio.addEventListener('timeupdate', () => {
            if (this.currentTrack) {
                const progress = (this.audio.currentTime / this.audio.duration) * 100;
                this.currentTrack.querySelector('.track-progress').style.width = `${progress}%`;
            }
        });
    }

    formatTime(seconds) {
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
