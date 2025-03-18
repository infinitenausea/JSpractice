'use strict' // Включает строгий режим JavaScript для более надежного кода

// Получение ссылок на элементы DOM для дальнейшего использования
let title = document.getElementsByTagName('h1')[0]; // Заголовок страницы
let startBtn = document.getElementsByClassName('handler_btn')[0]; // Кнопка "Начать расчет"
let resetBtn = document.getElementsByClassName('handler_btn')[1]; // Кнопка "Сбросить"
let buttonPlus = document.querySelector('.screen-btn'); // Кнопка добавления нового экрана
let otherItemsPercent = document.querySelectorAll('.other-items.percent'); // Элементы с процентной оплатой услуг
let otherItemsNumber = document.querySelectorAll('.other-items.number'); // Элементы с фиксированной оплатой услуг
let inputTypeRange = document.querySelector(".rollback input[type='range']"); // Ползунок для указания процента отката
let spanRangeValue = document.querySelector(".rollback span[class='range-value']"); // Отображение значения отката

// Элементы для отображения результатов расчетов
let total = document.getElementsByClassName('total-input')[0]; // Поле стоимости только экранов
let totalCount = document.getElementById('total-count'); // Количество экранов
let totalCountOther = document.getElementById('total-count-other'); // Стоимость дополнительных услуг
let fullTotalCount = document.getElementById('total-full-count'); // Полная стоимость
let fullTotalCountRollback = document.getElementById('total-count-rollback'); // Стоимость с учетом отката

// Получение всех блоков с экранами
let screens = document.querySelectorAll(".screen");

// Элементы для работы с CMS
const cmsCheckbox = document.getElementById('cms-open'); // Чекбокс добавления CMS
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants'); // Блок с вариантами CMS
const cmsSelect = document.getElementById('cms-select'); // Выпадающий список с CMS
const cmsOtherInput = document.querySelector('.hidden-cms-variants .main-controls__input'); // Поле для ввода своего процента CMS

