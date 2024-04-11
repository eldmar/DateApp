const RESULT_STORAGE_KEY = "result";
const STORAGE_LIMIT = 10;

// Функція для отримання результатів з localStorage
export const getResultsFromStorage = () => {
  return JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY)) || [];
};

// Функція для збереження нового результату в localStorage
export const storeResultInStorage = (newResult) => {
  const results = getResultsFromStorage();

  if (results.length >= STORAGE_LIMIT) {
    results.shift();
  }
  results.push(newResult);

  localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(results));
};
