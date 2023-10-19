export default class OpenTabs {
    constructor(container) {
        this.container = container;
        this.tabLinks = document.querySelectorAll(".tab-list__item");
        this.tabContents = document.querySelectorAll(".select-list");

        this.tabClickHandler = this.tabClickHandler.bind(this);
    }

    init() {
        this.tabLinks.forEach((element) => {
            element.addEventListener("click", this.tabClickHandler);
        });
        this.container.addEventListener("click", this.testHandler)
    }

    tabClickHandler(evt) {
        const btnTarget = evt.currentTarget;
        const idTab = btnTarget.dataset.item;

        this.tabContents.forEach(function (item) {
            item.classList.remove("select-list--active");
        });

        this.tabLinks.forEach(function (item) {
            item.classList.remove("tab-list__item--active");
        });

        document.querySelector(`#${idTab}`).classList.add("select-list--active");

        btnTarget.classList.add("tab-list__item--active");
    }
}