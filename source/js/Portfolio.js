// import 'picturefill';
import 'lazysizes';
import MouseWheel from 'mouse-wheel';
import createHistory from 'history/createBrowserHistory';
import imagesLoaded from 'imagesloaded';
import Hammer from 'hammerjs';
import Cursor from './Cursor';
import Sound from './Sound';

const history = createHistory();
const TYPE = history.location.pathname.split('/')[1];
const IS_MOBILE =  document.body.dataset.mobile;
const scrollthumb = document.querySelector('.scrollbar-thumb');
let scrollThumbHeight;

class Section {
  constructor(args) {
    Object.assign(this, args);

    this.isCurrent = false;
    this.currentSlide = 0;
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.location = this.elem.querySelector('.js-slideLocation');
    this.btn = [...this.elem.querySelectorAll('.js-btnInfoToggle')];
    this.infos = this.elem.querySelector('.project-info');
    this.SLIDES = [...this.elem.querySelectorAll(this.slideSelector)];
    this.title = this.elem.querySelector('.js-caption');
    this.origTitle = this.title && this.title.innerHTML;

    this.elem.style.height = window.innerHeight + 'px';
    this.wrapper = document.createElement('div');

    this.SLIDES.forEach(slide => {
      slide.style.height = window.innerHeight + 'px';
      this.wrapper.appendChild(slide);
    });

    this.wrapper.classList.add('slide-wrap');
    this.wrapper.style.width = this.SLIDES.length * window.innerWidth + 'px';

    window.addEventListener('resize', () => {
      scrollThumbHeight = (window.innerHeight - 4) / this.SLIDES.length + 30
      scrollthumb.style.height = scrollThumbHeight +  'px';

      this.SLIDES.forEach(slide => {
        slide.style.height = window.innerHeight + 'px';
      });

      this.elem.style.height = window.innerHeight + 'px';
      this.wrapper.style.width = this.SLIDES.length * window.innerWidth + 'px';

      this._setHorizontalOffset(this.currentSlide * -window.innerWidth);
    });

    this.elem.appendChild(this.wrapper);

    this._setTouched();

    this.wrapper.addEventListener('click', e => {
      const direction = e.clientX > window.innerWidth / 2 ? 'right' : 'left';

      if (this.elem.dataset.type === 'intro') {
        return this.folio.goToNextSection();
      }

      if (this.currentSlide === 0) {
        Cursor.setDirection('right');
        return this.toggleNext();
      }

      if (e.clientX > window.innerWidth / 2) this.toggleNext();
      else this.togglePrev();
    });

    if (!IS_MOBILE) {
      this.elem.addEventListener('mousemove', e => {
        const direction = e.clientX > window.innerWidth / 2 ? 'right' : 'left';
        Cursor.setDirection(this.currentSlide === 0 ? 'right' : direction);
        Cursor.show(e);
      });

      if (this.infos) {
        this.infos.addEventListener('mouseenter', () => {
          window.PAUSE_NAV = true;
          Cursor.hide();
        });

        this.infos.addEventListener('mouseleave', () => {
          window.PAUSE_NAV = false;
          Cursor.hide(false);
        });
      }
    } else {
      Cursor.hide();
    }

    for (let i = 0; i < this.btn.length; i++) {
      const btn = this.btn[i];
      btn.addEventListener('click', () => {
        this.isInfo = !this.isInfo;

        if (this.isInfo) {
          this.infos.querySelector('.scroll-wrap').scrollTop = 0;
        }

        this.elem.classList.toggle('is-info');
        scrollthumb.classList.toggle('is-hidden');
      });
    }

    if (this.elem.dataset.type === 'sound') {
      this.audio = new Sound(this);
    }
  }

  setCurrent() {
    if (history.location.pathname !== `/${TYPE}/${this.elem.dataset.project}` && this.elem.dataset.type !== 'intro') {
      history.push(`/${TYPE}/${this.elem.dataset.project}`, { current: this.elem.dataset.project });
    }
  }

  toggleNext() {
    if (this.isAnimating || window.CONTROL_AUDIO || window.PAUSE_NAV) return false;

    if (this.isInfo) {
      this.isInfo = false;
      scrollthumb.classList.toggle('is-hidden');
      return this.elem.classList.remove('is-info');
    }

    this._toggleVideo(false);

    if (this.currentSlide < this.SLIDES.length - 1) {
      this.currentSlide += 1;
      this.CURRENTSLIDE = this.SLIDES[this.currentSlide];
      // this.loadMedia(this.currentSlide);
      // this.loadMedia(this.currentSlide + 1);
    } else {
      this.currentSlide = 0;
      this.CURRENTSLIDE = this.SLIDES[this.currentSlide];
    }

    this._setHorizontalOffset(this.currentSlide * -window.innerWidth);
  }

