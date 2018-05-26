import fullpage from './fullpage';
import './resetSlider.js';
import lozad from 'lozad';
import Emitter from './Emitter';
import Project from './Project';
const projectsElem = document.querySelector('#projects');
const projects = [...document.querySelectorAll('.project')];
const scrollthumb = document.querySelector('.scrollbar-thumb');
const about = document.querySelector('.information');
const aboutToggle = document.querySelector('.js-infoToggle');
const aboutClose = document.querySelector('.js-infoClose');
let scrollThumbHeight = (window.innerHeight - 4) / projects.length + 30;
let isAbout;

window.IS_MOBILE = document.body.dataset.mobile;
window.PROJECTS = [];

// Set the scrollbar thumb height
scrollthumb.style.height = scrollThumbHeight +  'px';

const observer = lozad('.preload', {
  loaded: function(el) {
    el.classList.add('is-loaded');
  },
  rootMargin: window.innerWidth + 'px',
});

$(document).ready(function() {
  _initProjects();

  $('#projects').fullpage({
    scrollingSpeed: 580,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    controlArrows: false,
    continuousVertical: true,
    loopVertical: false,
    loopHorizontal: false,
    animateAnchor: false,
    touchSensitivity: 14,
    resetSliders: true,
    scrollBar: false,
    lazyLoading: true,
    resetSlidersKey: 'YXN0cmlkc2VtZS5jb21fU0FXY21WelpYUlRiR2xrWlhKenpPcg==',
    afterRender: handleRender,
    afterLoad: handleProjectLoad,
    onLeave: handleProjectLeave,
    afterSlideLoad: handleSlideLoad,
    onSlideLeave: handleSlideLeave,
    afterResize: handleResize,
  });
});



function handleRender() {
  observer.observe();

  aboutToggle.addEventListener('click', () => {
    isAbout = !isAbout;
    about.scrollTop = 0;
    document.body.classList.toggle('is-about');
    $.fn.fullpage.setAllowScrolling(false);
  });
  
  aboutClose.addEventListener('click', () => {
    isAbout = false;
    document.body.classList.remove('is-about');
    $.fn.fullpage.setAllowScrolling(true);
  });  

  if (IS_MOBILE || window.innerWidth < 600) {
    about.addEventListener('scroll', e => {
      if (about.scrollTop > 50) {
        document.querySelector('.header-title').classList.add('is-hidden');
      } else {
        document.querySelector('.header-title').classList.remove('is-hidden');
      }
    });
  }

  _handleEvents();
}



function handleResize() {
  scrollThumbHeight = (window.innerHeight - 4) / projects.length + 30;
  scrollthumb.style.height = scrollThumbHeight + 'px';
}



function handleProjectLoad(anchor, index) {
  _setCurrentProject(index);
  _setTheme(index);
  window.CURRENT_PROJECT.setCursor();
}




function handleProjectLeave(index, nextIndex, direction) {
  // hide the info of current project
  _setCurrentProject(index);

  // Set the scrollbar position
  _setScrollPosition(nextIndex);

  // set the theme (is cover light or dark?)
  _setTheme(nextIndex);

  window.CURRENT_PROJECT.toggleInfo(false);
  window.CURRENT_PROJECT.setInfo(0);
  window.CURRENT_PROJECT.setActive(0);
  window.CURRENT_PROJECT.setCurrentSlide(0);

  if (window.CURRENT_PROJECT.type === 'sound') {
    window.CURRENT_PROJECT.audio.fadeOut();
  }
}




function handleSlideLoad(anchor, index, slideAnchor, slideIndex) {
 
}




function handleSlideLeave(anchor, index, slideIndex, direction, nextSlideIndex) {
  _setCurrentProject(index);
  // Sets is-project class on body, this overrides the cover theme
  _toggleIsProject(nextSlideIndex);

  window.CURRENT_PROJECT.setActive(nextSlideIndex);
  window.CURRENT_PROJECT.setInfo(nextSlideIndex - 1);
  window.CURRENT_PROJECT.setCurrentSlide(nextSlideIndex);
}

function _setCurrentProject(index) {
  window.CURRENT_PROJECT = window.PROJECTS[index - 1];
}

function _setScrollPosition(index) {
  const sh = window.innerHeight - 4 - scrollThumbHeight;
  const y = (index - 1) * (sh / (projects.length - 1));
  scrollthumb.style.transform = `translate3d(0, ${y}px, 0)`;
}


function _setTheme(index) {
  document.body.classList.remove('is-light', 'is-dark', 'is-project');
  document.body.classList.add(`is-${window.PROJECTS[index - 1].theme}`);
}


function _toggleIsProject(index) {
  if (index > 0) document.body.classList.add('is-project');
  else document.body.classList.remove('is-project');
}


function _initProjects() {
  projects.forEach(project => {
    const instance = new Project(project);
    window.PROJECTS.push(instance);
  });
}

function _handleEvents() {
  Emitter.on('toggleInfo', e => {
    if (e) {
      CURSOR.hide();
      $.fn.fullpage.setAllowScrolling(false);
      scrollthumb.classList.add('is-hidden');
    } else {
      $.fn.fullpage.setAllowScrolling(true);
      scrollthumb.classList.remove('is-hidden');
    }
  });

  Emitter.on('toggleSlide', e => {
    window.CURRENT_PROJECT = e.project;

    if (e.slide.isLast && e.project.isInfo) {
      return CURRENT_PROJECT.toggleInfo(false);
    }

    if (!e.slide.isLast && e.project.isInfo) {
      e.project.toggleInfo(false);
    }

    if (e.slide.isLast && !e.project.isInfo && e.direction === 'right') {    
      if (e.event.clientY > e.project.infoHeight) {
        CURSOR.hide();
      }
      
      return CURRENT_PROJECT.toggleInfo(true);
    }
    
    if (e.direction === 'right') {
      return $.fn.fullpage.moveSlideRight();
    }

    if (e.direction === 'left') {
      return $.fn.fullpage.moveSlideLeft();
    }
  });
}