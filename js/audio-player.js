class AudioPlayer {
    constructor() {
        this.tracks = document.querySelectorAll('.track-item');
        this.currentTrack = null;
        this.initTracks();
    }

    initTracks() {
        this.tracks.forEach(track => {
            const playBtn = track.querySelector('.play-btn');
            playBtn.addEventListener('click', () => {
                const trackData = {
                    url: track.dataset.track,
                    element: track,
                    button: playBtn
                };
                document.dispatchEvent(new CustomEvent('trackSelected', { 
                    detail: trackData
                }));
            });
        });
    }
}
