import React, { useEffect, useState } from "react";
import { EditAndDeleteButtons } from "../EditAndDeleteReport/EditAndDeleteButtons";
import { SortAndFilterData } from "../SortAndFilterData/SortAndFilterData";
import { SortState, SortValue } from "../SortAndFilterData/SortAndFilterData";
import "./WeatherDataDisplay.scss";

export interface WeatherReport {
  id?: string;
  temperature: number;
  unit: TemperatureUnit;
  city: string;
  date: string;
}
export type TemperatureUnit = "C" | "K" | "F";

export const WeatherDataDisplay = () => {
  const [weatherData, setWeatherData] = useState<WeatherReport[]>([]);
  const [sortState, setSortState] = useState<SortState>("default");
  const [sortValue, setSortValue] = useState<SortValue>("temperature");
  const [filterState, setFilterState] = useState("default");
  const URL = `http://localhost:8000/api/reports`;

  useEffect(() => {
    const getWeatherReports = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          const err = `Http error: ${res.status}`;
          throw new Error(err);
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getWeatherReports();
  }, [URL, weatherData]);

  useEffect(() => {
    if (weatherData.length) {
      const changeUnitToKelvin = async () => {
        setWeatherData((prevState) => {
          const updatedWeatherData = prevState.map((weatherReport) => {
            if (weatherReport.unit === "C") {
              return {
                ...weatherReport,
                temperature: +(weatherReport.temperature + 273.15).toFixed(0),
                unit: "K" as TemperatureUnit,
              };
            }
            if (weatherReport.unit === "F") {
              return {
                ...weatherReport,
                temperature: +(
                  ((weatherReport.temperature + 459.67) * 5) /
                  9
                ).toFixed(0),
                unit: "K" as TemperatureUnit,
              };
            }
            return weatherReport;
          });
          return updatedWeatherData;
        });
      };
      changeUnitToKelvin();
    }
  }, [weatherData.length]);

  const sortMethods = {
    default: { method: (a: WeatherReport, b: WeatherReport) => 0 },
    ascending: {
      method: (a: WeatherReport, b: WeatherReport) =>
        a[sortValue] < b[sortValue] ? -1 : 1,
    },
    descending: {
      method: (a: WeatherReport, b: WeatherReport) =>
        a[sortValue] > b[sortValue] ? -1 : 1,
    },
  };

  return (
    <div className="weatherDataDisplay">
      <h2>Weather Data</h2>
      <SortAndFilterData
        sortState={sortState}
        setSortValue={setSortValue}
        setSortState={setSortState}
        weatherData={weatherData}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <span className="weatherDataDisplay__separator" />
      <ul className="weatherDataDisplay__list">
        {weatherData.length ? (
          weatherData
            .filter((weatherReport) => {
              if (filterState === "default") {
                return weatherReport.city !== filterState;
              } else {
                return weatherReport.city === filterState;
              }
            })
            .sort(sortMethods[sortState].method)
            .map((weatherReport) => {
              return (
                <li
                  className="weatherDataDisplay__list-element"
                  key={weatherReport.id}
                >
                  <p>
                    Temperature: {weatherReport.temperature}
                    {weatherReport.unit}
                  </p>
                  <p>City: {weatherReport.city}</p>
                  <p>Date: {weatherReport.date}</p>
                  <EditAndDeleteButtons weatherReport={weatherReport} />
                </li>
              );
            })
        ) : (
          <p className="weatherDataDisplay__dataNotFound">
            Weather data not found
          </p>
        )}
      </ul>
    </div>
  );
};
