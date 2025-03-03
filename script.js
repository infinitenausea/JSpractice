'use strict'

let weekEng = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let weekRus = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

let lang = prompt("Language?", "en or ru?")

if (lang == "ru") 
    console.log(weekRus.join(", "));
else if (lang == "en")
    console.log(weekEng.join(", "));

let lang2 = prompt("Language?", "en or ru?");

switch(lang2) {
    case "ru":
        console.log(weekRus.join(", "));
    break;
    case "en":
        console.log(weekEng.join(", "));
    break;
};

let ArrayTwoLanguages = {
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    ru: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
};
let lang3 = prompt("Language?", "en or ru?");
console.log(ArrayTwoLanguages[lang3].join(", "));


let namePerson = prompt("Имя?");

let result = namePerson === "Артём" ? "Директор" : namePerson === "Александр" ? "Преподаватель" : "Студент"; 
console.log(result);