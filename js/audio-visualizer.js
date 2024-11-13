class AudioVisualizer {
    constructor() {  document.addEventListener('click', () => {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }, { once: true });

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.gainNode = this.audioContext.createGain();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        
        this.setupCanvas();
        this.initAudio();
        this.setupControls();
    }

    setupCanvas() {
        this.canvas.classList.add('audio-visualizer-canvas');
        document.body.appendChild(this.canvas);
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupControls() {
        const controls = document.createElement('div');
        controls.className = 'audio-controls';
        controls.innerHTML = `
            <div class="time-control">
                <span class="current-time">0:00</span>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <span class="total-time">0:00</span>
            </div>
            <div class="playback-controls">
                <button class="control-btn volume-btn">
                    <i class="fas fa-volume-up"></i>
                </button>
                <div class="volume-slider">
                    <input type="range" min="0" max="1" step="0.1" value="0.7">
                </div>
            </div>
        `;

        document.querySelector('.track-controls').appendChild(controls);
        this.initControlEvents();
    }

    initControlEvents() {
        const volumeSlider = document.querySelector('.volume-slider input');
        const progressBar = document.querySelector('.progress-bar');
        const volumeBtn = document.querySelector('.volume-btn');

        volumeSlider.addEventListener('input', (e) => {
            this.gainNode.gain.value = e.target.value;
            this.updateVolumeIcon(e.target.value);
        });

        volumeBtn.addEventListener('click', () => {
            if (this.gainNode.gain.value > 0) {
                this.gainNode.gain.value = 0;
                volumeSlider.value = 0;
            } else {
                this.gainNode.gain.value = 0.7;
                volumeSlider.value = 0.7;
            }
            this.updateVolumeIcon(this.gainNode.gain.value);
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.audioElement.currentTime = this.audioElement.duration * percent;
        });
    }

    updateVolumeIcon(value) {
        const icon = document.querySelector('.volume-btn i');
        icon.className = value > 0.5 ? 'fas fa-volume-up' : 
                        value > 0 ? 'fas fa-volume-down' : 
                        'fas fa-volume-mute';
    }

    initAudio() {
        const playButtons = document.querySelectorAll('.play-btn');
        playButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.audioElement) {
                    const trackItem = btn.closest('.track-item');
                    const audioUrl = trackItem.dataset.track;
                    this.setupAudioElement(audioUrl);
                }
                this.togglePlay();
            });
        });
    }

    setupAudioElement(url) {
        this.audioElement = new Audio(url);
        const source = this.audioContext.createMediaElementSource(this.audioElement);
        source.connect(this.analyser);
        this.analyser.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('loadedmetadata', () => {
            document.querySelector('.total-time').textContent = this.formatTime(this.audioElement.duration);
        });
        
        this.animate();
    }

    updateProgress() {
        const currentTime = document.querySelector('.current-time');
        const progress = document.querySelector('.progress');
        
        currentTime.textContent = this.formatTime(this.audioElement.currentTime);
        const percent = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        progress.style.width = `${percent}%`;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play();
            this.canvas.classList.add('active');
        } else {
            this.audioElement.pause();
            this.canvas.classList.remove('active');
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.analyser.getByteFrequencyData(this.dataArray);
        
        const barWidth = this.canvas.width / this.analyser.frequencyBinCount;
        const centerY = this.canvas.height / 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, centerY);
        
        for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
            const x = i * barWidth;
            const percent = this.dataArray[i] / 255;
            const height = this.canvas.height * percent;
            const offset = height / 2;
            
            this.ctx.lineTo(x, centerY + offset);
        }
        
        for (let i = this.analyser.frequencyBinCount - 1; i >= 0; i--) {
            const x = i * barWidth;
            const percent = this.dataArray[i] / 255;
            const height = this.canvas.height * percent;
            const offset = height / 2;
            
            this.ctx.lineTo(x, centerY - offset);
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = 'rgba(255, 45, 85, 0.1)';
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(255, 45, 85, 0.5)';
        this.ctx.stroke();
        
        requestAnimationFrame(() => this.animate());
    }
}
