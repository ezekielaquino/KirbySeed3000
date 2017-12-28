<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $modifier = $isCover ? 'slide--cover' : '';
    $image = $project->image($data->image());
    $bgColor = $isCover ? "background-color:" . $image->color() : '';
  ?>

  <div class="slide slide--default <?= $modifier ?>" style="<?= $bgColor ?>">
    <figure class="slide-content">
      <?= $image ?>
    </figure>
  </div>
<?php endif ?>