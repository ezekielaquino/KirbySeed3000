const headerTitle = document.querySelector('.header-title');
const headerNav = document.querySelector('.header-nav');

class Cursor {
  constructor() {
    this.cursor = document.querySelector('.js-cursor');
    this.init();
  }

  init() {
    headerTitle.addEventListener('mouseenter', () => {
      this.cursor.classList.add('is-hidden');
    });
    
    headerNav.addEventListener('mouseenter', () => {
      this.cursor.classList.add('is-hidden');
    });
  }

  reset(total) {
    this.cursor.classList.remove('is-hidden');
  }

  setDirection(direction) {
    this.direction = direction;
    this.cursor.dataset.direction = this.direction;
  }

  show(e) {
    if (this.hidden) return false;

    this.cursor.classList.remove('is-hidden');
    this.cursor.style.opacity = 1;
    this.cursor.style.left = e.clientX - (this.cursor.offsetWidth / 2) + 'px';
    this.cursor.style.top = e.clientY - (this.cursor.offsetHeight / 2) + 'px';
  }

  hide(bool = true) {
    if (bool) {
      this.hidden = true;
      return this.cursor.classList.add('is-hidden');
    }

    this.hidden = false;
    this.cursor.classList.remove('is-hidden');
  }

  setLight() {
    this.cursor.classList.remove('is-dark');
  }

  setDark() {
    this.cursor.classList.add('is-dark');
  }

  toggleClose(bool) {
    this.cursor.dataset.close = bool;
  }
}

export default new Cursor();