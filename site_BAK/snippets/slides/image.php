<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $image = $project->image($data->image());
  ?>

  <div class="slide slide--default">
    <figure class="slide-content" style="background-color: <?= $image->color() ?>">
      <?php echo img($image, array(
        "alt" => $project->title(),
        "widths" => [800, 1280, 1920],
        "class" => "lazyload",
        "lazy" => true,
        "attr" => array(
          "srcset" => "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          "src" => "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        )
      )) ?>
    </figure>
  </div>
<?php endif ?>