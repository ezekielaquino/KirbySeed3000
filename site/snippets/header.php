<?php $link = $type === 'design' ? 'sound' : 'design' ?>

<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <!-- Compiled from source/stylus/style.css -->
  <?= css('assets/css/style.css') ?>

</head>
<body>
  <header class="header">
    <div class="header-title">
      <h1><?= $site->title()->html() ?></h1>
      <button class="header-toggle">Information</button>
    </div>

    <a href="/<?= $link ?>"><?= $link ?></a>
  </header>

  <div class="information">
    <?php
      $about = page('about');
      $aboutsections = $about->builder()->toStructure();
    ?>


    <div class="information__contact">
      <h2>
        <?= $about->contacttitle() ?>
      </h2>

      <p>
        <?= $about->contact()->kirbytext() ?>
      </p>
    </div>

    <div class="information__sections">
      <div class="information__section js-infoAbout">
        <h2>
          <?= $about->abouttitle() ?>
        </h2>

        <p>
          <?= $about->about()->kirbytext() ?>
        </p>
      </div>

      <?php foreach($aboutsections as $section): ?>
        <div class="information__section">
          <h2>
            <?= $section->title() ?>
          </h2>

          <p>
            <?= $section->content()->kirbytext() ?>
          </p>
        </div>
      <?php endforeach ?>
    </div>
  </div>
