import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFonund from "routes/NotFound";
import { Main } from "domain/Main";

const MainPresenter = () => {
  return (
    <Routes>
      <Route path="" element={<Main />} />
      <Route path="*" element={<NotFonund />} />
    </Routes>
  );
};

export default MainPresenter;
