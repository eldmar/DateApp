const API_KEY = "dTUUd7ilentUUZJ4o7sAdzBOXLntnPX8";
const API_URL = "https://calendarific.com/api/v2";

export async function getCountries() {
  const response = await fetch(`${API_URL}/countries?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`Помилка завантаженя: ${response.status}`);
  }
  const {
    response: { countries },
  } = await response.json();
  return countries;
}

export async function getHolidays(country, year) {
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
}
