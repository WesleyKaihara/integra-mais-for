import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from "../Pages/Home";
import Admininstrador from '../Pages/Administrador';

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/administrador" element={<Admininstrador />} exact />
      </Routes>
    </Router>

  )
}