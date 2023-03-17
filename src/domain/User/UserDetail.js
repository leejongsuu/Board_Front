import React, { useEffect, useState } from "react";
import { UserDetailView } from "components/User";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const deleteData = async () => {
    await axios({
      method: "delete",
      url: `/api/users`,
      data: {
        id: user._id,
      },
    })
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
      <UserDetailView user={user} deleteData={deleteData} />
    </>
  );
};

export default UserDetail;
