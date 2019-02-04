import $ from 'jquery';
import Swiper from 'swiper';

$('.swiper.simple').each(function(){
    new Swiper($(this), {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: $(this).attr('column'),
        autoplay: true,
        loop: true
    });
});

import {MDCTextField} from '@material/textfield';

const textField = new MDCTextField(document.querySelector('.mdc-text-field'));