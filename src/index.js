import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinDetail from "./components/CoinDetail";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/coins/:id" element={<CoinDetail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
