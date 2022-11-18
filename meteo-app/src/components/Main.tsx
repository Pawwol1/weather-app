import React from "react";
import { WeatherDataDisplay } from "./WeatherDataDisplay/WeatherDataDisplay";
import { WeatherDataForm } from "./WeatherDataForm/WeatherDataForm";

export const Main = () => {
  return (
    <div className="App">
      <WeatherDataForm />
      <WeatherDataDisplay />
    </div>
  );
};
