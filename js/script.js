import tabs from './modules/tabs';
import calc from './modules/calc';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import {modalShow} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

    /* 
        -----------------------------------------------------------------------------------------------------
        Создали таймер в главном JS файле для того чтобы удобно с ним взаимодействовать.
        Эти все махинации с модальным окном я делал для того чтобы можно было более комфортно манипулировать
        нашей модалкой и для того чтобы к ней был доступ в других файлах(в нашем случае forms.js).
        Но не для того чтобы пытаться передавать в аргументах другие модальные окна
        (которых на данный момент нет) и пытаться взаимодействовать с ними. Значит.. ещё раз,
        это всё я сделал для более удобной манипуляции с нашим единственным модальным окном,
        а также чтобы и в других файлах был доступ к этому модальному окну
        -----------------------------------------------------------------------------------------------------
    */

    const timerModal = setTimeout(() => modalShow('.modal', timerModal), 40000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    modal('[data-modal]', '.modal', timerModal);
    slider({
        container : '.offer__slider',
        wrapper : '.offer__slider-wrapper',
        field : '.offer__slider-inner',
        slide : '.offer__slide',
        nextArrow : '.offer__slider-next',
        prevArrow : '.offer__slider-prev',
        totalCounter : '#total',
        currentCounter : '#current'
    });
    timer('.timer', '2020-12-31');
    cards();
    forms('form', timerModal);

});