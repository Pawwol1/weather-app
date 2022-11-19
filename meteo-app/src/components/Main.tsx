import React from "react";
import { WeatherDataDisplay } from "./WeatherDataDisplay/WeatherDataDisplay";
import { AddReportForm } from "./AddReportForm/AddReportForm";

export const Main = () => {
  return (
    <div className="App">
      <AddReportForm />
      <WeatherDataDisplay />
    </div>
  );
};
