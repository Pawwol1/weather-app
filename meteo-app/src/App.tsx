import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { EditReportForm } from "./components/EditReportForm/EditReportForm";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit_report/:reportID" element={<EditReportForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
