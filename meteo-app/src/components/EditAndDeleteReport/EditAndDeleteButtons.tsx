import React from "react";
import { Link } from "react-router-dom";
import { WeatherReport } from "../WeatherDataDisplay/WeatherDataDisplay";
import "./EditAndDeleteButtons.scss";

export const EditAndDeleteButtons = (props: {
  weatherReport: WeatherReport;
}) => {
  const { weatherReport } = props;

  const handleDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await fetch(
        `http://localhost:8000/api/reports/${weatherReport.id}`,
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
    <div className="editAndDeleteButtons">
      <button className="editAndDeleteButtons_edit">
        <Link to={`/edit_report/${weatherReport.id}`}>Edit</Link>
      </button>
      <button className="editAndDeleteButtons__delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
