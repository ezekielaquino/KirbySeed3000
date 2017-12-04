<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

/* make sure to delete this after install */
c::set('panel.install', true);
/* don't delete license! Fill it in when you deploy */
c::set('license', 'put your license key here');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/


c::set('routes', array(
  array(
    'pattern' => array('', '/'),
    'action' => function() {
      return go('/design');
    }
  ),
  array(
    'pattern' => array(
      'design',
      'design/(:any)'
    ),
    'action' => function() {
      return page('/design');
    }
  ),
  array(
    'pattern' => array(
      'sound',
      'sound/(:any)'
    ),
    'action' => function() {
      return page('/about');
    }
  ),
));