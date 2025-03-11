// Функция для правильного склонения часов
function getHourCase(hour) {
    // Приводим к остатку от деления на 100, чтобы правильно обрабатывать числа больше 100
    hour = hour % 100;
    
    // Особые случаи для чисел от 11 до 14
    if (hour >= 11 && hour <= 14) {
        return "часов";
    }
    
    // Получаем последнюю цифру
    const lastDigit = hour % 10;
    
    if (lastDigit === 1) {
        return "час";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return "часа";
    } else {
        return "часов";
    }
}

// Функция для добавления ведущего нуля
function addZero(num) {
    return num < 10 ? "0" + num : num;
}

// Получение названия дня недели
function getDayName(dayIndex) {
    const days = [
        "Воскресенье", "Понедельник", "Вторник", 
        "Среда", "Четверг", "Пятница", "Суббота"
    ];
    return days[dayIndex];
}

// Функция для правильного склонения минут
function getMinuteCase(minute) {
    minute = minute % 100;
    
    if (minute >= 11 && minute <= 14) {
        return "минут";
    }
    
    const lastDigit = minute % 10;
    
    if (lastDigit === 1) {
        return "минута";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return "минуты";
    } else {
        return "минут";
    }
}

// Функция для правильного склонения секунд
function getSecondCase(second) {
    second = second % 100;
    
    if (second >= 11 && second <= 14) {
        return "секунд";
    }
    
    const lastDigit = second % 10;
    
    if (lastDigit === 1) {
        return "секунда";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return "секунды";
    } else {
        return "секунд";
    }
}

// Функция для обновления времени
function updateTime() {
    const now = new Date();
    
    const day = now.getDate();
    const month = now.getMonth() + 1; // Месяцы в JS идут от 0 до 11
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const dayName = getDayName(now.getDay());
    
    // Формат (а)
    const fullDate = `Сегодня ${dayName}, ${day} февраля ${year} года, ${hour} ${getHourCase(hour)} ${minute} ${getMinuteCase(minute)} ${second} ${getSecondCase(second)}`;
    
    // Формат (б)
    const shortDate = `${addZero(day)}.${addZero(month)}.${year} - ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
    
    document.getElementById('fullDate').textContent = fullDate;
    document.getElementById('shortDate').textContent = shortDate;
}

// Обновление времени сразу при загрузке страницы
updateTime();

// Обновление времени каждую секунду
setInterval(updateTime, 1000);