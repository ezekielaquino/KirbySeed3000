<?php if ($data->video()->isNotEmpty()): ?>
  <?php $video = $project->video($data->video())->url(); ?>

  <?php if($data->placeholder()->isNotEmpty()): ?>
    <?php $poster = $data->placeholder()->toFile()->url(); ?>
  <?php else: ?>
    <?php $poster = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' ?>
  <?php endif ?>

  <div class="slide slide--default">
    <figure class="slide-content">
      <video class="preload" data-src="<?= $video ?>" poster="<?= $poster ?>" data-autoplay loop playsinline muted></video>
    </figure>
  </div>
<?php endif ?>