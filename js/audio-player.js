class AudioPlayer {
    constructor() {
        this.tracks = document.querySelectorAll('.track-item');
        this.currentTrack = null;
        this.initTracks();
    }

    initTracks() {
        this.tracks.forEach(track => {
            const playBtn = track.querySelector('.play-btn');
            playBtn.addEventListener('click', () => this.togglePlay(track));
        });
    }

    togglePlay(track) {
        if (this.currentTrack === track) {
            if (document.querySelector('.audio-visualizer-canvas.active')) {
                document.dispatchEvent(new Event('stopAudio'));
                track.querySelector('.play-btn i').classList.replace('fa-pause', 'fa-play');
            } else {
                document.dispatchEvent(new CustomEvent('playAudio', { detail: { track: track.dataset.track } }));
                track.querySelector('.play-btn i').classList.replace('fa-play', 'fa-pause');
            }
        } else {
            if (this.currentTrack) {
                this.currentTrack.querySelector('.play-btn i').classList.replace('fa-pause', 'fa-play');
            }
            this.currentTrack = track;
            document.dispatchEvent(new CustomEvent('playAudio', { detail: { track: track.dataset.track } }));
            track.querySelector('.play-btn i').classList.replace('fa-play', 'fa-pause');
        }
    }
}
