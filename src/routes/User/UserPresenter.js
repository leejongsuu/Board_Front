import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFonund from "routes/NotFound";
import { UserList, UserDetail, UserEdit, UserRegister } from "domain/User";

const UserPresenter = () => {
  return (
    <Routes>
      <Route path="" element={<UserList />} />
      <Route path=":id" element={<UserDetail />} />
      <Route path=":id/edit" element={<UserEdit />} />
      <Route path="register" element={<UserRegister />} />
      <Route path="*" element={<NotFonund />} />
    </Routes>
  );
};

export default UserPresenter;
