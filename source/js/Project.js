import Emitter from './Emitter';
import Sound from './Sound';
import Cursor from './Cursor';

window.CURSOR = new Cursor();

class Slide {
  constructor(elem, project, index) {
    this.elem = elem;
    this.isCover = index === 0;
    this.caption = elem.dataset.caption;
    this.index = index;
    this.project = project;
    this.isLast = index === project.slides.length - 1;
    this.content = elem.querySelector('.slide-content');

    this.init();
  }

  init() {
    this.elem.addEventListener('click', e => {
      const direction = this._getDirection(e);

      Emitter.emit('toggleSlide', {
        project: this.project,
        direction,
        slide: this,
        event: e,
      });
    });

    if (!document.body.dataset.mobile) {
      this.elem.addEventListener('mousemove', e => {
        this.direction = this._getDirection(e);
        CURSOR.show(e, this.direction, this.index + 1, this.project.slides.length);
      });

      this.content.addEventListener('mouseenter', e => {
        CURSOR.setLight();
      });

      this.content.addEventListener('mouseleave', e=> {
        CURSOR.setDark();
      });
    }
  }

  _getDirection(e, isCover) {
    const isRightSide = e.clientX > window.innerWidth / 2;    
    return this.direction = isRightSide || this.isCover ? 'right' : 'left';
  }

  _loadImage() {
    const img = this.elem.querySelector('img');

    if (img && !img.dataset.loaded) {
      img.src = img.dataset.src;
      img.dataset.loaded = true;
    }
  }
}

class Project {
  constructor(elem) {
    this.elem = elem;
    this.type = elem.dataset.type;
    this.slides = [...elem.querySelectorAll('.slide')];
    this.caption = elem.querySelector('.js-caption');
    this.location = elem.querySelector('.js-slideLocation');
    this.direction = '';
    this.isInfo = false;
    this.info = elem.querySelector('.project-info');
    this.infoHeight = this.info ? elem.querySelector('.project-info__panel').offsetHeight : 0;
    this.theme = elem.dataset.cover;

    this.initInfo();
    this.initSlides();

    if (this.type === 'sound') {
      this.audio = new Sound(this);
    }
  }

  initInfo() {
    this.infoToggles = [...this.elem.querySelectorAll('.js-btnInfoToggle')];
    
    if (this.infoToggles.length) {
      this.infoToggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
          this.toggleInfo(!this.isInfo);
          CURSOR.hide();
        });
      });

      this.info.addEventListener('mouseenter', () => {
        CURSOR.hide();
      });
    }
  }

  initSlides() {
    this.slides = this.slides.map((slide, index) => {
      return new Slide(slide, this, index);
    });
  }

  toggleInfo(bool) {
    this.isInfo = bool;

    if (this.type === 'intro') { return }

    if (bool) {
      CURSOR.toggleClose(true);
      this.elem.classList.add('is-info');
      Emitter.emit('toggleInfo', true);
    } else {
      CURSOR.toggleClose(false);
      this.elem.classList.remove('is-info');
      Emitter.emit('toggleInfo', false);
    }
  }

  setActive(index) {
    if (index >= 1) {
      return this.elem.classList.add('is-active');
    }

    this.elem.classList.remove('is-active');
  }

  setCursor() {
    CURSOR.reset(this.slides.length);
  }

  setInfo(index) {
    const nextSlide = this.slides[index + 1];

    if (nextSlide && nextSlide.caption) {
      this.location.innerHTML = index + 1;
      // this.caption.innerHTML = nextSlide.caption;
    }
  }

  setCurrentSlide(index) {
    this.elem.dataset.slide = index;
  }
}



export default Project;