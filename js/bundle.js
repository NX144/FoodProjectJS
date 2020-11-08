/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
           elem.classList.remove(activeClass);
           if(elem.getAttribute('id') === localStorage.getItem('sex')) {
               elem.classList.add(activeClass);
           }
           if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
               elem.classList.add(activeClass);
           }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        }
        if(sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { // Вместо Event можно поставить this(ф-ия)
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
;

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentElement, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 77;
            this.parent = document.querySelector(parentElement);
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const newCard = document.createElement('div');
            if(this.classes.length === 0) { // Пуст ли массив с передаваемыми классами,если чё по-умолчанию назначаем
                this.elemClass = "menu__item"; // Поместили в название класса в переменную для удобства
                newCard.classList.add(this.elemClass); // Параметр Rest по умолчанию(передаём класс по умолчанию)
            } else if(this.classes.indexOf('menu__item') == '-1') {
                this.elemClass = "menu__item";
                newCard.classList.add(this.elemClass);
                this.classes.forEach(className => newCard.classList.add(className));
            } else {
                this.classes.forEach(className => newCard.classList.add(className));
            }

            newCard.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                <div class="menu__item-descr">Меню "${this.title}" - ${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(newCard);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({src, alt, title, descr, price}) => { // Диструктуризация объекта
                new MenuCard(
                    src, alt, title, descr, price,
                    ".menu .container",
                    'menu__item'
                ).render();
            });
        });

    // axios.get("http://localhost:3000/menu") // Работает как ф-ия выше(getResource)
    //     .then(data => {
    //        data.data.forEach(({src, alt, title, descr, price}) => { // Диструктуризация объекта
    //             new MenuCard(
    //                 src, alt, title, descr, price,
    //                 ".menu .container",
    //                 'menu__item'
    //             ).render();
    //         });
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
;


function forms(formSelector, timerModal) {
        // Forms

        const forms = document.querySelectorAll(formSelector);

        const answers = {
            loading: "img/form/spinner.svg",
            success: "Спасибо! Наш менеджер скоро свяжется с вами!",
            failure: "Что-то пошло не так, попробуйте ещё раз.."
        };
        
        forms.forEach(item => {
            bindPostData(item);
        });
    
        function bindPostData(form) { // Тут работаем с FormData
            form.addEventListener('submit', (event) => {
                event.preventDefault();
    
                let divAnswer = document.createElement('img');
                divAnswer.classList.add('status');
                divAnswer.src = answers.loading;
                divAnswer.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', divAnswer);
    
    
                let formData = new FormData(form); // Берём данные из формы на которой произошла отправка(submit)
    
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
                (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data); // То что лежит в массиве $_POST в файле PHP
                    showThanksModal(answers.success);
                    document.querySelector('.status').remove();
                })
                .catch(() => {
                    showThanksModal(answers.failure);
                })
                .finally(() => {
                    form.reset(); // Очищаем форму от всякого, уже ненужного, дерьма
                });
            });
        }
    
        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');
    
            prevModalDialog.classList.add('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalShow)('.modal', timerModal);
    
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close >&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
    
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
            }, 4000);
        }
        fetch('http://localhost:3000/requests')
            .then(data => data.json())
            .then(data => console.log(data));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export modalClose [provided] [no usage info] [missing usage info prevents renaming] */
