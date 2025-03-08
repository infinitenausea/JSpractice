'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 20,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    service1: '',
    service2: '',
    asking: function () {
        appData.title = prompt("Как называется Ваш проект?", "Проект");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        appData.screenPrice = appData.getNumericInput("Сколько будет стоить данная работа?");
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    isNumber: function (num) {
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
    getAllServicePrices: function () {
        let sum = 0;
        let price;
    
        for(let i = 0; i < 2; i++) {
    
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
                price = appData.getNumericInput("Сколько будет стоить данная работа?");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
                price = appData.getNumericInput("Сколько будет стоить данная работа?");
            }
            sum += price;
        }
        return sum;
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },
    getServicePercentPrice: function () {
        return appData.fullPrice - (appData.fullPrice*(appData.rollback/100));
    },
    getTitle: function () {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
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
    start: function() {
        appData.asking()
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrice();
        appData.title = appData.getTitle();
        appData.logger();
    },
    logger: function () {
        for(let key in appData) {
            console.log(appData[key]);
        }
    }
};

appData.start()



// console.log(servicePercentPrice)
// console.log(getServicePercentPrice());
console.log("Стоимость верстки экранов: " + appData.screenPrice + " рублей");
console.log("Стоимость разработки сайта: " + appData.fullPrice + " рублей");
console.log("Процент отката посреднику за работу: " + (appData.fullPrice*(appData.rollback/100)) + " рублей");
console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(appData.servicePercentPrice) + " рублей");
