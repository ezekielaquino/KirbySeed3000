import zenscroll from 'zenscroll';
const main = document.querySelector('main');
const scrollContainer = zenscroll.createScroller(main);
const projects = [...document.querySelectorAll('.project')];
let currentProject;

history.scrollRestoration = "manual";





// Handle infinite scroll
main.addEventListener('scroll', (e) => {
  const current = main.scrollTop + window.innerHeight;
  const total = main.scrollHeight;

  if (current === total) {
    main.scrollTo(0, 0);
  }
});


const observer = new IntersectionObserver(entries => {
  setRoute(entries[0].target, true);
}, { threshold: [ 0.75 ] });


projects.forEach((project, index) => {
  project.index = index;
  project.cover = project.querySelector('.slide--cover');
  project.slides = project.querySelector('.project-slides');
  project.slides.current = 0;

  // scroll to current project
  if (getCurrent().slug === project.id) {
    window.scrollTo(0, project.offsetTop);
  }

  // Set the observer
  observer.observe(project);

  // Advance back / forward
  project.addEventListener('click', (e) => {
    if (e.clientX > window.innerWidth / 2) {
      // Next
      toggleSlides(project, 'next');
    } else {
      // Prev
      toggleSlides(project, 'prev');
    }
  });
});

window.onpopstate = (e) => {
  window.scrollTo(0, getCurrent().location);
}



function toggleSlides(elem, direction) {
  const slides = elem.slides;
  const isLast = slides.current === parseInt(slides.dataset.slides);
  const isFirst = slides.current === 0;

  if (!isFirst && !isLast) disableEvents(elem);

  switch(direction) {
    case 'next': {
      if (isFirst) toggleProject(elem);
      if (!isLast) slides.current += 1;
      if (isLast) goToNextProject();
      break;
    }
    case 'prev': {
      if (!isFirst) slides.current -= 1;
      break;
    }
  }

  slides.style.transform = `translate3d(${slides.current * -100}vw, 0, 0)`;
}


function goToNextProject() {
  const index = currentProject.index + 1;
  const nextProject = projects[index];
  setCurrentProject(nextProject);
  setRoute(nextProject);
}



function disableEvents(elem) {
  const _onTransitionEnd = () => {
    elem.classList.remove('is-animating');
    elem.removeEventListener('transitionend', _onTransitionEnd);
  };

  elem.classList.add('is-animating');
  elem.addEventListener('transitionend', _onTransitionEnd);
}



function toggleProject(project) {
  setRoute(project);
  setCurrentProject(project);
}



function setCurrentProject(project) {
  if (currentProject) {
    currentProject.slides.style.transform = 'none';
    currentProject.slides.current = 0;
  }

  currentProject = project;
}




function setRoute(project, noScroll) {
  const baseUrl = window.location.origin;
  const current = {
    project: project.id,
    type: project.dataset.type,
    location: project.offsetTop
  };
  const url = `${baseUrl}/${current.type}/${current.project}`;

  history.pushState(current, '', url);

  if (!noScroll) scrollContainer.toY(project.offsetTop);
}




function getCurrent() {
  const path = window.location.pathname;
  const slug = path.substring(path.lastIndexOf('/') + 1);
  const elem = document.getElementById(`${slug}`);

  return {
    slug,
    location: elem ? elem.offsetTop : 0
  };
}