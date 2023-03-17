import React, { useEffect, useState } from "react";
import { UserEditView } from "components/User";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState({
    Name: "",
    Phone: "",
  });

  const loadData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    await axios
      .get(`/api/users/${id}`, config)
      .then((res) => {
        setUser(res.data);
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

  const updateData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(user);
    await axios
      .put(`/api/users`, body, config)
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <UserEditView
        user={user}
        handleChangeUser={handleChangeUser}
        updateData={updateData}
      />
    </>
  );
};

export default UserEdit;
