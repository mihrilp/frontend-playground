const API_KEY = "beb9e2621de70172a46f45f23015c2a6";
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0";
const API_BASE_URL = "https://api.openweathermap.org/data/3.0 ";

async function getCityCoordinates(cityName) {
  const geoURL = `${GEO_BASE_URL}/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  try {
    const response = await fetch(geoURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("City not found");
    }
    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
      state: data[0].state,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
}

export async function fetchWeatherData(cityName) {
  const location = await getCityCoordinates(cityName);
  const weatherURL = `${API_BASE_URL}/onecall?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&exclude=minutely,alerts`;

  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}
