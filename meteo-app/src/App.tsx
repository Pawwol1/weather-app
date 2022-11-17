import React from "react";
import { WeatherDataDisplay } from "./components/WeatherDataDisplay/WeatherDataDisplay";
import { WeatherDataForm } from "./components/WeatherDataForm/WeatherDataForm";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <WeatherDataForm />
      <WeatherDataDisplay />
    </div>
  );
}

export default App;
