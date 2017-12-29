<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $audio = $project->file($data->audio())->url();
    $image = $project->image($data->image());
    $bgColor = $image->color();
    $color = $data->color();
  ?>

  <div class="slide slide--default slide--cover style="<?= $bgColor ?>">
    <figure class="slide-content">
      <?= $image ?>
    </figure>

    <div class="audio-player js-audio" data-src="<?= $audio ?>" data-color="<?= $color ?>">
      <span class="audio-player__track js-audioTrack">
        <span></span>
      </span>

      <button class="audio-player__play js-audioPlay">Play</button>
      <button class="audio-player__pause js-audioPause">Pause</button>
    </div>
  </div>
<?php endif ?>