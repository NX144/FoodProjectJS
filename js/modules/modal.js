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

export default modal;
export {modalShow};
export {modalClose};