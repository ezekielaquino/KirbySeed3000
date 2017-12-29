<?php $projects = page($type)->children()->visible(); ?>

<main>
  <?php foreach($projects as $project): ?>
    <section class="project" data-type="<?= $type ?>" id="<?= $project->slug() ?>">
      <?php
        $slides = $project->builder()->toStructure();
        $textslide = $project->text()->toStructure();
        $textcount = $type === 'sound' ? count($textslide) : 0;
        $length = count($slides) + +$textcount;
        $count = +$length - 1; ?>

      <div class="project-info">
        <header class="project-info__header">
          <h2 class="project-info__title">
            <?= $project->title() ?>
          </h2>

          <h3 class="project-info__intro">
            <?= $project->intro() ?>
          </h3>

          <?php if($type === 'sound'): ?>
            <p class="project-info__location">
              <span class="js-projectLoc">1</span> of <?= $length ?>
            </p>
          <?php endif ?>

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

        <?php if($type === 'sound'): ?>
          <?php
            $pages = $project->text()->toStructure();
            $index = 1;
          ?>

          <?php foreach($pages as $page): ?>
            <div class="slide slide--default">
              <figure class="slide-content">
                  <div class="slide-content__header">
                    <?= $index ?>/<?= count($textslide) ?>
                  </div>

                  <?php $size = $page->size()->bool() ? 'is-small' : '' ?>
                  <div class="slide-content__copy <?= $size ?>">
                    <?= $page->page()->kirbytext() ?>
                  </div>
                  <?php $index++ ?>
              </figure>
            </div>
          <?php endforeach ?>
        <?php endif ?>
      </div>
    </section>
  <?php endforeach ?>
</main>