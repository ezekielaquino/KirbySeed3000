<?php $projects = page($type)->children()->visible(); ?>

<main id="projects">
  <?php if($type === 'sound'): ?>
    <section class="section section--intro project" data-type="intro" data-project="intro" style="cursor: default;" data-cover="light">
      <div class="slide">
        <div class="slide-content">
          <?php $intro = $pages->find('sound')->intro()->kirbytext() ?>
          <?= $intro ?>
        </div>
      </div>
    </section>
  <?php endif ?>

  <?php foreach($projects as $project): ?>
    <?php
      $slides = $project->builder()->toStructure();
      $textslide = $project->text()->toStructure();
      $length = count($slides) + +1;
    ?>

  <section class="section project" data-type="<?= $type ?>" data-project="<?= $project->slug() ?>" data-cover="<?php if($project->covertheme()->bool()): ?>light<?php else: ?>dark<?php endif ?>">
    <div class="project-info">
        <header class="project-info__header">
          <div class="title-wrap">
            <small class="project-info__location">
              <span class="js-slideLocation">1</span> of <?= $length - 1 ?>
            </small>
            <h2 class="project-info__title js-caption">
              <?= $project->title() ?>
            </h2>
          </div>

          <h3 class="project-info__intro">
            <?= $project->intro() ?>
          </h3>

          <button class="project-info__toggle js-btnInfoToggle">Details</button>
        </header>

        <div class="project-info__panel">
          <button class="project-info__close js-btnInfoToggle">
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="27px" height="27px" viewBox="0 0 27 27"><path fill="#000" fill-rule="evenodd" d="M13.5 11L2.5 0 0 2.5 11 13.5 0.125 24.375 2.625 27 13.5 16 24.5 27 27 24.375 16.125 13.5 27 2.5 24.5 0z"/></svg>
          </button>

          <div class="scroll-wrap">
            <div class="project-info__description">
              <?= $project->text()->kirbytext() ?>
            </div>

            <div class="project-info__meta">
              <?= $project->meta()->kirbytext() ?>
            </div>
          </div>
        </div>
      </div>

    <?php if ($project->file($project->cover())->type() === 'video'): ?>
      <?php if($project->covervideobgcolor()): ?>
        <?php $bgcolor = $project->covervideobgcolor() ?>
      <?php else: ?>
        <?php $bgcolor = '#000000' ?>
      <?php endif ?>
      <div class="slide slide--cover slide--cover-video" style="background-color: <?= $bgcolor ?>" data-type="video">
        <figure class="slide-content">
          <?php if($project->covervideoposter()->isNotEmpty()): ?>
            <?php $poster = $project->covervideoposter(); ?>
          <?php else: ?>
            <?php $poster = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; ?>
          <?php endif ?>
          <video class="cover-video preload lazyload" poster="<?= $poster ?>" data-src="<?= $project->cover()->toFile()->url() ?>" playsinline data-autoplay muted loop></video>
        </figure>
      </div>
    <?php else: ?>
      <div class="slide slide--cover" style="background-color: <?= $project->image($project->cover())->color() ?>">
        <figure class="slide-content">
          <?php echo img($project->cover()->toFile(), array(
            "alt" => $project->title(),
            "widths" => [800, 1280, 1920],
            "class" => "lazyload",
            "lazy" => true,
            "attr" => array(
              "src" => "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            )
          )) ?>
        </figure>
      </div>
    <?php endif ?>


    <?php $index = 0; ?>
    <?php foreach($slides as $slide): ?>
      <?php snippet('slides/' . $slide->_fieldset(), array('project' => $project, 'data' => $slide)) ?>
      <?php $index++; ?>
    <?php endforeach ?>

    <?php if($type === 'sound'): ?>
      <?php if($project->sound()->isNotEmpty()): ?>
        <div class="audio-player js-audio" data-src="<?= $project->sound()->toFile()->url() ?>" data-color="<?= $project->color() ?>">
          <span class="audio-player__track js-audioTrack">
            <span class="indicator"></span>
            <span class="tooltip">Loading</span>
          </span>

          <button class="audio-player__play js-audioPlay">Play</button>
          <button class="audio-player__pause js-audioPause">Pause</button>
        </div>
      <?php endif ?>
    <?php endif ?>
  </section>
  <?php endforeach ?>
</main>