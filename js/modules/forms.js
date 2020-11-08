import {modalShow, modalClose} from './modal';
import {postData} from '../services/services';

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
    
                postData('http://localhost:3000/requests', json)
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
            modalShow('.modal', timerModal);
    
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
                modalClose('.modal');
            }, 4000);
        }
        fetch('http://localhost:3000/requests')
            .then(data => data.json())
            .then(data => console.log(data));
}

export default forms;