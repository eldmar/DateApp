import { displayResultsFromStorage } from "./storage.js";
import {
  handleStartDateChange,
  handleEndDateChange,
  addDays,
  handleCalculateClick,
  startDateInput,
  endDateInput,
} from "./date.js";

// Оголошення змінних

const addWeekButton = document.getElementById("add-week");
const addMonthButton = document.getElementById("add-month");
const calculateButton = document.querySelector(".count");

// Ініціалізація
displayResultsFromStorage();

// Додавання EventListener
startDateInput.addEventListener("input", handleStartDateChange);
endDateInput.addEventListener("input", handleEndDateChange);
addWeekButton.addEventListener("click", addDays);
addMonthButton.addEventListener("click", addDays);
calculateButton.addEventListener("click", handleCalculateClick);
