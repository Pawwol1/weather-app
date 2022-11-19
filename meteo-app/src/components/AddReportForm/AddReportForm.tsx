import React, { FormEvent, useState } from "react";
import { WeatherReport } from "../WeatherDataDisplay/WeatherDataDisplay";
import { WeatherReportForm } from "../WeatherReportForm/WeatherReportForm";
import "./AddReportForm.scss";

export const AddReportForm = () => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [weatherReport, setWeatherReport] = useState<WeatherReport>({
    temperature: 0,
    unit: "K",
    city: "",
    date: "",
  });

  const getWeatherRaport = (weatherReport: WeatherReport) => {
    setWeatherReport(weatherReport);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(weatherReport),
    };
    try {
      await fetch("http://localhost:8000/api/reports", requestOptions);
      setSubmitStatus(true);
    } catch (err) {
      setSubmitStatus(false);
    }
  };

  return (
    <div className="addReportForm ">
      <h2>Weather Report App</h2>
      <span className="addReportForm__separator" />
      <WeatherReportForm
        handleSubmit={handleSubmit}
        formTitle={"Add new report"}
        submitStatus={submitStatus}
        getWeatherRaport={getWeatherRaport}
      />
    </div>
  );
};
