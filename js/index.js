import { getResultsFromStorage, storeResultInStorage } from "./storage.js";
import { calculateDuration, formatDateToISO } from "./date.js";

// Оголошення змінних
const API_KEY = "CfMigfl9ufpty0yl6FPJhdkNEOHLv8ZQ";
const API_URL = "https://calendarific.com/api/v2";

const addWeekButton = document.getElementById("add-week");
const addMonthButton = document.getElementById("add-month");
const calculateButton = document.querySelector(".count");
const resultList = document.querySelector(".result-list");
const dayType = document.getElementById("day-select");
const durationType = document.getElementById("duration-select");
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");

const btnDate = document.querySelector(".btn-date");
const btnHoliday = document.querySelector(".btn-holiday");
const tabDate = document.querySelector(".hero__date");
const tabHoliday = document.querySelector(".hero__holiday");

const countrySelect = document.getElementById("country");
const yearSelect = document.getElementById("year");
const holidayList = document.querySelector(".holiday-list");
const displayButton = document.querySelector(".btn-display");

async function getCountries() {
  try {
    const response = await fetch(`${API_URL}/countries?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Помилка завантаженя: ${response.status}`);
    }
    const {
      response: { countries },
    } = await response.json();
    return countries;
  } catch (error) {}
}

async function getHolidays(country, year) {
  try {
    const response = await fetch(
      `${API_URL}/holidays?api_key=${API_KEY}&country=${country}&year=${year}`
    );
    if (!response.ok) {
      throw new Error(`Помилка завантаженя: ${response.status}`);
    }
    const {
      response: { holidays },
    } = await response.json();
    return holidays;
  } catch (error) {}
}

async function displayHolidays() {
  try {
    const countryValue = countrySelect.value;
    const yearValue = yearSelect.value;

    if (!countryValue || !yearValue) {
      throw new Error("Країна чи рік не обрано!");
    }

    const holidays = await getHolidays(countryValue, yearValue);

    holidayList.innerHTML = `<li class="header-item"><span>Date</span><span>Holiday</span></li>`;

    holidays.forEach((holiday) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span>${
        holiday.date.iso.split("T")[0]
      }</span>  <span>${holiday.name}</span>`;
      holidayList.appendChild(listItem);
    });
  } catch (error) {}
}

async function displayCountries() {
  try {
    const countries = await getCountries();

    countries.forEach((country) => {
      let option = new Option(country.country_name, country["iso-3166"]);
      countrySelect.appendChild(option);
    });
  } catch {}
}

function displayYears() {
  for (let year = 2001; year <= 2049; year++) {
    let option = new Option(year, year);
    yearSelect.appendChild(option);
  }
  yearSelect.value = new Date().getFullYear();
}

function initTab() {
  getCountries();
  displayYears();
  displayCountries();
}

function changeDisabled() {
  yearSelect.removeAttribute("disabled");
}

// Функція переключення активної таби
const activateDateTab = () => {
  btnDate.classList.add("btn-active");
  btnHoliday.classList.remove("btn-active");
  tabDate.hidden = false;
  tabHoliday.hidden = true;
};

const activateHolidayTab = () => {
  btnHoliday.classList.add("btn-active");
  btnDate.classList.remove("btn-active");
  tabDate.hidden = true;
  tabHoliday.hidden = false;
};

// Функція для відображення результатів з localStorage
const displayResultsFromStorage = () => {
  const results = getResultsFromStorage();

  resultList.innerHTML = "";

  results.forEach((result) => {
    const li = document.createElement("li");
    li.innerHTML = `Start: <span>${result.startDate}</span>  End: <span>${result.endDate} </span> Duration: <span>${result.duration}</span>`;
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

// // Додавання EventListener
startDateInput.addEventListener("input", handleStartDateChange);
endDateInput.addEventListener("input", handleEndDateChange);
addWeekButton.addEventListener("click", addDays);
addMonthButton.addEventListener("click", addDays);
calculateButton.addEventListener("click", handleCalculateClick);
btnDate.addEventListener("click", activateDateTab);
btnHoliday.addEventListener("click", activateHolidayTab);
btnHoliday.addEventListener("click", initTab);
countrySelect.addEventListener("change", changeDisabled);
displayButton.addEventListener("click", displayHolidays);
