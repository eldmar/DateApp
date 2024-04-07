const RESULT_STORAGE_KEY = "result";
const resultList = document.querySelector(".result-list");

// Функція для отримання результатів з localStorage
const getResultsFromStorage = () => {
  return JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY)) || [];
};

// Функція для збереження нового результату в localStorage
export const storeResultInStorage = (newResult) => {
  const results = getResultsFromStorage();

  while (results.length >= 10) {
    results.shift();
  }
  results.push(newResult);

  localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(results));
};

// Функція для відображення результатів з localStorage
export const displayResultsFromStorage = () => {
  const results = getResultsFromStorage();

  resultList.innerHTML = "";

  results.forEach((result) => {
    const li = document.createElement("li");
    li.innerHTML = `Start date: ${result.startDate}, End date: ${result.endDate}, Duration: ${result.duration}`;
    resultList.appendChild(li);
  });
};
