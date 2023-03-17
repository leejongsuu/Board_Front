import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFonund from "routes/NotFound";
import { BoardDetail, BoardEdit, BoardList, BoardWrite } from "domain/Board";

const BoardPresenter = () => {
  return (
    <Routes>
      <Route path="" element={<BoardList />} />
      <Route path="/write" element={<BoardWrite />} />
      <Route path=":id" element={<BoardDetail />} />
      <Route path=":id/edit" element={<BoardEdit />} />
      <Route path="*" element={<NotFonund />} />
    </Routes>
  );
};

export default BoardPresenter;
