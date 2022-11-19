import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WeatherReport } from "../WeatherDataDisplay/WeatherDataDisplay";
import { WeatherReportForm } from "../WeatherReportForm/WeatherReportForm";
import "./EditReportForm.scss";

export const EditReportForm = () => {
  const [weatherReportToEdit, setWeatherReportToEdit] = useState<WeatherReport>(
    {
      temperature: 0,
      unit: "K",
      city: "",
      date: "",
    }
  );
  const [weatherReport, setWeatherReport] = useState<WeatherReport>({
    temperature: 0,
    unit: "K",
    city: "",
    date: "",
  });
  const [submitStatus, setSubmitStatus] = useState(false);
  const { reportID } = useParams();

  useEffect(() => {
    const getSingleReport = async () => {
      try {
        const resp = await fetch(
          `http://localhost:8000/api/reports/${reportID}`
        );
        if (!resp.ok) {
          const err = "Report not Found";
          throw new Error(err);
        }
        const data = await resp.json();
        setWeatherReportToEdit(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleReport();
  }, [reportID]);

  const getWeatherRaport = (weatherReport: WeatherReport) => {
    setWeatherReport(weatherReport);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weatherReport),
    };
    try {
      const res = await fetch(
        `http://localhost:8000/api/reports/${reportID}`,
        requestOptions
      );
      setSubmitStatus(true);
      if (!res.ok) {
        const message = "Error with Status Code: " + res.status;
        throw new Error(message);
      }
    } catch (error) {
      setSubmitStatus(false);
    }
  };

  return (
    <div className="editReportForm">
      <div className="editReportForm__form">
        <WeatherReportForm
          handleSubmit={handleSubmit}
          weatherReportToEdit={weatherReportToEdit}
          formTitle={"Edit existing report"}
          submitStatus={submitStatus}
          getWeatherRaport={getWeatherRaport}
        />
      </div>
      <button className="editReportForm__button">
        <Link to={"/"}>Go back to main page</Link>
      </button>
    </div>
  );
};
