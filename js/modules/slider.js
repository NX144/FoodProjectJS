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

export default slider;