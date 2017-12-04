import zenscroll from 'zenscroll';
const projects = [...document.querySelectorAll('.project')];
let currentProject;

history.scrollRestoration = "manual";





// Handle infinite scroll
window.addEventListener('scroll', (e) => {
  const current = window.scrollY + window.innerHeight;
  const total = document.documentElement.scrollHeight;

  if (current === total) {
    window.scrollTo(0, 0);
  }
});


const observer = new IntersectionObserver(entries => {
  setRoute(entries[0].target, true);
}, { threshold: [ 0.75 ] });


projects.forEach(project => {
  project.slides = project.querySelector('.project-slides');

  // scroll to current project
  if (getCurrent().slug === project.id) {
    window.scrollTo(0, project.offsetTop);
  }

  observer.observe(project);
  project.addEventListener('click', () => toggleProject(project));
});

window.onpopstate = (e) => {
  window.scrollTo(0, getCurrent().location);
}




function toggleProject(project) {
  if (currentProject) {
    currentProject.slides.style.transform = 'none';
  }
  
  project.slides.style.transform = `translate3d(${-100}vw, 0, 0)`;
    
  setRoute(project);

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

  if (!noScroll) zenscroll.toY(project.offsetTop);
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