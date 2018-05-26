import fullpage from 'fullpage.js/dist/jquery.fullpage.extensions.min.js';
import './resetSlider.js';
const projects = [...document.querySelectorAll('.project')];
const slides = [...document.querySelectorAll('.slide')];
const aboutToggle = document.querySelector('.js-infoToggle');
const aboutClose = document.querySelector('.js-infoClose');
const scrollthumb = document.querySelector('.scrollbar-thumb');
let direction, activeSection, isFirst, isLast, isInfo, isInAudio, isAbout, audioPlaying, currentPlayer, currentLoc;

scrollthumb.style.height = (window.innerHeight - 4) / projects.length + 'px';

function setScrollThumb(position) {
  const y = (position - 1) * scrollthumb.offsetHeight;
  scrollthumb.style.transform = `translate3d(0, ${y}px, 0)`;
}

$(document).ready(function() {
	$('#projects').fullpage({
    controlArrows: false,
    continuousVertical: true,
    loopVertical: false,
    loopHorizontal: false,
    touchSensitivity: 4,
    resetSliders: true,
    resetSlidersKey: 'YXN0cmlkc2VtZS5jb21fU0FXY21WelpYUlRiR2xrWlhKenpPcg==',

    afterLoad: (anchorLink, index) => {
      activeSection = projects[index - 1];
     
      if (activeSection) {
        currentLoc = activeSection.loc;
      }

      if (activeSection.dataset.cover === 'light') {
        document.body.classList.add('is-light');
      }

      if (activeSection.coverVideo) {
        activeSection.coverVideo.play();
      }
    },
    afterSlideLoad: (anchorLink, index, slideAnchor, slideIndex) => {
      isFirst = slideIndex === 0;
    },
    onLeave: (index, nextIndex, direction) => {
      setScrollThumb(nextIndex);

      isLast = false;

      if (activeSection) {
        activeSection.classList.remove('is-info');
        currentLoc = activeSection.loc;
        $.fn.fullpage.setAllowScrolling(true);

        if (projects[nextIndex - 1].dataset.cover === 'light') {
          document.body.classList.add('is-light');
        } else {
          document.body.classList.remove('is-light');
        }
      }

      if (audioPlaying && currentPlayer) {
        let fader, volume = 1;

        fader = setInterval(() => {
          if (audioPlaying.volume >= 0.1) {
            audioPlaying.volume = audioPlaying.volume - 0.1;
          } else {
            audioPlaying.volume = 0;
            audioPlaying.pause();
            audioPlaying.currentTime = 0;
            return clearInterval(fader);
          }
        }, 80);

        currentPlayer.classList.remove('is-playing');
        currentPlayer.classList.add('is-paused');
      }
    },
    onSlideLeave: (anchorLink, index, slideIndex, direction, nextSlideIndex) => {
      if (activeSection) activeSection.classList.remove('is-info');

      isLast = nextSlideIndex === activeSection.total - 1;
      
      activeSection.caption.innerHTML = activeSection.slides[nextSlideIndex].dataset.caption;

      if (nextSlideIndex > 0) {
        document.body.classList.add('is-project');
        if (activeSection) activeSection.classList.add('is-active');
        currentLoc.innerHTML = nextSlideIndex;
      } else {
        document.body.classList.remove('is-project');
        if (activeSection) activeSection.classList.remove('is-active');
        
        if (activeSection.coverVideo) {
          activeSection.coverVideo.play();
        }
      }

      if (isLast && activeSection.type === 'sound') {
        document.body.classList.remove('cursor-right');
        document.body.classList.add('cursor-left');
      }
    }
  });
});


aboutToggle.addEventListener('click', () => {
  isAbout = !isAbout;
  document.body.classList.toggle('is-about');
  $.fn.fullpage.setAllowScrolling(!isAbout);
});

aboutClose.addEventListener('click', () => {
  isAbout = false;
  document.body.classList.remove('is-about');
  $.fn.fullpage.setAllowScrolling(true);
});


