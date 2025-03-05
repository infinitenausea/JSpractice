'use strict'
//Функция для обработки приходящей строки.
const someFunction = function(str) {
    if (typeof str!== 'string')
        return "Это не строка!"; //Если не string, то предупреждаем
    if(str.length > 30) 
        return str.trim().slice(0,30) + "..."; //Если символов больше 30, то заменяем на многоточия, начиная с 31ого и удаляем пробелы
    else return str.trim(); // Удаляем пробелы, если остальные условия не выполнились
};

//Проверяем
console.log(someFunction('   очень длинная строка которая явно длиннее тридцати символов так еще и с пробелами по краям   '));
console.log(someFunction('   просто текст с пробелами   '));
console.log(someFunction(43521632156));


// Теперь через switch case
const someFunctionSwitchCase = function(str) {
    switch(true) {
        case typeof str!== 'string':
            return "Это не строка!"; //Если не string, то предупреждаем
        case str.length > 30: 
            return str.trim().slice(0,30) + "..."; //Если символов больше 30, то заменяем на многоточия, начиная с 31ого и удаляем пробелы
        default: 
            return str.trim(); // Удаляем пробелы, если остальные условия не выполнились
}
};

//Проверяем
console.log(someFunctionSwitchCase('   очень длинная строка которая явно длиннее тридцати символов так еще и с пробелами по краям   '));
console.log(someFunctionSwitchCase('   просто текст с пробелами   '));
console.log(someFunctionSwitchCase(43521632156));