import { fetchWeatherData } from "./api.js";

// DOM elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

async function handleSearch() {
  const city = searchInput.value;
  if (!city) return;

  errorMessage.classList.remove("show");
  weatherCard.classList.remove("show");

  try {
    loading.classList.add("show");
    await fetchWeatherData(city);
    weatherCard.classList.add("show");
  } catch (error) {
    errorMessage.classList.add("show");
  } finally {
    loading.classList.remove("show");
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
  console.log("App initialized successfully!");
});
