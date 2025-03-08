'use strict'
// Создаем массив с днями недели
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

// Получаем текущий день недели (0 - воскресенье, 1 - понедельник и т.д.)
const currentDayIndex = new Date().getDay();
// Преобразуем в индекс массива (0 - понедельник, 6 - воскресенье)
const currentDayInArray = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

// Получаем div для вывода или создаем новый
const container = document.createElement('div');
document.body.appendChild(container);

// Формируем HTML для вывода всех дней
let daysHTML = '';

week.forEach(function(day, index){
  // Определяем стиль для дня
  let style = '';
  
  if (index === currentDayInArray) {
    style += 'font-weight: bold; ';
  }
  
  if (index <= 4) { // Суббота и воскресенье
    style += 'font-style: italic; ';
  }
  
  // Добавляем день в HTML
  daysHTML += `<p style="${style}">${day}</p>`;
});

// Выводим все дни на страницу
container.innerHTML = daysHTML;