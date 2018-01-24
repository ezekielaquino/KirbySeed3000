import fullpage from 'fullpage.js';
const projects = [...document.querySelectorAll('.project')];
const slides = [...document.querySelectorAll('.slide')];
const aboutToggle = document.querySelector('.header-toggle');
let direction, activeSection;


$(document).ready(function() {
	$('#projects').fullpage({
    controlArrows: false,
    afterLoad: (anchorLink, index) => {
      activeSection = projects[index - 1];
    },
    onLeave: (index, nextIndex, direction) => {
      activeSection = projects[index - 1];
      activeSection.classList.remove('is-info');
    },
    onSlideLeave: (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
      activeSection.classList.remove('is-info');
      console.log(activeSection)

      if (nextSlideIndex > 0) {
        document.body.classList.add('is-project');
        activeSection.classList.add('is-active');
      } else {
        document.body.classList.remove('is-project');
        activeSection.classList.remove('is-active');
      }
    }
  });
});


aboutToggle.addEventListener('click', () => {
  document.body.classList.toggle('is-about');
});


window.addEventListener('mousemove', (e) => {
  if (e.clientX > window.innerWidth / 2) {
    direction = 'next';
    document.documentElement.style.setProperty('--cursor', 'e-resize');
  } else {
    direction = 'prev';
    document.documentElement.style.setProperty('--cursor', 'w-resize');
  }
});


slides.forEach(slide => {
  slide.addEventListener('click', (e) => {
    if (direction === 'next') {
      $.fn.fullpage.moveSlideRight();
    } else {
      // Prev
      $.fn.fullpage.moveSlideLeft();
    }
  });
});


projects.forEach(project => {
  const infoBtn = project.querySelector('.project-info__toggle');

  infoBtn.addEventListener('click', () => {
    project.classList.toggle('is-info');
  });
});


// Advance back / forward
// project.slides.addEventListener('click', (e) => {
//   if (project.infoActive && !project.isExitInfo || isInAudio) { return; }

//   if (e.clientX > window.innerWidth / 2) {
//     // Next
//     toggleSlides(project, 'next');
//   } else {
//     // Prev
//     toggleSlides(project, 'prev');
//   }
// });





// // Handle infinite scroll
// // main.addEventListener('scroll', (e) => {
// //   const current = Math.ceil(main.scrollTop + window.innerHeight);
// //   const total = main.scrollHeight;
// //   const scrollPercent = main.scrollTop / (total - window.innerHeight);
// //   const scrollY = scrollPercent * (window.innerHeight - 60);
// //   let opacity = 0;

// //   if (current === total) {
// //     main.scrollTo(0, 0);
// //   }

// //   if (main.scrollTop <= 175) opacity = main.scrollTop / 200;
// //   else opacity = 1;

// //   scrollThumb.style.opacity = opacity;
// //   scrollThumb.style.transform = `translate3d(0, ${scrollY}px, 0)`
// // });







// window.addEventListener('keyup', e => {
//   e.preventDefault();

//   if (e.keyCode === 27) {
//     document.body.classList.remove('is-about');
//   }

//   if (e.keyCode === 39) {
//     // right
//     toggleSlides(currentProject, 'next');
//   }

//   if (e.keyCode === 37) {
//     // left
//     toggleSlides(currentProject, 'prev');
//   }

//   if (e.keyCode === 40) {
//     // down
//     goToNextProject(currentProject);
//   }

//   if (e.keyCode === 38) {
//     // up
//     goToNextProject(currentProject, true);
//   }
// });







// // Set the Intersection Observer
// observer = new IntersectionObserver(entries => {
//   setRoute(entries[0].target, true);
// }, { threshold: [ 0.8 ] });







