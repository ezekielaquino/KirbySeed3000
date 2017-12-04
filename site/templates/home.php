<?php snippet('header') ?>
<?php $projects = page('projects')->children()->visible(); ?>
  <main>

    <?php foreach($projects as $project): ?>
      <section class="project" id="<?= $project->slug() ?>">
        <div class="slide slide--cover">
          <?= $project->title() ?>
        </div>


      </section>
    <?php endforeach?>

  </main>

<?php snippet('footer') ?>