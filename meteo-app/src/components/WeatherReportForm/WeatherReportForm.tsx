import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  TemperatureUnit,
  WeatherReport,
} from "../WeatherDataDisplay/WeatherDataDisplay";
import "./WeatherReportForm.scss";

interface IPropsForm {
  handleSubmit: (e: FormEvent) => Promise<void>;
  weatherReportToEdit?: WeatherReport;
  formTitle: string;
  submitStatus: boolean;
  getWeatherRaport: (weatherReport: WeatherReport) => void;
}

export const WeatherReportForm = ({
  handleSubmit,
  weatherReportToEdit,
  formTitle,
  submitStatus,
  getWeatherRaport,
}: IPropsForm) => {
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
    weatherReportToEdit && setWeatherReport(weatherReportToEdit);
  }, [weatherReportToEdit]);

  const changeInfo = (isCorrectInfo: boolean) => {
    if (null !== refSubmitInfo.current) {
      if (isCorrectInfo === false) {
        refSubmitInfo.current.style.color = "red";
        setSubmitMsg("Some error occured. Please try again later");
      } else if (isCorrectInfo === true) {
        refSubmitInfo.current.style.color = "green";
        setSubmitMsg("Form submited successfully");
      }
    }
  };

  useEffect(() => {
    setFormTempError(
      weatherReport.temperature < -1000 || weatherReport.temperature > 1000
    );
    setFormUnitError(
      weatherReport.unit.length !== 1 || !weatherReport.unit.match(/[CcFfKk]+/g)
    );
    if (weatherReport.city !== "") {
      setFormCityError(
        weatherReport.city.length < 3 ||
          weatherReport.city.length > 58 ||
          !weatherReport.city.match(/^[A-Za-z ]+$/)
      );
      setEmptySpaceError(
        weatherReport.city.split("").shift() === " " ||
          weatherReport.city.includes("  ")
      );
    }
    setFormDateError(weatherReport.date === "" || weatherReport.city === "");
    changeInfo(submitStatus);
    getWeatherRaport(weatherReport);
  }, [weatherReport, submitStatus, getWeatherRaport]);

  const handleClick = () => {
    setSubmitForm(true);
    setTimeout(() => setSubmitForm(false), 5000);
    setWeatherReport({
      temperature: 0,
      unit: "K",
      city: "",
      date: "",
    });
  };

  return (
    <form
      className="weatherReportForm"
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
    >
      <h3>{formTitle}</h3>
      <label htmlFor="temp" className="weatherReportForm__temp">
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
        <p className="weatherReportForm__error">
          Number is too high or too low
        </p>
      )}
      <label htmlFor="unit" className="weatherReportForm__unit">
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
        <p className="weatherReportForm__error">Use only C, F or K character</p>
      )}
      <label htmlFor="city" className="weatherReportForm__city">
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
      {formCityError && <p className="weatherReportForm__error">Wrong input</p>}
      {emptySpaceError && (
        <p className="weatherReportForm__error">No empty spaces</p>
      )}
      <label htmlFor="date" className="weatherReportForm__date">
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
        className="weatherReportForm__button"
        type="submit"
        disabled={
          formTempError || formUnitError || formCityError || formDateError
        }
        onClick={handleClick}
      >
        Submit
      </button>
      {submitForm && (
        <p className="weatherReportForm__submit" ref={refSubmitInfo}>
          {submitMsg}
        </p>
      )}
    </form>
  );
};
