class DJController {
    constructor() {
        this.tracks = document.querySelectorAll('.track-item');
        this.currentTrack = null;
        this.audio = new Audio();
        
        this.initTracks();
    }

    initTracks() {
        this.tracks.forEach(track => {
            const playBtn = track.querySelector('.play-btn');
            
            playBtn.addEventListener('click', () => {
                this.togglePlay(track);
            });
        });
    }

    togglePlay(track) {
        if (this.currentTrack === track) {
            if (this.audio.paused) {
                this.audio.play();
                track.classList.add('playing');
                track.querySelector('.play-btn i').classList.replace('fa-play', 'fa-pause');
            } else {
                this.audio.pause();
                track.classList.remove('playing');
                track.querySelector('.play-btn i').classList.replace('fa-pause', 'fa-play');
            }
        } else {
            if (this.currentTrack) {
                this.currentTrack.classList.remove('playing');
                this.currentTrack.querySelector('.play-btn i').classList.replace('fa-pause', 'fa-play');
            }
            
            this.currentTrack = track;
            this.audio.src = track.dataset.track;
            this.audio.play();
            track.classList.add('playing');
            track.querySelector('.play-btn i').classList.replace('fa-play', 'fa-pause');
        }
    }
}

// Initialize
new DJController();