// Основной объект приложения с данными и методами
const appData = {
    title: '', // Заголовок проекта
    screens: [], // Массив для хранения информации о экранах
    screenPrice: 0, // Стоимость экранов
    adaptive: true,
    rollback: 0, // Процент отката
    servicePricesPercent: 0, // Стоимость услуг, рассчитываемых в процентах
    servicePricesNumber: 0, // Стоимость услуг с фиксированной ценой
    fullPrice: 0, // Полная стоимость проекта
    servicePercentPrice: 0, // Стоимость с учетом отката
    servicesPercent: {}, // Объект для хранения процентных услуг
    servicesNumber: {}, // Объект для хранения услуг с фиксированной ценой

    // Инициализация приложения - настройка обработчиков событий
    init: function () {
        this.addTitle(); // Устанавливаем заголовок страницы

        // Добавляем обработчики на кнопки с привязкой контекста this
        startBtn.addEventListener('click', this.start.bind(this));
        resetBtn.addEventListener('click', this.reset.bind(this));
        buttonPlus.addEventListener('click', this.addScreenBlock.bind(this));

        // Проверяем валидность формы при загрузке
        this.checkFormValidity();

        // Добавляем обработчики для проверки валидности при изменении данных
        document.addEventListener('change', this.checkFormValidity.bind(this));
        document.addEventListener('input', this.checkFormValidity.bind(this));

        // Обработчик для изменения значения отката
        inputTypeRange.addEventListener('input', () => {
            this.rollback = +inputTypeRange.value; // Преобразуем в число и сохраняем
            spanRangeValue.textContent = inputTypeRange.value + '%'; // Обновляем отображение

            // Если уже есть расчет, обновляем итоговую сумму
            if (this.fullPrice > 0) {
                this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
                fullTotalCountRollback.value = this.servicePercentPrice;
            }
        });

        // Обработчик для чекбокса CMS - здесь this относится к чекбоксу
        cmsCheckbox.addEventListener('change', function () {
            hiddenCmsVariants.style.display = this.checked ? 'flex' : 'none';
        });

        // Обработчик для выбора CMS - здесь this относится к селекту
        cmsSelect.addEventListener('change', function () {
            cmsOtherInput.style.display = this.value === 'other' ? 'flex' : 'none';

            // Если уже есть расчет, пересчитываем
            if (appData.fullPrice > 0) {
                appData.addPrices();
                appData.showResult();
            }
        });

        // Обработчик для ввода собственного значения CMS - здесь используется стрелочная функция
        document.getElementById('cms-other-input').addEventListener('input', () => {
            if (appData.fullPrice > 0) {
                appData.addPrices();
                appData.showResult();
            }
        });
    },

    // Устанавливает заголовок страницы
    addTitle: function () {
        document.title = title.textContent;
    },

    // Начинает расчет
    start: function () {
        this.addScreens(); // Собираем данные об экранах
        this.addServices(); // Собираем данные о дополнительных услугах
        this.addPrices(); // Рассчитываем цены
        // appData.logger();
        this.showResult(); // Отображаем результаты
        this.disableInputs(); // Блокируем поля ввода

        // Меняем видимость кнопок
        startBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
    },

    // Блокирует поля ввода после выполнения расчета
    disableInputs: function () {
        const textInputs = document.querySelectorAll('input[type=text]');
        textInputs.forEach(input => {
            input.setAttribute('disabled', true); // Блокируем текстовые поля
        });

        const selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
            select.setAttribute('disabled', true); // Блокируем выпадающие списки
        });

        buttonPlus.setAttribute('disabled', true); // Блокируем кнопку добавления экрана
    },

    // Сбрасывает все данные и интерфейс к исходному состоянию
    reset: function () {
        // Обнуляем все данные
        this.screens = [];
        this.screenPrice = 0;
        this.fullPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};

        // Разблокируем и очищаем поля ввода
        const textInputs = document.querySelectorAll('.screen input[type=text]');
        textInputs.forEach(input => {
            input.removeAttribute('disabled');
            input.value = '';
        });

        // Разблокируем и очищаем селекты
        const selectElements = document.querySelectorAll('select');
        selectElements.forEach(select => {
            select.removeAttribute('disabled');
            select.value = '';
        });

        // Разблокируем кнопку добавления экрана
        buttonPlus.removeAttribute('disabled');

        // Удаляем дополнительные блоки экранов, оставляя только первый
        const screenElements = document.querySelectorAll('.screen');
        for (let i = 1; i < screenElements.length; i++) {
            screenElements[i].remove();
        }

        // Очищаем поля с результатами
        totalCount.value = '';
        total.value = '';
        totalCountOther.value = '';
        fullTotalCount.value = '';
        fullTotalCountRollback.value = '';

        // Сбрасываем все чекбоксы
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Сбрасываем блок CMS
        hiddenCmsVariants.style.display = 'none';
        cmsSelect.value = '';
        cmsOtherInput.style.display = 'none';
        document.getElementById('cms-other-input').value = '';

        // Меняем видимость кнопок и блокируем кнопку "Начать расчет"
        resetBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        startBtn.setAttribute('disabled', true);
    },

    // Отображает результаты расчета в интерфейсе
    showResult: function () {
        total.value = this.screenPrice; // Стоимость экранов
        totalCount.value = this.totalScreenCount; // Количество экранов
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber; // Стоимость доп. услуг
        fullTotalCount.value = this.fullPrice; // Полная стоимость
        fullTotalCountRollback.value = this.servicePercentPrice; // Стоимость с учетом отката
    },

    // Собирает данные о экранах из формы
    addScreens: function () {
        // Переопределяет переменную screens (лучше хранить как свойство appData)
        let screens = document.querySelectorAll(".screen");

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent; // Имя типа экрана
            const count = +input.value; // Количество экранов

            // Добавляем информацию о экране в массив
            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * count, // Цена = стоимость типа * количество
                count: count
            });
        });
    },

    // Собирает данные о выбранных дополнительных услугах
    addServices: function () {
        // Обрабатываем услуги с процентной оплатой
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value; // Сохраняем процент
            }
        });

        // Обрабатываем услуги с фиксированной оплатой
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value; // Сохраняем фиксированную сумму
            }
        });
    },

    // Добавляет новый блок экрана
    addScreenBlock: function () {
        const screenElements = document.querySelectorAll(".screen"); // Обновляем список блоков экранов
        const cloneScreen = screens[0].cloneNode(true); // Клонируем первый блок экрана
        // Очищаем значения полей в клонированном элементе
        const select = cloneScreen.querySelector('select');
        const input = cloneScreen.querySelector('input');
        select.value = '';
        input.value = '';

        // Добавляем элемент
        screenElements[screenElements.length - 1].after(cloneScreen);

        this.checkFormValidity(); // Проверяем валидность формы
    },

    // Проверяет валидность формы для активации кнопки "Начать расчет"
    checkFormValidity: function () {
        let isValid = true;

        screens.forEach((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            // Проверяем, выбран ли тип экрана и введено ли положительное количество
            if (select.value === '' || !input.value || +input.value <= 0) {
                isValid = false;
            }
        });

        // Активируем или деактивируем кнопку "Начать расчет" в зависимости от валидности
        if (isValid) {
            startBtn.removeAttribute('disabled');
        } else {
            startBtn.setAttribute('disabled', true);
        }
    },

    // Рассчитывает все цены
    addPrices: function () {
        // Сбрасываем значения для нового расчета
        this.screenPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        let totalScreenCount = 0;

        // Рассчитываем стоимость экранов и их количество
        for (let screen of this.screens) {
            this.screenPrice += screen.price;
            totalScreenCount += screen.count;
        }

        // Рассчитываем стоимость услуг с фиксированной оплатой
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        // Рассчитываем стоимость услуг с процентной оплатой
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        // Считаем полную стоимость
        this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

        // Если выбрана CMS, добавляем её стоимость
        if (cmsCheckbox.checked) {
            let cmsPercent = 0;

            // Определяем процент для CMS
            if (cmsSelect.value === 'other') {
                const otherInput = document.getElementById('cms-other-input');
                cmsPercent = otherInput.value ? +otherInput.value : 0;
            } else if (cmsSelect.value && cmsSelect.value !== '') {
                cmsPercent = +cmsSelect.value;
            }

            // Добавляем стоимость CMS к общей стоимости
            if (cmsPercent > 0) {
                const cmsCost = this.fullPrice * (cmsPercent / 100);
                this.fullPrice += cmsCost;
            }
        }

        // Рассчитываем итоговую стоимость с учетом отката
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

        // Сохраняем общее количество экранов
        this.totalScreenCount = totalScreenCount;
    },

    // Метод для логирования в консоль (закомментирован в start)
    logger: function () {

        console.log("Стоимость разработки сайта: " + this.fullPrice + " рублей");
        console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(this.servicePercentPrice) + " рублей");
    }
};

// Запускаем инициализацию приложения
appData.init()