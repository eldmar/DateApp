import { formatDateToISO, convertDuration } from "./helper.js";
import { storeResultInStorage, displayResultsFromStorage } from "./storage.js";

export const startDateInput = document.getElementById("start-date");
export const endDateInput = document.getElementById("end-date");
const dayType = document.getElementById("day-select");
const durationType = document.getElementById("duration-select");

export function handleStartDateChange() {
  endDateInput.min = startDateInput.value;
  if (endDateInput.value && startDateInput.value > endDateInput.value) {
    endDateInput.value = startDateInput.value;
  }
}
export function handleEndDateChange() {
  startDateInput.max = endDateInput.value;
  if (startDateInput.value && endDateInput.value < startDateInput.value) {
    startDateInput.value = endDateInput.value;
  }
}

// Функція яка додає вказану кількість днів до дати
export function addDays(event) {
  const preset = event.target.dataset.preset;
  let daysToAdd;

  switch (preset) {
    case "week":
      daysToAdd = 7;
      break;
    case "month":
      daysToAdd = 30;
      break;
  }

  if (!startDateInput.value) {
    const today = new Date();
    startDateInput.value = formatDateToISO(today);
  }

  let baseDate = new Date(startDateInput.value);
  baseDate.setDate(baseDate.getDate() + daysToAdd);

  endDateInput.value = formatDateToISO(baseDate);
}

// Функція для підрахунку всіх днів
function countAllDays(startDate, endDate) {
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
function countWeekdays(startDate, endDate) {
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
function countWeekends(startDate, endDate) {
  let duration = 0;
  while (startDate <= endDate) {
    if (isWeekend(startDate)) {
      duration++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return duration;
}

function calculateDuration(startDate, endDate, dayType, durationType) {
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
export function handleCalculateClick() {
  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;
  const dayTypeValue = dayType.value;
  const durationTypeValue = durationType.value;

  if (!startDateValue || !endDateValue) {
    return;
  }

  const duration = calculateDuration(
    startDateValue,
    endDateValue,
    dayTypeValue,
    durationTypeValue
  );

  const newResult = {
    startDate: startDateValue,
    endDate: endDateValue,
    duration: `${duration} ${durationTypeValue}`,
  };
  storeResultInStorage(newResult);

  displayResultsFromStorage();
}