window.addEventListener('mousemove', (e) => {
  if (isInAudio) { return }

  if (e.clientX > window.innerWidth / 2) {
    if (isLast && activeSection.type === 'sound') {
      direction = 'prev';
      document.body.classList.remove('cursor-right');
      document.body.classList.add('cursor-left');
      return;
    }

    direction = 'next';
    document.body.classList.add('cursor-right');
    document.body.classList.remove('cursor-left');
  } else {
    if (isFirst) {
      direction = 'next';
      document.body.classList.remove('cursor-left');
      document.body.classList.add('cursor-right');
    } else {
      direction = 'prev';
      document.body.classList.remove('cursor-right');
      document.body.classList.add('cursor-left');
    }
  }
});


slides.forEach(slide => {
  slide.addEventListener('click', (e) => {
    if (isInAudio) { return }

    if (isLast && isInfo) {
      isInfo = false;
      return $.fn.fullpage.moveSectionDown();
    }

    if (direction === 'next') {
      if (!isLast) {
        $.fn.fullpage.moveSlideRight();
      } else if (isLast && !isInfo) {
        if (activeSection.type === 'design') {
          isInfo = true;
          activeSection.classList.add('is-info');
        } else {
          $.fn.fullpage.moveSlideLeft();
        }
      }
    } else if (isLast && isInfo) {
      $.fn.fullpag.moveSectionDown();
    } else {
      // Prev
      $.fn.fullpage.moveSlideLeft();
    }
  });
});


projects.forEach(project => {
  const infoBtn = project.querySelector('.project-info__toggle');
  project.type = project.dataset.type;
  project.slides = project.querySelectorAll('.slide');
  project.caption = project.querySelector('.project-info__title');
  project.coverVideo = project.querySelector('.cover-video');

  project.total = parseInt(project.dataset.length);
  project.loc = project.querySelector('.project-info__location span');

  if (project.type === 'design') {
    infoBtn.addEventListener('click', () => {
      isInfo = true;
      project.classList.toggle('is-info');
    });
  }

  // audio
  if (project.type === 'sound') {
    const audioPlayer = project.querySelector('.js-audio');
    const track = audioPlayer.querySelector('.js-audioTrack');
    const play = audioPlayer.querySelector('.js-audioPlay');
    const pause = audioPlayer.querySelector('.js-audioPause');
    const src = audioPlayer.dataset.src;
    const time = audioPlayer.querySelector('.tooltip');
    const indicator = track.querySelector('.indicator');
    const audio = new Audio(src);

    project.audio = audio;
    project.audioPlayer = audioPlayer;
    project.resetAudio = () => {
      project.audio.pause();
      project.audio.currentTime = 0;
      project.audioPlayer.classList.remove('is-paused', 'is-playing');
    };

    audioPlayer.addEventListener('mouseenter', () => isInAudio = true );
    audioPlayer.addEventListener('mouseleave', () => isInAudio = false );

    indicator.style.backgroundColor = audioPlayer.dataset.color;
    time.style.backgroundColor = audioPlayer.dataset.color;

    track.addEventListener('click', e => {
      const position = e.offsetX / track.offsetWidth;
      audio.currentTime = position * audio.duration;
      indicator.style.transform = `scale(${position}, 1)`;

      audioPlaying = audio;
      currentPlayer = audioPlayer;
  
      audio.play();
      audio.volume = 1;
      audioPlayer.classList.remove('is-paused');
      audioPlayer.classList.add('is-playing');
    });

    track.addEventListener('mousemove', e => {
      const position = e.offsetX / track.offsetWidth;
      const current = (position * audio.duration) / 60;

      time.innerHTML = isNaN(current) ? 'Loading' : current.toFixed(2).replace('.', ':');
      time.style.transform = `translateX(${e.offsetX - (time.offsetWidth / 2)}px)`;
    });

    play.addEventListener('click', () => {
      audioPlaying = audio;
      currentPlayer = audioPlayer;
      
      audio.volume = 1;
      audio.play();
      audioPlayer.classList.remove('is-paused');
      audioPlayer.classList.add('is-playing');
    });

    pause.addEventListener('click', () => {
      audio.pause();
      audioPlayer.classList.remove('is-playing');
      audioPlayer.classList.add('is-paused');
    });

    audio.ontimeupdate = () => {
      const position = audio.currentTime / audio.duration;
      indicator.style.backgroundColor = audioPlayer.dataset.color;
      indicator.style.transform = `scale(${position}, 1)`;
    }

    audio.onended = () => {
      indicator.style.transform = `scale(0, 1)`;
      project.resetAudio();
    }
  }
});