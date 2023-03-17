import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import NotFonund from "./NotFound";
import User from "./User";
import Board from "./Board";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Main />} />
      <Route path="user/*" element={<User />} />
      <Route path="board/*" element={<Board />} />
      <Route path="/*" element={<NotFonund />} />
    </Routes>
  );
};

export default MainRoutes;
