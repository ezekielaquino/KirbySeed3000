<?php $projects = page($type)->children()->visible(); ?>

<main>
  <?php foreach($projects as $project): ?>
    <section class="project" data-type="<?= $type ?>" id="<?= $project->slug() ?>">
      <?php
        $slides = $project->builder()->toStructure();
        $length = count($slides);
        $count = +$length - 1; ?>

      <div class="project-info">
        <header class="project-info__header">
          <h2 class="project-info__title">
            <?= $project->title() ?>
          </h2>

          <h3 class="project-info__intro">
            <?= $project->intro() ?>
          </h3>

          <?php if($type !== 'sound'): ?>
            <button class="project-info__toggle">Info</button>
          <?php endif ?>
        </header>

        <?php if($type !== 'sound'): ?>
          <div class="project-info__panel">
            <div class="project-info__description">
              <?= $project->text()->kirbytext() ?>
            </div>

            <div class="project-info__meta">
              <?= $project->meta()->kirbytext() ?>
            </div>
          </div>
        <?php endif ?>
      </div>

      <div class="project-slides" style="width: <?= +$length * 100 ?>vw" data-slides="<?= $count ?>">
        <?php $index = 0; ?>
        <?php foreach($slides as $slide): ?>
          <?php $isCover = $index === 0 ? true : false; ?>

          <?php snippet('slides/' . $slide->_fieldset(), array('isCover' => $isCover, 'project' => $project, 'data' => $slide)) ?>
          <?php $index++; ?>
        <?php endforeach ?>
      </div>
    </section>
  <?php endforeach ?>
</main>