
import '../common/common';

// import './bs5-lightbox.scss';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/modal';

import Lightbox from './bs5-lightbox';
import $ from 'jquery';

$(() => {
  for (const el of document.querySelectorAll('a[data-toggle="lightbox"]')) {
    el.addEventListener('click', Lightbox.initialize)
  }
});