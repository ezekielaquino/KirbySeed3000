<?php
  $data = array();

  foreach (page('projects')->children()->visible() as $project) {
    $images = array();

    foreach ($project->images() as $image) {
      array_push($images, $image->url());
    }

    $d = array(
      'title' => $project->title()->value(),
      'text' => $project->text()->kirbytext()->value(),
      'images' => $images
    );

    array_push($data, $d);
  }

  echo json_encode($data);
?>