<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $image = $project->image($data->image());
    $bgColor = $image->color();
    $color = $data->color();
  ?>

  <div class="slide slide--default slide--cover style="<?= $bgColor ?>">
    <figure class="slide-content">
      <?= $image ?>
    </figure>
  </div>
<?php endif ?>