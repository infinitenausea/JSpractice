'use strict'

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
        for (let i = 0; i < 2; i++) {
            let name = appData.getStringInput("Какие типы экранов нужно разработать?");
            let price = 0;
                price = appData.getNumericInput("Сколько будет стоить данная работа?");

            appData.screens.push({id: i, name: name, price: price});
        };
        
        for (let i = 0; i < 2; i++) {
            let name = appData.getStringInput("Какой дополнительный тип услуги нужен?");
            let price = 0;
                price = appData.getNumericInput("Сколько будет стоить данная работа?");

            appData.services[name] = price
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
    getNumericInput: function (promptMessage) { 
        let input;
        let parsedNumber;
        
        do {
            input = prompt(promptMessage);    
            if (input !== null) {
                parsedNumber = +(input.trim());
            } else {
                parsedNumber = NaN;
            }
        } while (!appData.isNumber(parsedNumber));
        return parsedNumber;
    },
    getStringInput: function (promptMessage, defaultValue = "") {
        let input;
        let inputOnlyNumbers;

        do {
            input = prompt(promptMessage, defaultValue);

            if (input === null) {
                input = defaultValue;
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
        console.log(appData.screens);
    }
};

appData.start()



// console.log("Стоимость верстки экранов: " + appData.screenPrice + " рублей");
// console.log("Стоимость разработки сайта: " + appData.fullPrice + " рублей");
// console.log("Процент отката посреднику за работу: " + (appData.fullPrice*(appData.rollback/100)) + " рублей");
// console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(appData.servicePercentPrice) + " рублей");