// // Loop through the projects
// projects.forEach((project, index) => {
//   project.index = index;
//   project.type = project.dataset.type;
//   project.isDesign = project.type === 'design';
//   project.cover = project.querySelector('.slide--cover');
//   project.slides = project.querySelector('.project-slides');
//   project.info = project.querySelector('.project-info');
//   project.infoToggle = project.info.querySelector('.project-info__toggle');
//   project.location = project.info.querySelector('.js-projectLoc');
//   project.slides.current = 0;
//   project.isExitInfo = false;

//   // scroll to current project
//   if (getCurrent().slug === project.id) {
//     main.scrollTo(0, project.offsetTop);
//   }

//   observer.observe(project)

//   // info
//   if (project.infoToggle) {
//     project.infoToggle.addEventListener('click', (e) => {
//       toggleInfo();
//     });

//     document.addEventListener('click', function(event) {
//       if (!project.infoActive || project.isExitInfo) { return; }

//       const isClickInside = project.info.contains(event.target);
//       if (!isClickInside) {
//         untoggleInfo(project);
//       }
//     });
//   }

//   // audio
//   if (project.type === 'sound') {
//     const audioPlayer = project.querySelector('.js-audio');
//     const track = audioPlayer.querySelector('.js-audioTrack');
//     const play = audioPlayer.querySelector('.js-audioPlay');
//     const pause = audioPlayer.querySelector('.js-audioPause');
//     const src = audioPlayer.dataset.src;
//     const indicator = track.querySelector('span');
//     const audio = new Audio(src);

//     project.audio = audio;
//     project.audioPlayer = audioPlayer;
//     project.resetAudio = () => {
//       project.audio.pause();
//       project.audio.currentTime = 0;
//       project.audioPlayer.classList.remove('is-paused', 'is-playing');
//     };

//     audioPlayer.addEventListener('mouseenter', () => isInAudio = true );
//     audioPlayer.addEventListener('mouseleave', () => isInAudio = false );

//     track.addEventListener('click', e => {
//       const position = e.offsetX / track.offsetWidth;
//       audio.currentTime = position * audio.duration;
//       indicator.style.backgroundColor = audioPlayer.dataset.color;
//       indicator.style.transform = `scale(${position}, 1)`;
//     });

//     play.addEventListener('click', () => {
//       audio.play();
//       audioPlayer.classList.remove('is-paused');
//       audioPlayer.classList.add('is-playing');
//     });

//     pause.addEventListener('click', () => {
//       audio.pause();
//       audioPlayer.classList.remove('is-playing');
//       audioPlayer.classList.add('is-paused');
//     });

//     audio.ontimeupdate = () => {
//       const position = audio.currentTime / audio.duration;
//       indicator.style.backgroundColor = audioPlayer.dataset.color;
//       indicator.style.transform = `scale(${position}, 1)`;
//     }

//     audio.onended = () => {
//       indicator.style.transform = `scale(0, 1)`;
//       project.resetAudio();
//     }
//   }

//   // Advance back / forward
//   project.slides.addEventListener('click', (e) => {
//     if (project.infoActive && !project.isExitInfo || isInAudio) { return; }

//     if (e.clientX > window.innerWidth / 2) {
//       // Next
//       toggleSlides(project, 'next');
//     } else {
//       // Prev
//       toggleSlides(project, 'prev');
//     }
//   });
// });













// window.onpopstate = (e) => {
//   const location = getCurrent().location;
//   window.scrollTo(0, location);
// }







// function toggleInfo() {
//   if (currentProject) {
//     currentProject.infoActive = true;
//     currentProject.classList.add('is-info');
//   }
// }






// function untoggleInfo(project) {
//   if (project) {
//     project.infoActive = project.isExitInfo = false;
//     project.classList.remove('is-info');
//   }
// }







// function toggleSlides(elem, direction) {
//   const slides = elem.slides;
//   const isSingle = parseInt(slides.dataset.slides) === 0;
//   const isLast = slides.current === parseInt(slides.dataset.slides);
//   const isFirst = slides.current === 0;

//   if (!isFirst && !isLast) disableEvents(elem);

