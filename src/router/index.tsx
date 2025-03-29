import React from "react";

import { Routes, Route } from "react-router";
import App from "../App";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
    </Routes>
  );
}
