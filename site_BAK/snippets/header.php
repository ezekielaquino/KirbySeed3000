<?php
  $link = $type === 'design' ? 'sound' : 'design';
  $linkText = $type === 'design' ? 'sound' : 'graphic design';
  $IS_MOBILE = detect()->isMobile() || detect()->isTablet();
?>

<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

  <title><?= $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <?= css('assets/css/style.css') ?>
</head>

<body data-mobile="<?php if ($IS_MOBILE): ?>true<?php endif ?>">
  <div class="header-title">
    <h1><?= $site->title()->html() ?></h1>
    <button class="js-infoToggle">Information</button>
    <button class="js-infoClose">
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="27px" height="27px" viewBox="0 0 27 27"><path fill="#000" fill-rule="evenodd" d="M13.5 11L2.5 0 0 2.5 11 13.5 0.125 24.375 2.625 27 13.5 16 24.5 27 27 24.375 16.125 13.5 27 2.5 24.5 0z"/></svg>
    </button>
  </div>

  <a class="header-nav" href="<?= $site->url() ?>/<?= $link ?>">
    <?= $linkText ?>
  </a>

  <div class="information">
    <?php
      $about = page('about');
      $aboutsections = $about->builder()->toStructure();
    ?>

    <div class="information__contact">
      <h2>
        <?= $about->contacttitle() ?>
      </h2>

      <?= $about->contact()->kirbytext() ?>
    </div>

    <div class="information__wrap">
      <div class="information__sections">
        <div class="information__section js-infoAbout">
          <h2>
            <?= $about->abouttitle() ?>
          </h2>

          <?= $about->about()->kirbytext() ?>
        </div>

        <?php foreach($aboutsections as $section): ?>
          <div class="information__section">
            <h2>
              <?= $section->title() ?>
            </h2>

            <?= $section->content()->kirbytext() ?>
          </div>
        <?php endforeach ?>

        <div class="information__section">
          <h2>
            Credits
          </h2>

          <div class="information__credits">
            <?= $about->credits()->kirbytext() ?>
          </div>
        </div>
      </div>
    </div>
  </div>
