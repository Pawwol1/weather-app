import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  TemperatureUnit,
  WeatherReport,
} from "../WeatherDataDisplay/WeatherDataDisplay";
import "./WeatherDataForm.scss";

export const WeatherDataForm = () => {
  const [weatherReport, setWeatherReport] = useState<WeatherReport>({
    temperature: 0,
    unit: "K",
    city: "",
    date: "",
  });
  const [formTempError, setFormTempError] = useState(false);
  const [formUnitError, setFormUnitError] = useState(false);
  const [formCityError, setFormCityError] = useState(false);
  const [formDateError, setFormDateError] = useState(false);
  const [emptySpaceError, setEmptySpaceError] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");
  const refSubmitInfo = useRef<HTMLParagraphElement>(null);
  const todaysDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setFormTempError(
      weatherReport.temperature < -1000 || weatherReport.temperature > 1000
    );
    setFormUnitError(
      weatherReport.unit.length !== 1 ||
        !weatherReport.unit.match(/^[A-Za-z]+$/)
    );
    if (weatherReport.city !== "") {
      setFormCityError(
        weatherReport.city.length < 3 ||
          weatherReport.city.length > 58 ||
          !weatherReport.city.match(/^[A-Za-z]+$/)
      );
      setEmptySpaceError(
        weatherReport.city.split("").shift() === " " ||
          weatherReport.city.includes("  ")
      );
    }
    setFormDateError(weatherReport.date === "" || weatherReport.city === "");
  }, [weatherReport]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitForm(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(weatherReport),
    };
    try {
      await fetch("http://localhost:8000/api/reports", requestOptions);
      changeInfo(true, "Form submited successfully");
    } catch (err) {
      changeInfo(false, "Some error occured. Please try again later");
    }
    setTimeout(() => setSubmitForm(false), 5000);
    setWeatherReport({
      temperature: 0,
      unit: "K",
      city: "",
      date: "",
    });
  };

  const changeInfo = (isCorrectInfo: boolean, infoText: string) => {
    if (null !== refSubmitInfo.current) {
      if (isCorrectInfo === false) {
        refSubmitInfo.current.style.color = "red";
        setSubmitMsg(infoText);
      } else if (isCorrectInfo === true) {
        setSubmitMsg(infoText);
      }
    }
  };

  return (
    <div className="weatherDataForm">
      <h2>Add Weather Report</h2>
      <span className="weatherDataForm__separator" />
      <form
        className="weatherDataForm__form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h3>Add new report</h3>
        <label htmlFor="temp" className="weatherDataForm__form-temp">
          Temp:
          <input
            type="number"
            id="temp"
            value={weatherReport.temperature}
            onChange={(e) =>
              setWeatherReport((prev) => {
                return {
                  ...prev,
                  temperature: +e.target.value,
                };
              })
            }
          />
        </label>
        {formTempError && (
          <p className="weatherDataForm__form-error">
            Number is too high or too low
          </p>
        )}
        <label htmlFor="unit" className="weatherDataForm__form-unit">
          Unit:
          <input
            type="text"
            id="unit"
            value={weatherReport.unit.toLocaleUpperCase()}
            onChange={(e) =>
              setWeatherReport((prev) => {
                return {
                  ...prev,
                  unit: e.target.value as TemperatureUnit,
                };
              })
            }
          />
        </label>
        {formUnitError && (
          <p className="weatherDataForm__form-error">Use only one character</p>
        )}
        <label htmlFor="city" className="weatherDataForm__form-city">
          City:
          <input
            type="text"
            id="city"
            value={
              weatherReport.city.charAt(0).toLocaleUpperCase() +
              weatherReport.city.slice(1)
            }
            onChange={(e) =>
              setWeatherReport((prev) => {
                return {
                  ...prev,
                  city: e.target.value,
                };
              })
            }
          />
        </label>
        {formCityError && (
          <p className="weatherDataForm__form-error">Wrong input</p>
        )}
        {emptySpaceError && (
          <p className="weatherDataForm__form-error">No empty spaces</p>
        )}
        <label htmlFor="date" className="weatherDataForm__form-date">
          Date:
          <input
            type="date"
            id="date"
            min="1899-01-01"
            max={todaysDate}
            value={weatherReport.date}
            onChange={(e) =>
              setWeatherReport((prev) => {
                return {
                  ...prev,
                  date: e.target.value,
                };
              })
            }
          />
        </label>
        <button
          className="weatherDataForm__form-button"
          type="submit"
          disabled={
            formTempError || formUnitError || formCityError || formDateError
          }
        >
          Submit
        </button>
        {submitForm && (
          <p className="weatherDataForm__form-submit" ref={refSubmitInfo}>
            {submitMsg}
          </p>
        )}
      </form>
    </div>
  );
};
