<?php require_once(__DIR__.DS.'helper.php'); ?>

<?php echo $field->headline() ?>

<?php

  if ($field->value()) {
    $fieldImages = $field->value();
  }
  else {
    $fieldImages = array();
  }
  
  $pageImages = array();
  foreach ($page->images() as $image) {
    $pageImages[] = $image->filename();
  }
  
  foreach ($pageImages as $pageImage) {
    if (in_array($pageImage, $fieldImages)) {
      continue;
    }
    $fieldImages[] = $pageImage;
  }

?>

<div class="imagesgrid" data-api="<?php __($page->url('files')) ?>">
  
  <div class="empty">
    <strong class="no-images"><?= imagesTranslation('nothingAdded') ?></strong>
    <span class="dragdrop-help"><?= imagesTranslation('help') ?></span>
    <img class="tutorial" src="<?= url('assets/plugins/images/images/images.gif') ?>" />
  </div>
    
  <div class="imagesgrid-inner sortable">
      
     <?php
       $valueImages = array();
       foreach($fieldImages as $f):
       $file = $page->image($f);
       if (!$file) continue;
       if(in_array($f, $field->value())) $valueImages[] = $f;
     ?>
     
     <div class="images-item <?php e(in_array($file->filename(), $field->value()), 'selected') ?>" data-image="<?php __($file->filename()) ?>" data-helper="<?php __($file->filename()) ?>">
         <figure title="<?php __($file->filename()) ?>" class="images-figure">
           <a class="images-preview images-preview-is-<?php __($file->type()) ?>" href="<?php __($file->url('edit')) ?>">
             <img src="<?php __($file->crop(400, 266)->url()) ?>" alt="<?php __($file->filename()) ?>">
           </a>
           <figcaption class="images-info">
             <a href="<?php __($file->url('edit')) ?>">
               <span class="images-name cut"><?php __($file->filename()) ?></span>
               <span class="images-meta marginalia cut"><?php __($file->niceSize()) ?></span>
             </a>
           </figcaption>
           <nav class="images-options">
             <a class="btn btn-with-icon" href="<?php __($file->url('edit')) ?>">
               <?php i('pencil', 'left') ?>
             </a><a data-modal class="btn btn-with-icon remove" href="#remove">
               <?php i('minus-circle', 'left') ?>
             </a>
           </nav>
         </figure>
       </div>
       
     <?php endforeach ?>
     
  <div class="add">
    <div class="inner">
    </div>
  </div>
 
  </div>
  
</div>



<?php
  if (count($valueImages) > 1) {
    $valueImages = "- " . implode("\n- ", $valueImages);
  }
  elseif (count($valueImages) == 0) {
    $valueImages = "";
  }
  else {
    $valueImages = $valueImages[0];
  }

?>

<input class="images" type="hidden" name="<?= $field->name() ?>" value="<?= $valueImages ?>">