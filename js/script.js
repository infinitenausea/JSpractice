'use strict'

let title = document.getElementsByTagName('h1')[0];
let startBtn = document.getElementsByClassName('handler_btn')[0];
let resetBtn = document.getElementsByClassName('handler_btn')[1];
let buttonPlus = document.querySelector('.screen-btn');
let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
let inputTypeRange = document.querySelector(".rollback input[type='range']");
let spanRangeValue = document.querySelector(".rollback span[class='range-value']");

let input = document.getElementsByClassName('total-input')[0];
let totalCount = document.getElementById('total-count');
let totalCountOther = document.getElementById('total-count-other');
let fullTotalCount = document.getElementById('total-full-count');
let fullTotalCountRollback = document.getElementById('total-count-rollback');

let screens = document.querySelectorAll(".screen");


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);

        appData.checkFormValidity();
        document.addEventListener('change', appData.checkFormValidity);
        document.addEventListener('input', appData.checkFormValidity);

        inputTypeRange.addEventListener('input', function() {
            appData.rollback = +inputTypeRange.value;
            spanRangeValue.textContent = inputTypeRange.value + '%';

            if (appData.fullPrice > 0) {
                appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice*(appData.rollback/100));
                fullTotalCountRollback.value = appData.servicePercentPrice;
            }
        });
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    start: function() {
        
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.getServicePercentPrice();

        // appData.logger();
        appData.showResult();
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCount.value = appData.totalScreenCount;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        fullTotalCountRollback.value = appData.servicePercentPrice

    },
    addScreens: function (){
        let screens = document.querySelectorAll(".screen");

        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            const count = +input.value;
            appData.screens.push ({
                id: index,
                name: selectName,
                price: +select.value * count,
                count: count
            })
        })
    },
    addServices: function(){
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked){
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if(check.checked){
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
        screens = document.querySelectorAll(".screen");
        appData.checkFormValidity();
    },
    checkFormValidity: function () {
        let isValid = true;

        screens.forEach(function(screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (select.value === '' || !input.value || +input.value <= 0) {
                isValid = false;
            }
        });

        if (isValid) {
            startBtn.removeAttribute('disabled');
        } else {
            startBtn.setAttribute('disabled', true);
        };
    },
    addPrices: function(){
        appData.screenPrice = 0;
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        let totalScreenCount = 0;

        for (let screen of appData.screens) {
            appData.screenPrice += screen.price;
            totalScreenCount += screen.count;
        };

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        };

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice*(appData.servicesPercent[key]/100);
        };

        appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice*(appData.rollback/100));

        appData.totalScreenCount = totalScreenCount;
    },


    logger: function () {
        console.log("Стоимость разработки сайта: " + appData.fullPrice + " рублей");
        console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(appData.servicePercentPrice) + " рублей");
    }
};

appData.init()



