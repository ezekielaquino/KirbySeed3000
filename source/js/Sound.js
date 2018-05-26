import Cursor from './Cursor';
const cursor = document.querySelector('.js-cursor');


class Sound {
  constructor(project) {
    this.project = project;
    this.audioPlayer = project.elem.querySelector('.js-audio');
    this.play = this.audioPlayer.querySelector('.js-audioPlay');
    this.pause = this.audioPlayer.querySelector('.js-audioPause');
    this.track = this.audioPlayer.querySelector('.js-audioTrack');
    this.audioSrc = this.audioPlayer.dataset.src;
    this.tooltip = this.audioPlayer.querySelector('.tooltip');
    this.indicator = this.audioPlayer.querySelector('.indicator');
    this.AUDIO = new Audio(this.audioSrc);
    this.isPlaying = false;

    this.init();
  }

  init() {
    this._handleEvents();
    this._handleTooltip();
    this._handleUpdate();

    this.indicator.style.backgroundColor = this.audioPlayer.dataset.color;
    this.tooltip.style.backgroundColor = this.audioPlayer.dataset.color;
  }

  reset() {
    this.AUDIO.pause();
    this.AUDIO.currentTime = 0;
    this.audioPlayer.classList.remove('is-paused', 'is-playing');
  }

  _handleEvents() {
    this.audioPlayer.addEventListener('mouseenter', e => {
      this.CURSOR_IN = true;
      Cursor.hide();
      window.CONTROL_AUDIO = true;
    });

    this.audioPlayer.addEventListener('mouseleave', e => {
      this.CURSOR_IN = true;
      Cursor.hide(false);
      window.CONTROL_AUDIO = false;
    });

    this.play.addEventListener('click', () => {
      this.isPlaying = true;
      this.AUDIO.volume = 1;
      this.AUDIO.play();
      this.audioPlayer.classList.remove('is-paused');
      this.audioPlayer.classList.add('is-playing');

      window.AUDIO_PLAYING = this;
    });

    this.pause.addEventListener('click', () => {
      this.isPlaying = false;
      this.AUDIO.pause();
      this.audioPlayer.classList.remove('is-playing');
      this.audioPlayer.classList.add('is-paused');
    });
  }

  fadeOut() {
    if (document.body.dataset.mobile) {
      return this.reset();
    }

    if (this.isPlaying) {
      let volume = 1;

      const fader = setInterval(() => {
        if (this.AUDIO.volume >= 0.1) {
          this.AUDIO.volume = this.AUDIO.volume - 0.1;
        } else {
          clearInterval(fader);
          this.AUDIO.volume = 0;
          this.AUDIO.pause();
          this.AUDIO.currentTime = 0;
          this.isPlaying = false;
          this.audioPlayer.classList.remove('is-playing');
          this.audioPlayer.classList.add('is-paused');
        }
      }, 80);
    }
  }

  _handleTooltip() {
    this.track.addEventListener('click', e => {
      const position = e.offsetX / this.track.offsetWidth;
      this.AUDIO.currentTime = position * this.AUDIO.duration;
      this.indicator.style.transform = `scale(${position}, 1)`;

      window.AUDIO_PLAYING = this;
  
      this.AUDIO.play();
      this.AUDIO.volume = 1;
      this.audioPlayer.classList.remove('is-paused');
      this.audioPlayer.classList.add('is-playing');
    });

    this.track.addEventListener('mousemove', e => {
      const position = e.offsetX / this.track.offsetWidth;
      const current = (position * this.AUDIO.duration) / 60;

      this.tooltip.innerHTML = isNaN(current) ? 'Loading' : current.toFixed(2).replace('.', ':');
      this.tooltip.style.transform = `translateX(${e.offsetX - (this.tooltip.offsetWidth / 2)}px)`;
    });
  }

  _handleUpdate() {
    this.AUDIO.ontimeupdate = () => {
      const position = this.AUDIO.currentTime / this.AUDIO.duration;
      this.indicator.style.backgroundColor = this.audioPlayer.dataset.color;
      this.indicator.style.transform = `scale(${position}, 1)`;
    }

    this.AUDIO.onended = () => {
      this.indicator.style.transform = `scale(0, 1)`;
      this.reset();
    }
  }
}

export default Sound;