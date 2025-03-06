'use strict'

//Объявление переменных
let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 20;
let fullPrice;
let servicePercentPrice;
let allServicePrices;
let service1;
let service2;
let servicePrice;

//Объявление функций

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}
const getNumericInput = function (promptMessage) {  //Функция для учёта пробелов у числа и значения null
    let input;
    let parsedNumber;
    
    do {
        input = prompt(promptMessage);    
        if (input !== null) {
            parsedNumber = +(input.trim());
        } else {
            parsedNumber = NaN;
        }
    } while (!isNumber(parsedNumber));
    return parsedNumber;
}

const asking = function () {
    title = prompt("Как называется Ваш проект?", "Проект");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
    screenPrice = getNumericInput("Сколько будет стоить данная работа?");
    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function () {
    let sum = 0;
    let price;

    for(let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
            price = getNumericInput("Сколько будет стоить данная работа?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
            price = getNumericInput("Сколько будет стоить данная работа?");
        }
        sum += price;
    }
    return sum;
};

const showTypeOf = function (variable) {
    return console.log(variable, typeof variable);
};

const getFullPrice = function () {
    return screenPrice + allServicePrices;
};

const getServicePercentPrice = function () {
    return fullPrice - (fullPrice*(rollback/100));
};

const getTitle = function () {
    return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
};

const getRollbackMessage = function(price) {
if (price >= 30000) {
    return"Даём скидку в 10%";
} else if (price >= 15000 && price < 30000) {
    return"Даём скидку в 5%";
} else if (price >= 0 && price < 15000) {
    return"Скидка не предусмотрена";
} else {
    return"Что-то пошло не так";
}
};

//Вызов функций, функциональная часть
asking()
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

//Мусорная часть

console.log("allServicePrices", allServicePrices)
console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(servicePercentPrice)
console.log(getServicePercentPrice());
console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
console.log("Процент отката посреднику за работу: " + (fullPrice*(rollback/100)) + " рублей");
console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(servicePercentPrice) + " рублей");
