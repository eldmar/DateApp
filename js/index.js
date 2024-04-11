import { getResultsFromStorage, storeResultInStorage } from "./storage.js";
import { calculateDuration } from "./date.js";
import { formatDateToISO, convertDuration } from "./helper.js";

// Оголошення змінних

const addWeekButton = document.getElementById("add-week");
const addMonthButton = document.getElementById("add-month");
const calculateButton = document.querySelector(".count");
const resultList = document.querySelector(".result-list");
const dayType = document.getElementById("day-select");
const durationType = document.getElementById("duration-select");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

// Функція для відображення результатів з localStorage
const displayResultsFromStorage = () => {
  const results = getResultsFromStorage();

  resultList.innerHTML = "";

  results.forEach((result) => {
    const li = document.createElement("li");
    li.innerHTML = `Start date: ${result.startDate}, End date: ${result.endDate}, Duration: ${result.duration}`;
    resultList.appendChild(li);
  });
};

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

function handleCalculateClick() {
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

// Ініціалізація
displayResultsFromStorage();

// Додавання EventListener
startDateInput.addEventListener("input", handleStartDateChange);
endDateInput.addEventListener("input", handleEndDateChange);
addWeekButton.addEventListener("click", addDays);
addMonthButton.addEventListener("click", addDays);
calculateButton.addEventListener("click", handleCalculateClick);
