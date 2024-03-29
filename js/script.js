"use strict";

// Оголошення змінних

const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const addPeriodButtonContainer = document.querySelector(".button-container");
const countButton = document.querySelector(".count");
const resultDiv = document.querySelector(".hero-result");
const daySelect = document.getElementById("day-select");
const durationSelect = document.getElementById("duration-select");

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

// Функція яка додає вказану кількість днів до дати
function addTimePeriod(days) {
  if (!startDateInput.value) {
    return;
  }

  let date = new Date(startDateInput.value);

  if (endDateInput.value) {
    date = new Date(endDateInput.value);
  }

  date.setDate(date.getDate() + days);
  endDateInput.value = date.toISOString().split("T")[0];
}

// Функція для обробки кліку в межах контейнера
function handleAddPeriodClick(event) {
  if (event.target.classList.contains("add-period")) {
    if (!startDateInput.value) {
      return;
    }
    const days = parseInt(event.target.getAttribute("data-days"), 10);
    addTimePeriod(days);
  }
}

// Додавання EventListener
startDateInput.addEventListener("input", handleStartDateChange);
endDateInput.addEventListener("input", handleEndDateChange);
addPeriodButtonContainer.addEventListener("click", handleAddPeriodClick);