  togglePrev() {
    if (this.isAnimating || window.CONTROL_AUDIO || window.PAUSE_NAV) return false;

    if (this.isInfo) {
      this.isInfo = false;
      scrollthumb.classList.toggle('is-hidden');
      return this.elem.classList.remove('is-info');
    }

    if (this.currentSlide > 0) {
      this.currentSlide -= 1;
      this.CURRENTSLIDE = this.SLIDES[this.currentSlide];
    }

    this._setHorizontalOffset(this.currentSlide * -window.innerWidth);
  }

  _toggleVideo(bool) {
    const video = this.SLIDES[this.currentSlide].querySelector('video');

    console.log(video)

    if (video) {
      if (bool || video.paused) return video.play();
      video.pause();
    }
  }

  _setCurrent() {
    const current = this.elem.querySelector('.is-currentSlide');

    if (current) current.classList.remove('is-currentSlide');

    this.SLIDES[this.currentSlide].classList.add('is-currentSlide');
    if (this.location) this.location.innerHTML = this.currentSlide;
  }

  _setTouched() {
    this._setCurrent();

    clearTimeout(this.titleTimeout);

    if (this.currentSlide > 0) {
      this.elem.classList.add('is-touched');
      document.body.classList.add('is-touched');
      this.titleTimeout = setTimeout(() => {
        this.title.innerHTML = 'Details';
      }, 1800);
    } else {
      this.elem.classList.remove('is-touched');
      document.body.classList.remove('is-touched');

      if (this.title) this.title.innerHTML = this.origTitle;
    }
  }

  _setHorizontalOffset(x, args = {}) {
    const timeout = args.immediate ? 0 : 250;

    this.wrapper.style.transform = `translate3d(${x}px, 0, 0`;

    this._setTouched();
    this.isAnimating = true;

    setTimeout(() => {
      this._setTouched();
      this.isAnimating = false;
      this._toggleVideo(true);
    }, timeout);
  }

  reset() {
    if (this.isAnimating) return false;

    this._setHorizontalOffset(0, { immediate: true });

    this.isAnimating = false;
    this.currentSlide = 0;
    this.elem.classList.remove('is-touched');
    document.body.classList.remove('is-touched');
  }
}

class Portfolio {
  constructor(args) {
    Object.assign(this, args);

    this.currentSection = 0;
    this.isTriggered = 0;
    this.init();
  }

  init() {
    const sections = [...this.elem.querySelectorAll(this.sectionSelector)];

    scrollThumbHeight = (window.innerHeight - 4) / sections.length + 30
    scrollthumb.style.height = scrollThumbHeight +  'px';

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('section-wrap');

    this.SECTIONS = sections.map(section => {
      this.wrapper.appendChild(section);

      return new Section({
        elem: section,
        slideSelector: this.slideSelector,
        folio: this,
      });
    });

    this.elem.appendChild(this.wrapper);

    this.firstSection = this.SECTIONS[0];
    this.lastSection = this.SECTIONS[sections.length - 1];

    MouseWheel(this.elem, (dx, dy, dz, ev) => {
      this._onMouseWheel(dx, dy, dz, ev);
    });

    this._onArrowKeys();

    if (IS_MOBILE) {
      const hammer = new Hammer(this.elem, {touchAction: "auto"});

      hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
      hammer.on('swipeup', () => {
        if (this.CURRENTSECTION && this.CURRENTSECTION.isInfo) return false;
        this.goToNextSection();
      });
      hammer.on('swipedown', () => {
        if (this.CURRENTSECTION && this.CURRENTSECTION.isInfo) return false;
        this.goToPrevSection();
      });
      hammer.on('swipeleft', () => {
        if (this.CURRENTSECTION && this.CURRENTSECTION.isInfo) return false;
        this.CURRENTSECTION.toggleNext();
      });
      hammer.on('swiperight', () => {
        if (this.CURRENTSECTION && this.CURRENTSECTION.isInfo) return false;
        this.CURRENTSECTION.togglePrev();
      });
    }

    // this.SECTIONS[this.SECTIONS.length - 1].loadMedia();
    // this.SECTIONS[0].loadMedia();
    this.SECTIONS[0].elem.classList.add('is-current');
    document.body.dataset.theme = this.SECTIONS[0].elem.dataset.cover;

    if (history.location.state) {
      sections.filter((section, index) => {
        if (section.dataset.project === history.location.state.current) {
          this.currentSection = index;
          // this.SECTIONS[index].loadMedia();
          _setScrollPosition(this.currentSection, this.SECTIONS.length);
          return this._toggleSection(false);
        }
      });
    }

    history.listen((location, action) => {
      sections.filter((section, index) => {
        if (section.dataset.project === location.state.current) {
          this.currentSection = index;
          return this._toggleSection();
        }
      });
    });

    window.addEventListener('resize', () => {
      this._setVerticalOffset();
      this._toggleSection();
    });
  }

