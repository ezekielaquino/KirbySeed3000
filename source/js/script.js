import objectFitImages from 'object-fit-images';
import Polyfills from './Polyfills';
import Portfolio from './Portfolio';

const about = document.querySelector('.information');
const aboutWrap = about.querySelector('.information__wrap');
const aboutToggle = document.querySelector('.js-infoToggle');
const aboutClose = document.querySelector('.js-infoClose');
const container = document.querySelector('#projects');
const siteTitle = document.querySelector('.header-title h1');
const Slider = new Portfolio({
  elem: container,
  slideSelector: '.slide',
  sectionSelector: '.section',
});
let isAbout;

objectFitImages();

aboutToggle.addEventListener('click', () => {
  isAbout = !isAbout;
  about.querySelector('.information__wrap').scrollTop = 0;
  document.body.classList.toggle('is-about');
});

about.addEventListener('scroll', (e) => {
  if (e.target.scrollTop > 30) {
    siteTitle.classList.add('is-hidden');
  } else {
    siteTitle.classList.remove('is-hidden');
  }
}, { passive: true });

aboutClose.addEventListener('click', () => {
  isAbout = false;
  siteTitle.classList.remove('is-hidden');
  document.body.classList.remove('is-about');
});