//   switch(direction) {
//     case 'next': {
//       if (isFirst) {
//         elem.classList.add('is-active');
//         toggleProject(elem)
//       };

//       if (!isLast) {
//         elem.isActive = true;
//         document.body.classList.add('is-project');
//         slides.current += 1;
//       }

//       if (isLast && elem.isExitInfo && elem.isDesign) {
//         goToNextProject(elem);
//         elem.isExitInfo = false;
//       }

//       if (isLast && !elem.isDesign) {
//         goToNextProject(elem);
//       }

//       if (isLast && !elem.isExitInfo) {
//         toggleInfo();
//         elem.isExitInfo = true;
//       }

//       break;
//     }
//     case 'prev': {
//       if (!isFirst) {
//         elem.isExitInfo = false;
//         slides.current -= 1;
//       }

//       if (slides.current === 0) {
//         if (elem.isActive) {
//           elem.isActive = false;
//           document.body.classList.remove('is-project');
//           currentProject.classList.remove('is-active');
//         } else {
//           toggleSlides(elem, 'next');
//         }
//       }

//       break;
//     }
//   }

//   if (elem.location) {
//     elem.location.innerHTML = slides.current + 1;
//   }

//   slides.style.transform = `translate3d(${slides.current * -100}vw, 0, 0)`;
// }





// function goToNextProject(project, isPrev) {
//   let index;

//   if (!isPrev) {
//     index = project.index < projects.length - 1 ? project.index + 1 : 0;
//   } else {
//     index = project.index > 0 ? project.index - 1 : projects.length - 1;
//   }

//   if (project.audio) {
//     project.resetAudio();
//   }

//   const nextProject = projects[index];

//   document.body.classList.remove('is-project');

//   delay(1000, () => {
//     resetProject(project);
//     untoggleInfo(project);
//     setCurrentProject(nextProject);
//   });

//   setRoute(nextProject);
// }






// function disableEvents(elem) {
//   const _onTransitionEnd = () => {
//     elem.classList.remove('is-animating');
//     elem.removeEventListener('transitionend', _onTransitionEnd);
//   };

//   elem.classList.add('is-animating');
//   elem.addEventListener('transitionend', _onTransitionEnd);
// }






// function toggleProject(project) {
//   setRoute(project);
//   setCurrentProject(project);
// }






// function setCurrentProject(project) {
//   currentProject = project;
// }






// function resetProject(project) {
//   if (project) {
//     project.classList.remove('is-active');
//     project.slides.style.transform = 'translate3d(0, 0, 0)';
//     project.slides.current = 0;
//     project.isActive = false;
//   }
// }






// function setRoute(project, noScroll) {
//   const baseUrl = window.location.origin;
//   const current = {
//     project: project.id,
//     type: project.dataset.type,
//     location: project.offsetTop
//   };
//   const url = `${baseUrl}/${current.type}/${current.project}`;

//   if (!initialScroll && !isAnimatedScroll) history.pushState(current, '', url);

//   if (project.isActive) {
//     document.body.classList.add('is-project');
//   } else {
//     document.body.classList.remove('is-project');
//   }

//   currentProject = project;

//   if (!noScroll) {
//     currentProject = undefined;
//     TweenLite.to(main, 1, {
//       scrollTo: {
//         y: project.offsetTop
//       },
//       ease: Power2.easeInOut,
//       force3D: true,
//       onStart: () => {
//         isAnimatedScroll = true;
//       },
//       onComplete: () => {
//         isAnimatedScroll = false;
//       }
//     });
//     document.documentElement.style.setProperty('--cursor', 'initial');
//   }

//   initialScroll = false;
// }






// function getCurrent() {
//   const path = window.location.pathname;
//   const slug = path.substring(path.lastIndexOf('/') + 1);
//   const elem = document.getElementById(`${slug}`);

//   return {
//     slug,
//     location: elem ? elem.offsetTop : 0
//   };
// }






// function delay(timeout, func) {
//   return setTimeout(() => { func() }, timeout);
// }