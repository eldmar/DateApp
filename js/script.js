"use strict";

// Оголошення змінних

const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const addWeekButton = document.getElementById("add-week");
const addMonthButton = document.getElementById("add-month");
const dayType = document.getElementById("day-select");
const durationType = document.getElementById("duration-select");
const calculateButton = document.querySelector(".count");
const resultDiv = document.querySelector(".hero-result");

// LocalStorage

// Функції обробники подій

function handleStartDateChange() {
  endDateInput.min = startDateInput.value;
  if (endDateInput.value && startDateInput.value > endDateInput.value) {
    endDateInput.value = startDateInput.value;
  }
}
function handleEndDateChange() {
  startDateInput.max = endDateInput.value;
  if (startDateInput.value && endDateInput.value < startDateInput.value) {
    startDateInput.value = endDateInput.value;
  }
}

// Функція для приведення дати до одного формату
function formatDateToISO(date) {
  return date.toISOString().split("T")[0];
}

// Функція яка додає вказану кількість днів до дати
function addDays(event) {
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

// Функція для підрахунку будніх днів
function countWeekdays(startDate, endDate) {
  let duration = 0;
  while (startDate < endDate) {
    if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
      duration++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return duration;
}

// Функція для підрахунку вихідних днів
function countWeekends(startDate, endDate) {
  let duration = 0;
  while (startDate < endDate) {
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      duration++;
    }
    startDate.setDate(startDate.getDate() + 1);
  }
  return duration;
}

// Функція для розрахунку тривалості
function calculateDuration() {
  const dayTypeValue = dayType.value;
  const durationTypeValue = durationType.value;

  if (!startDateInput.value || !endDateInput.value) {
    return;
  }

  let startDate = new Date(startDateInput.value);
  let endDate = new Date(endDateInput.value);
  let duration;

  switch (dayTypeValue) {
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

  duration = convertDuration(duration, durationTypeValue);

  console.log(`Total ${durationTypeValue}: ${duration}`);
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

// Додавання EventListener
startDateInput.addEventListener("input", handleStartDateChange);
endDateInput.addEventListener("input", handleEndDateChange);
addWeekButton.addEventListener("click", addDays);
addMonthButton.addEventListener("click", addDays);
calculateButton.addEventListener("click", calculateDuration);
