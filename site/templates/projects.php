<?php snippet('header') ?>
<?php $projects = page('projects')->children()->visible(); ?>
  <main>

    <?php foreach($projects as $project): ?>
      <section class="project" data-type="design" id="<?= $project->slug() ?>">
        <div class="project-slides" style="width: 600vw">
          <div class="slide slide--cover">
            <header class="cover-info">
              <?= $project->title() ?>
            </header>
          </div>

          <?php foreach(range(1, 5) as $slide): ?>
            <div class="slide">
              <span><?= $slide ?></span>
            </div>
          <?php endforeach ?>
        </div>
      </section>
    <?php endforeach?>

  </main>

<?php snippet('footer') ?>