import OpenTabs from "./openTabs.js";

const dropdownButton = document.querySelector(".dropdown__dashboard");
const dropdown = document.querySelector(".dropdown");
const checkoutOptions = [];
const options = document.querySelectorAll(".option");
let valueOptionCheck = 0;
const countMarker = document.querySelector(".dashboard__marker");
const panelOptions = document.querySelector(".select-panel");
const optionInputs = document.querySelectorAll(".option__input");

function dropdownButtonClickHandler() {
    dropdown.classList.toggle("dropdown--open");
}

dropdownButton.addEventListener('click', dropdownButtonClickHandler);

const tabs = new OpenTabs(dropdown);
tabs.init();

options.forEach((option) => {
    option.addEventListener('change', optionClickHandler);
});

function toggleClass(array) {

    if (array.length) {
        countMarker.classList.add("dashboard__marker--active");
        panelOptions.classList.add("select-panel--active");
        dropdown.classList.add("dropdown--active");
    } else {
        countMarker.classList.remove("dashboard__marker--active");
        panelOptions.classList.remove("select-panel--active");
        dropdown.classList.remove("dropdown--active");
    }
}

function deleteOption(array, item) {
    const id = item.querySelector("input").id;
    const index = array.findIndex(option => option.querySelector('input').id == id);

    deleteOptionPanel(array, item)
    array.splice(index, 1);
}

function createOptionPanel(option, box) {

    const value = option.querySelector("input").value;
    const id = option.querySelector("input").id;
    const html = `<li class="select-panel__item" data-option="${id}">
    <span class="select-panel__text">${value}</span>
    <button class="select-panel__close">
      <svg class="select-panel__svg" width="16" height="16">
        <use xlink:href="../img/icons/icons.svg#close"></use>
      </svg>
    </button>
  </li>`
    return box.insertAdjacentHTML("beforeend", html);
}

function deleteOptionPanel(arrayOption, item) {
    const id = item.querySelector("input").id;
    const index = arrayOption.findIndex(option => option.querySelector('input').id == id);
    const arrayOptionPanel = panelOptions.querySelectorAll(".select-panel__item");
    arrayOptionPanel[index].remove();
}

function optionClickHandler(evt) {

    const item = evt.currentTarget;
    const itemId = item.querySelector('input').id;
    const isIdInput = checkoutOptions.find(item => item.querySelector('input').id == itemId);

    if (!isIdInput) {
        checkoutOptions.push(item);
        toggleClass(checkoutOptions);
        createOptionPanel(item, panelOptions);
        initHandlerOptionPanel();
        ++valueOptionCheck;
        countMarker.textContent = valueOptionCheck;
    } else {

        if (checkoutOptions.length) {
            valueOptionCheck = valueOptionCheck - 1;
            countMarker.textContent = valueOptionCheck;

            deleteOption(checkoutOptions, item);
            initHandlerOptionPanel();
            toggleClass(checkoutOptions);
        }
    }
}

function optionPanelClickHandler(evt) {
    const item = evt.currentTarget;
    const idParent = item.parentElement.dataset.option;
    const index = checkoutOptions.findIndex(option => option.querySelector('input').id == idParent);

    const input = Array.from(optionInputs).find(option => option.id === idParent);
    input.checked = false;

    checkoutOptions.splice(index, 1);
    toggleClass(checkoutOptions);
    valueOptionCheck = valueOptionCheck - 1;
    countMarker.textContent = valueOptionCheck;

    item.parentElement.remove();
}

function initHandlerOptionPanel() {
    const options = panelOptions.querySelectorAll(".select-panel__item button");

    options.forEach((option) => {
        option.addEventListener('click', optionPanelClickHandler);
    });
}







