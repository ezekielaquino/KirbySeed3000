<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $audio = $project->file($data->audio())->url();
    $image = $project->image($data->image());
    $bgColor = $isCover ? "background-color:" . $image->color() : '';
  ?>

  <div class="slide slide--default slide--cover style="<?= $bgColor ?>">
    <figure class="slide-content">
      <?= $image ?>
    </figure>

    <div class="audio-player">
      <audio controls>
        <source src="<?= $audio ?>" type="audio/mp3">
      </audio>
    </div>
  </div>
<?php endif ?>