  goToNextSection() {
    if (this.currentSection < this.SECTIONS.length) this.currentSection += 1;

    const animate = this.currentSection > -1;

    this._toggleSection(animate);

    _setScrollPosition(this.currentSection, this.SECTIONS.length);
  }

  goToPrevSection() {
    if (this.currentSection > -1) this.currentSection -= 1;

    const animate = this.currentSection !== this.SECTIONS.length;

    this._toggleSection(animate);

    _setScrollPosition(this.currentSection, this.SECTIONS.length);
  }

  _setVerticalOffset(animate) {
    const y = this.currentSection * -window.innerHeight;

    this.elem.children[0].style.transform = `translate3d(0, ${y}px, 0)`;
    this.elem.children[0].style.transition = animate ? 'transform 0.25s' : 'none';

    this.isAnimating = true;
    this._setInfiniteOffset();

    setTimeout(() => {
      this.isAnimating = false;
      this.isTriggered = 0;

      if (this.SECTIONS[this.currentSection]) {
        this.SECTIONS.forEach(section => {
          section.reset();
        });

        this.CURRENTSECTION = this.SECTIONS[this.currentSection];
        this.CURRENTSECTION._toggleVideo(true);
        this.SECTIONS[this.currentSection].setCurrent();

        [...document.querySelectorAll('.is-current')].forEach(c => {
          c.classList.remove('is-current');
        });

        this.SECTIONS[this.currentSection].elem.classList.add('is-current');
      }

      if (this.currentSection === -1) {
        this.currentSection = this.SECTIONS.length - 1;
        this._resetFlow();
        return this._toggleSection(false);
      }

      if (this.currentSection === this.SECTIONS.length) {
        this.currentSection = 0;
        this._resetFlow();
        return this._toggleSection(false);
      }
    }, 150);
  }

  _setInfiniteOffset() {
    if (this.currentSection > -1 && this.currentSection < this.SECTIONS.length) {
      return this._resetFlow();
    }

    if (this.currentSection === -1 && this.currentSection - 1 < -1) {
      const y = this.SECTIONS.length * -window.innerHeight;
      this.lastSection.elem.style.transform = `translate3d(0, ${y}px, 0)`;
    }

    if (this.currentSection === this.SECTIONS.length && this.currentSection + 1 > this.SECTIONS.length) {
      const y = this.SECTIONS.length * window.innerHeight;
      this.firstSection.elem.style.transform = `translate3d(0, ${y}px, 0)`;
    }

    if (this.currentSection === 0) {
      const y = this.SECTIONS.length * -window.innerHeight;
      this.lastSection.elem.style.transform = `translate3d(0, ${y}px, 0)`;
    }

    if (this.currentSection === this.SECTIONS.length - 1) {
      const y = this.SECTIONS.length * window.innerHeight;
      this.firstSection.elem.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  }

  _toggleSection(animate = true) {
    this.CURRENTSECTION = this.SECTIONS[this.currentSection];

    if (window.AUDIO_PLAYING) window.AUDIO_PLAYING.fadeOut();

    if (this.SECTIONS[this.currentSection]) {
      document.body.dataset.theme = this.SECTIONS[this.currentSection].elem.dataset.cover || '';
    }

    this._setVerticalOffset(animate);
  }

  _resetFlow() {
    this.firstSection.elem.style.transform = `translate3d(0, 0, 0)`;
    this.lastSection.elem.style.transform = `translate3d(0, 0, 0)`;
  }

  _onArrowKeys() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 40) this.goToNextSection();
      if (e.keyCode === 38) this.goToPrevSection();
      if (e.keyCode === 39) this.CURRENTSECTION.toggleNext();
      if (e.keyCode === 37) this.CURRENTSECTION.togglePrev();
    });
  }

  _onMouseWheel(dx, dy, dz, ev) {
    const direction = Math.sign(dy) < 0 ? 'down' : 'up';
    const distance = Math.abs(dy);

    if ((this.CURRENTSECTION && this.CURRENTSECTION.isInfo) || this.isAnimating) {
      return false;
    }

    if (distance >= 15 && this.isTriggered === 0) {
      this.isTriggered = 15;

      if (direction === 'up') {
        return this.goToNextSection();
      } else {
        return this.goToPrevSection();
      }
    }
  }
}

function _setScrollPosition(index, length) {
  if (index < 0) index = length - 1;
  if (index >= length) index = 0;

  const sh = window.innerHeight - 4 - scrollThumbHeight;
  const y = (index) * (sh / (length - 1));
  scrollthumb.style.transform = `translate3d(0, ${y}px, 0)`;
}

export default Portfolio;