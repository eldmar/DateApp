// Функція для приведення дати до одного формату
export function formatDateToISO(date) {
  return date.toISOString().split("T")[0];
}

// Функція для конвертації тривалості в обрану одиницю
export function convertDuration(duration, durationTypeValue) {
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
