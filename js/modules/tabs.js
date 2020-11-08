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

export default tabs;