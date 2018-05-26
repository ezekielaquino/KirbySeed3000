<?php if ($data->image()->isNotEmpty()): ?>
  <?php
    $image = $project->image($data->image());
    $thumb = thumb($image, array('width' => 300, 'blur' => true));

    if ($data->caption()->isNotEmpty()) {
      $caption = $data->caption()->html();
    } else {
      $caption = $project->title()->html();
    }
  ?>

  <div class="slide slide--default" data-caption="<?= $caption ?>">
    <figure class="slide-content">
      <?php echo img($image, array(
        "alt" => $data->caption()->html(),	
        "widths" => [450, 800, 1200],
        "class" => "preload",
        "lazy" => true,
        "attr" => array(
          "src" => $thumb->url()
        ),
      )) ?>
    </figure>
  </div>
<?php endif ?>