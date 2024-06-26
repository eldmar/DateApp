// Функція для підрахунку всіх днів
export function countAllDays(startDate, endDate) {
  let duration = 0;
  while (startDate < endDate) {
    duration++;
    startDate.setDate(startDate.getDate() + 1);
  }
  return duration;
}

function isWeekend(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

// Функція для підрахунку будніх днів
export function countWeekdays(startDate, endDate) {
  let duration = 0;
  while (startDate <= endDate) {
    if (!isWeekend(startDate)) {
      duration++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return duration;
}

// Функція для підрахунку вихідних днів
export function countWeekends(startDate, endDate) {
  let duration = 0;
  while (startDate <= endDate) {
    if (isWeekend(startDate)) {
      duration++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return duration;
}

export function calculateDuration(startDate, endDate, dayType, durationType) {
  let duration;

  switch (dayType) {
    case "days":
      duration = countAllDays(new Date(startDate), new Date(endDate));
      break;
    case "weekdays":
      duration = countWeekdays(new Date(startDate), new Date(endDate));
      break;
    case "weekends":
      duration = countWeekends(new Date(startDate), new Date(endDate));
      break;
  }
  return convertDuration(duration, durationType);
}

// Функція для приведення дати до одного формату
export function formatDateToISO(date) {
  return date.toISOString().split("T")[0];
}

// Функція для конвертації тривалості в обрану одиницю
function convertDuration(duration, durationTypeValue) {
  switch (durationTypeValue) {
    case "hours":
      return duration * 24;
    case "minutes":
      return duration * 24 * 60;
    case "seconds":
      return duration * 24 * 60 * 60;
    default:
      return duration;
  }
}
