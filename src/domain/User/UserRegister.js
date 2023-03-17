import React, { useState } from "react";
import { UserRegisterView } from "components/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    Name: "",
    Phone: "",
  });

  const registerData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(user);
    await axios
      .post(`/api/users`, body, config)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUser = (e) => {
    let changeUser = { ...user };
    changeUser[e.target.name] = e.target.value;
    setUser(changeUser);
  };

  return (
    <div>
      <UserRegisterView
        user={user}
        handleChangeUser={handleChangeUser}
        registerData={registerData}
      />
    </div>
  );
};
export default UserRegister;
