'use strict'


let title = prompt("Как называется Ваш проект?");
console.log(title);
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
console.log(screens);
let screenPrice = +prompt("Сколько будет стоить данная работа?", "10000");
console.log(screenPrice);
let adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(adaptive);
let service1 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service1);
let servicePrice1 = +prompt("Сколько будет стоить данная работа?");
console.log(servicePrice1);
let service2 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service2);
let servicePrice2 = +prompt("Сколько будет стоить данная работа?");
console.log(servicePrice2);
let rollback = 20;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let fullPriceSaleTen = fullPrice - ((fullPrice / 100) * 10);
let fullPriceSaleFive = fullPrice - ((fullPrice / 100) * 5);
let servicePercentPrice = fullPrice - (fullPrice*(rollback/100));
let servicePercentPriceSaleTen = fullPriceSaleTen - (fullPriceSaleTen*(rollback/100));
let servicePercentPriceSaleFive = fullPriceSaleFive - (fullPriceSaleFive*(rollback/100));


if (fullPrice >= 30000) {
    console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
    console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
    console.log("Даём скидку в 10%");
    console.log("Процент отката посреднику за работу: " + (fullPriceSaleTen*(rollback/100)) + " рублей");
    console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(servicePercentPriceSaleTen) + " рублей");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
    console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
    console.log("Даём скидку в 5%");
    console.log("Процент отката посреднику за работу: " + (fullPriceSaleFive*(rollback/100)) + " рублей");
    console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(servicePercentPriceSaleFive) + " рублей");
} else if (fullPrice > 0 && fullPrice < 15000) {
    console.log("Стоимость верстки экранов: " + screenPrice + " рублей");
    console.log("Стоимость разработки сайта: " + fullPrice + " рублей");
    console.log("Скидка не предусмотрена");
    console.log("Процент отката посреднику за работу: " + (fullPrice*(rollback/100)) + " рублей");
    console.log("Итоговая стоимость за вычетом отката: " + Math.ceil(servicePercentPrice) + " рублей");
} else 
    console.log("Что-то пошло не так");

