'use strict'

//Объявление переменных
let title = prompt("Как называется Ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?", "10000");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько будет стоить данная работа?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько будет стоить данная работа?");
let rollback = 20;
let fullPrice;
let servicePercentPrice;
let allServicePrices;

//Объявление функций
const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const getRollbackMessage = function(price) {
if (price >= 30000) {
    return"Даём скидку в 10%";
} else if (price >= 15000 && price < 30000) {
    return"Даём скидку в 5%";
} else if (price >= 0 && price < 15000) {
    return"Скидка не предусмотрена";
} else 
    return"Что-то пошло не так";
};

const getAllServicePrices = function(servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2;
};
allServicePrices = getAllServicePrices(servicePrice1,servicePrice2);

function getFullPrice(screenPrice, allServicePrice) {
    return screenPrice + allServicePrice;
};
fullPrice = getFullPrice(screenPrice, allServicePrices);

const getTitle = function(title) {
    return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
};

const getServicePercentPrice = function (fullPrice, rollback) {
    return fullPrice - (fullPrice*(rollback/100));
};
servicePercentPrice = getServicePercentPrice(fullPrice,rollback);

//Вызов функций, функциональная часть
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

//Мусорная часть
console.log(screens);
console.log(getRollbackMessage(fullPrice));
console.log(getServicePercentPrice(fullPrice,rollback));