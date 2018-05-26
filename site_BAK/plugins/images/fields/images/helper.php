<?php 
  function imagesTranslation($string) {
    
    $imagesTranslations = require __DIR__ . DS . 'translations.php';
    $language = substr( site()->user()->language(), 0, 2 );
    if (!array_key_exists($language, $imagesTranslations)) {
      $language = 'en';
    }
    $imagesTranslation = $imagesTranslations[$language];
    
    if(array_key_exists($string, $imagesTranslation)) {
      $string = $imagesTranslation[$string];
    }
    return $string;
    
  }