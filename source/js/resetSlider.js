/*!
 * fullpage.js Reset Sliders Extension 1.0.2
 * https://github.com/alvarotrigo/fullPage.js
 *
 * This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
!function(e){window.fp_resetSlidersExtension=function(){var n=this,i=e.fn.fullpage.getFullpageData(),t=i.internals,r="fullpage-wrapper",l="."+r,a="fp-section",s="."+a,o="fp-slide",c="."+o;n.apply=function(n){if(!n.localIsResizing){var i=e(s).eq(n.leavingSection-1);i.find(c).length&&(e(l).trigger("onResetSliders",[i]),t.silentLandscapeScroll(i.find(c).first(),"internal"),e(l).trigger("onEndResetSliders",[i]))}},n.c=t.c;var d=n["common".charAt(0)];return"complete"===document.readyState&&d("resetSliders"),e(window).on("load",function(){d("resetSliders")}),n}}(jQuery);