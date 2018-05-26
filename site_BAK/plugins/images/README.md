# Kirby Images <a href="https://www.paypal.me/medienbaecker"><img width="99" src="http://www.medienbaecker.com/beer.png" alt="Buy me a beer" align="right"></a>

The `images` field can be used to edit groups of images very easily by drag-and-drop. Simply take an image from the sidebar and drop it on the field. You can also reorder images inside the field, not linked to the regular order.

## Installation

Put the `kirby-images` folder into your `site/plugins` folder and rename it to `images`.

## Example

![Preview](https://user-images.githubusercontent.com/7975568/29234770-9f686324-7ef9-11e7-8c37-f53e2848c846.gif)

```yaml
slideshow:
  label:       Slideshow
  type:        images
```

## Template

To display an image slideshow with the selected images you can use a code like this:

```php
<div class="slider">
<?php foreach($page->slideshow()->yaml() as $image): ?>   
  <?php if($image = $page->image($image)): ?>
    <?= $image->crop(1200,500)->html(); ?>  		    
  <?php endif ?>
<?php endforeach; ?>
</div>
```

## Drag between multiple instances

You can even move images between multiple instances of the `images` field like this:

![Drag](https://cloud.githubusercontent.com/assets/11269635/25747374/940bc790-31a7-11e7-8dcd-e70038dac2cc.gif)

## Options

### Limit the number of images

As of Images 1.0.4 you can limit the number of images:

```yaml
slideshow:
  label:       Slideshow
  type:        images
  limit:       4
```