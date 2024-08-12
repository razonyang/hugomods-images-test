import './main.scss';

import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/offcanvas';
// import Popover from 'bootstrap/js/dist/popover';
// import ScrollSpy from 'bootstrap/js/dist/scrollspy';
// import Tab from 'bootstrap/js/dist/tab';
// import Toast from 'bootstrap/js/dist/toast';
// import Tooltip from 'bootstrap/js/dist/tooltip';

import $ from 'jquery';

(<any>window).$ = (<any>window).jquery = $;

import AOS from 'aos';
import 'aos/dist/aos.css';

function aos_init() {
  AOS.init({
    duration: 500,
    easing: "ease-in-out",
    once: true,
    mirror: false
  });
}
window.addEventListener('load', () => {
  aos_init();
});


$(() => {
  /**
   * Back to top button
   */
  let backtotop = $('#back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.addClass('active');
      } else {
        backtotop.removeClass('active');
      }
    }
    $(window).on('load', toggleBacktotop);
    $(document).on('scroll', toggleBacktotop);
  }
});
