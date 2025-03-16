'use strict'

let titleH1 = document.getElementsByTagName('h1')[0];
let startBtn = document.getElementsByClassName('handler_btn')[0];
let resetBtn = document.getElementsByClassName('handler_btn')[1];
let buttonPlus = document.querySelector('.screen-btn');
let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
let inputTypeRange = document.querySelector(".rollback input[type='range']");
let spanRangeValue = document.querySelector(".rollback span[class='range-value']");
let input = document.getElementsByClassName('total-input')[0];
let totalCount = document.getElementsByClassName('total-input')[1];
let totalCountOther = document.getElementsByClassName('total-input')[2];
let fullTotalCount = document.getElementsByClassName('total-input')[3];
let fullTotalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll(".screen");


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    services: {},
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrice();
        appData.getTitle();
        appData.logger();
    },
    asking: function () {
        appData.title = appData.getStringInput("Как называется Ваш проект?", "Проект");

            appData.screens = Array(2).fill(null).reduce((acc, _, i) => {
            let name = appData.getStringInput("Какие типы экранов нужно разработать?");
            let price = 0;
            price = appData.getNumericInput("Сколько будет стоить данная работа?");
            return [...acc, {id: i, name: name, price: price}];
            }, []);
            
        for (let i = 0; i < 2; i++) {
            let name = appData.getStringInput("Какой дополнительный тип услуги нужен?");
            let price = 0;
            price = appData.getNumericInput("Сколько будет стоить данная работа?");

            let uniqueKey = name;
            let counter = 1

            while (appData.services.hasOwnProperty(uniqueKey)) {
                uniqueKey = name + "_" + counter;
                counter++;
            }

            appData.services[uniqueKey] = price
        };

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    addPrices: function(){
        for (let screen of appData.screens) {
            appData.screenPrice += screen.price;
        };
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        };
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getNumericInput: function (promptMessage, defaultValue) { 
        let input;
        let parsedNumber;
        
        do {
            input = prompt(promptMessage, defaultValue);    
            if (input !== null) {
                parsedNumber = +(input.trim());
            } else {
                parsedNumber = NaN;
            }
        } while (!appData.isNumber(parsedNumber));
        return parsedNumber;
    },
    getStringInput: function (promptMessage, defaultValue) {
        let input;
        let inputOnlyNumbers;

        do {
            input = prompt(promptMessage, defaultValue);

            if (input === null) {
                input = NaN;
            };

            inputOnlyNumbers = appData.isNumber(input);
        
        } while (!input || typeof input !== 'string' || input.trim().length === 0 || inputOnlyNumbers);

        return input;
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrice: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice*(appData.rollback/100));
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },
    getRollbackMessage: function(price) {
        if (price >= 30000) {
            return"Даём скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return"Даём скидку в 5%";
        } else if (price >= 0 && price < 15000) {
            return"Скидка не предусмотрена";
        } else {
            return"Что-то пошло не так";
        }
    },
    logger: function () {
        console.log("Стоимость разработки сайта: " + appData.fullPrice + " рублей");
        console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(appData.servicePercentPrice) + " рублей");
        // console.log(appData.screens);
        // console.log(appData.services);
    }
};

appData.start()



// console.log("Стоимость верстки экранов: " + appData.screenPrice + " рублей");
// console.log("Стоимость разработки сайта: " + appData.fullPrice + " рублей");
// console.log("Процент отката посреднику за работу: " + (appData.fullPrice*(appData.rollback/100)) + " рублей");
// console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(appData.servicePercentPrice) + " рублей");
