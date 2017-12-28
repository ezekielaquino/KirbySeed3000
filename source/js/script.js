import 'gsap/EasePack';
import 'gsap/ScrollToPlugin';
import 'intersection-observer';
import TweenLite from 'gsap/TweenLite';
const main = document.querySelector('main');
const projects = [...document.querySelectorAll('.project')];
const scrollThumb = document.querySelector('.scrollbar-thumb');
const aboutToggle = document.querySelector('.header-toggle');
let currentProject;
let observer;
let isAnimatedScroll;
let initialScroll = true;






history.scrollRestoration = "manual";





// Handle infinite scroll
main.addEventListener('scroll', (e) => {
  const current = Math.ceil(main.scrollTop + window.innerHeight);
  const total = main.scrollHeight;
  const scrollPercent = main.scrollTop / (total - window.innerHeight);
  const scrollY = scrollPercent * (window.innerHeight - 60);
  let opacity = 0;

  if (current === total) {
    main.scrollTo(0, 0);
  }

  if (main.scrollTop <= 175) opacity = main.scrollTop / 200;
  else opacity = 1;

  scrollThumb.style.opacity = opacity;
  scrollThumb.style.transform = `translate3d(0, ${scrollY}px, 0)`
});





aboutToggle.addEventListener('click', () => {
  document.body.classList.toggle('is-about');
});







// Set the Intersection Observer
observer = new IntersectionObserver(entries => {
  setRoute(entries[0].target, true);
}, { threshold: [ 0.8 ] });







// Loop through the projects
projects.forEach((project, index) => {
  project.index = index;
  project.cover = project.querySelector('.slide--cover');
  project.slides = project.querySelector('.project-slides');
  project.info = project.querySelector('.project-info');
  project.infoToggle = project.info.querySelector('.project-info__toggle');
  project.slides.current = 0;
  project.isExitInfo = false;

  // scroll to current project
  if (getCurrent().slug === project.id) {
    main.scrollTo(0, project.offsetTop);
  }

  observer.observe(project)

  // info
  if (project.infoToggle) {
    project.infoToggle.addEventListener('click', (e) => {
      toggleInfo();
    });

    document.addEventListener('click', function(event) {
      if (!project.infoActive || project.isExitInfo) { return; }

      const isClickInside = project.info.contains(event.target);
      if (!isClickInside) {
        untoggleInfo(project);
      }
    });
  }

  // Advance back / forward
  project.slides.addEventListener('click', (e) => {
    if (project.infoActive && !project.isExitInfo) { return; }

    if (e.clientX > window.innerWidth / 2) {
      // Next
      toggleSlides(project, 'next');
    } else {
      // Prev
      toggleSlides(project, 'prev');
    }
  });
});






window.addEventListener('mousemove', (e) => {
  if (currentProject) {
    if (e.clientX > window.innerWidth / 2) {
      document.documentElement.style.setProperty('--cursor', 'e-resize');
    } else {
      if (currentProject) {
        document.documentElement.style.setProperty('--cursor', 'w-resize');
      }
    }
  }
});






window.onpopstate = (e) => {
  window.scrollTo(0, getCurrent().location);
}







function toggleInfo() {
  if (currentProject) {
    currentProject.infoActive = true;
    currentProject.classList.add('is-info');
  }
}






function untoggleInfo(project) {
  if (project) {
    project.infoActive = project.isExitInfo = false;
    project.classList.remove('is-info');
  }
}







function toggleSlides(elem, direction) {
  const slides = elem.slides;
  const isSingle = parseInt(slides.dataset.slides) === 0;
  const isLast = slides.current === parseInt(slides.dataset.slides);
  const isFirst = slides.current === 0;

  if (!isFirst && !isLast) disableEvents(elem);

  switch(direction) {
    case 'next': {
      if (isFirst) {
        elem.classList.add('is-active');
        toggleProject(elem)
      };

      if (!isLast) {
        elem.isActive = true;
        document.body.classList.add('is-project');
        slides.current += 1;
      }

      if (isLast && elem.isExitInfo) {
        goToNextProject(elem);
        elem.isExitInfo = false;
      }

      if (isLast && !elem.isExitInfo) {
        toggleInfo();
        elem.isExitInfo = true;
      }
      break;
    }
    case 'prev': {
      if (!isFirst) {
        elem.isExitInfo = false;
        slides.current -= 1;
      }
      if (slides.current === 0) {
        if (elem.isActive) {
          elem.isActive = false;
          document.body.classList.remove('is-project');
          currentProject.classList.remove('is-active');
        } else {
          if (!isLast && !isSingle) {
            elem.isActive = true;
            document.body.classList.add('is-project');
            slides.current += 1;
          } else {
            toggleSlides(elem, 'next');
          }
        }
      }
      break;
    }
  }

  slides.style.transform = `translate3d(${slides.current * -100}vw, 0, 0)`;
}





function goToNextProject(project) {
  const index = project.index < projects.length - 1 ? project.index + 1 : 0;
  const nextProject = projects[index];

  document.body.classList.remove('is-project');

  delay(1000, () => {
    resetProject(project);
    untoggleInfo(project);
    setCurrentProject(nextProject);
  });

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
  currentProject = project;
}






function resetProject(project) {
  if (project) {
    project.classList.remove('is-active');
    project.slides.style.transform = 'translate3d(0, 0, 0)';
    project.slides.current = 0;
    project.isActive = false;
  }
}






function setRoute(project, noScroll) {
  const baseUrl = window.location.origin;
  const current = {
    project: project.id,
    type: project.dataset.type,
    location: project.offsetTop
  };
  const url = `${baseUrl}/${current.type}/${current.project}`;

  if (!initialScroll && !isAnimatedScroll) history.pushState(current, '', url);

  if (project.isActive) {
    document.body.classList.add('is-project');
  } else {
    document.body.classList.remove('is-project');
  }


  currentProject = project;

  if (!noScroll) {
    currentProject = undefined;
    TweenLite.to(main, 1, {
      scrollTo: {
        y: project.offsetTop
      },
      ease: Power2.easeInOut,
      force3D: true,
      onStart: () => {
        isAnimatedScroll = true;
      },
      onComplete: () => {
        isAnimatedScroll = false;
      }
    });
    document.documentElement.style.setProperty('--cursor', 'initial');
  }

  initialScroll = false;
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






function delay(timeout, func) {
  return setTimeout(() => { func() }, timeout);
}