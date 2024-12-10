"use client";
import React, { useState, useEffect } from "react";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";

function App() {
  const [searchedCity, setSearchedCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [weather, setWeather] = useState(null);

  async function getCityWeather(city) {
    try {
      const response = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputCity.trim() === "") return;
    setSearchedCity(inputCity);
  }

  useEffect(() => {
    getCityWeather(searchedCity);
  }, [searchedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-600 text-white flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold mb-8">Kelly&apos;s Weather App</h1>
      <form
        className="flex items-center bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 w-full max-w-lg shadow-lg transform hover:scale-105 transition-transform"
        onSubmit={handleSubmit}
      >
        <MdOutlineLocationCity size={28} className="text-white mr-4" />
        <input
          type="text"
          placeholder="Search for a city"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="bg-transparent border-none text-white text-lg placeholder-gray-300 focus:outline-none flex-grow"
        />
        <button
          type="submit"
          className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {weather && (
        <div className="mt-10 w-full max-w-3xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-center">{searchedCity}</h1>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold">Current Weather</h2>
            <div className="mt-4 flex justify-center items-center space-x-6">
              <FaTemperatureHigh size={32} />
              <p className="text-2xl">{weather.temperature || "N/A"}</p>
            </div>
            <p className="text-lg mt-2">{weather.description || "N/A"}</p>
          </div>
          
          {weather.forecast && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-center">3-Days Forecast</h2>
              <ul className="mt-6 space-y-4">
                {weather.forecast.map((dayForecast, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-opacity-20 rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl">
                      {index === 0
                        ? "Tomorrow"
                        : Intl.DateTimeFormat("en-US", {
                            weekday: "long",
                          }).format(
                            new Date(
                              Date.now() + (index + 1) * 24 * 60 * 60 * 1000
                            )
                          )}
                    </h3>
                    <div className="flex space-x-6 items-center">
                      <div className="flex items-center space-x-2">
                        <FaTemperatureHigh size={22} />
                        <p>{dayForecast.temperature || "N/A"}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaWind size={22} />
                        <p>{dayForecast.wind || "N/A"}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
