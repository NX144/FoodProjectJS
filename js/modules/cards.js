import {getResource} from '../services/services';

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

    getResource("http://localhost:3000/menu")
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

export default cards;