/*! export modalShow [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "modalShow": () => /* binding */ modalShow,
/* harmony export */   "modalClose": () => /* binding */ modalClose
/* harmony export */ });
function modalShow(modalSelector, timerModal) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(timerModal) {
        clearInterval(timerModal);
    }
}
function modalClose(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    // modalWindow.classList.remove('show');
    // modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(modalBtnTrigger, modalSelector, timerModal) {
    //Modal Window

    const modalBtn = document.querySelectorAll(modalBtnTrigger),
          modalWindow = document.querySelector(modalSelector);

    modalBtn.forEach((btn) => {
        btn.addEventListener('click', () => modalShow(modalSelector, timerModal));
    });

    modalWindow.addEventListener('click', function(event) {
        if(event.target === modalWindow || event.target.getAttribute('data-close') == "") {
            modalClose(modalSelector);
        }
    });

    document.addEventListener('keydown', function(event) {
        if(event.code === "Escape" && modalWindow.classList.contains('show')) {
            modalClose(modalSelector);
        }
    });

    function showModalByScroll() {
        if(this.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalShow(modalSelector, timerModal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    let slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prevSlide = document.querySelector(prevArrow),
        nextSlide = document.querySelector(nextArrow),
        currentSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        offset = 0,
        count = 1;

    if(slides.length < 10) {
        totalSlides.textContent = "0" + slides.length;
        currentSlide.textContent = "0" + count;
    } else {
        totalSlides.textContent = String(slides.length); // Шоб на тип данных не ругался
        currentSlide.textContent = count;
    }

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if(i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function setCurrentSlide() {
        if(count < 10) {
            currentSlide.textContent = "0" + count;
        } else {
            currentSlide.textContent = count;
        }
    }

    function setDots() {
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[count - 1].style.opacity = "1";
    }

    nextSlide.addEventListener('click', () => {
        if(offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(count == slides.length) {
            count = 1;
        } else {
            count++;
        }
        setCurrentSlide();
        setDots();
    });

    prevSlide.addEventListener('click', () => {
        if(offset <= 0) {
            offset = +width.replace(/\D/g, '') * (slides.length - 1)
        } else {
            offset -= +width.replace(/\D/g, '')
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(count == 1) {
            count = slides.length;
        } else {
            count--;
        }
        setCurrentSlide();
        setDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            count = slideTo;

            offset = +width.replace(/\D/g, '') * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            setCurrentSlide();
            setDots();
        });
    });

    // showSlide(count);
    //
    // if(slides.length < 10) {
    //     totalSlides.textContent = "0" + slides.length;
    // } else {
    //     totalSlides.textContent = String(slides.length); // Шоб на тип данных не ругался
    // }
    //
    // function showSlide(n) {
    //     if(n > slides.length) {
    //         count = 1;
    //     }
    //     if(n < 1) {
    //         count = slides.length;
    //     }
    //
    //     slides.forEach(item => item.style.display = "none");
    //
    //
    //     slides[count - 1].style.display = "block";
    //     if(count < 10) {
    //         currentSlide.textContent = "0" + count;
    //     } else {
    //         currentSlide.textContent = count;
    //     }
    // }
    //
    // function plusSlides(n) {
    //     showSlide(count += n);
    // }
    //
    // prevSlide.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // nextSlide.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    // localStorage.setItem('number', 5);
    // localStorage.setItem('count', 9);
    // console.log(localStorage.getItem('number'));
    // console.log(localStorage.getItem('count'));
    // console.log(`LocalStorage: ${localStorage}`);
    // localStorage.removeItem('number');
    // console.log(localStorage.getItem('number'));
    // console.log(localStorage.getItem('count'));
    // console.log(`LocalStorage: ${localStorage}`);
    // localStorage.clear();
    // console.log(localStorage.getItem('number'));
    // console.log(localStorage.getItem('count'));
    // console.log(`LocalStorage: ${localStorage}`);


    //new RegExp('pattern', 'flags');

    // let names = prompt('Введите ваше имя:'),
    //     reg = /n/;
    // console.log(names.search(reg));

    // let names = prompt('Введите ваше имя:'),
    //     reg = /n/ig; // i - пофих на регистр, g - несколько вхождений, m - многострочн режим
    // console.log(names.match(reg));

    // let names = prompt('Введите ваше имя:'),
    //     reg = /\./g; // Экранируем точку иначе точка это взять все символы
    // console.log(names.replace(reg, "*"));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // This Tabs

    const tabs = document.querySelectorAll(tabsSelector), // Табы, при клике на которые будет менятся контент
        tabsContent = document.querySelectorAll(tabsContentSelector), // Блоки с контентом
        tabsParent = document.querySelector(tabsParentSelector); // Родитель tabs

    function hideTabContent() {
        tabsContent.forEach(function(item) {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(function(item) {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { // По-умолчанию показываем 0-ой индекс(первый элемент)
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        if(event.target && event.target.classList.contains(tabsSelector.slice(1))) { 
            // .slice(1) Удаляем первый символ(точку), потому что здесь мы и так указываем что будет класс
            tabs.forEach((item, i) => {
                if(event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(classTimer, deadline) {
    // Timer

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            if(t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '00';
                hours.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerHTML = '00';
            } else {
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            }

        }
    }

    setClock(classTimer, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
;








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

    const timerModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.modalShow)('.modal', timerModal), 40000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', timerModal);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
        container : '.offer__slider',
        wrapper : '.offer__slider-wrapper',
        field : '.offer__slider-inner',
        slide : '.offer__slide',
        nextArrow : '.offer__slider-next',
        prevArrow : '.offer__slider-prev',
        totalCounter : '#total',
        currentCounter : '#current'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__.default)('.timer', '2020-12-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__.default)('form', timerModal);

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export getResource [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
const postData = async (url, data) => {
    let result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await result.json(); // Возвращаем Promise чтобы использовать цепочку then
};
const getResource = async (url) => {
    let result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        // Если запрос не окей, то выкидываем на страницу ошибку
    }

    return await result.json(); // Возвращаем Promise чтобы использовать цепочку then
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map