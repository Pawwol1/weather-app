import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WeatherReport } from "../WeatherDataDisplay/WeatherDataDisplay";
import { WeatherDataForm } from "../WeatherDataForm/WeatherDataForm";
import "./EditReportForm.scss";

export const EditReportForm = () => {
  const [weatherReport, setWeatherReport] = useState<WeatherReport>({
    temperature: 0,
    unit: "K",
    city: "",
    date: "",
  });
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
        setWeatherReport(data);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleReport();
  }, [reportID]);

  const handleEdit = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportID),
    };
    try {
      const res = await fetch(
        `http://localhost:8000/api/reports/${reportID}`,
        requestOptions
      );
      if (!res.ok) {
        const message = "Error with Status Code: " + res.status;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editReportForm">
      <WeatherDataForm />
      <Link to={"/"}>Go back to main page</Link>
    </div>
  );
};
