<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $image = $project->image($data->image());
  ?>

  <div class="slide slide--default">
    <figure class="slide-content">
      <?= $image ?>
    </figure>
  </div>
<?php endif ?>