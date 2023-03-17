import React, { useEffect, useState } from "react";
import { UserListView } from "components/User";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["id", "Name"]);

  const [users, setUsers] = useState([
    {
      Name: "",
      Phone: "",
    },
  ]);

  const loadDatas = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    await axios
      .get("/api/users", config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = async (key) => {
    await axios({
      method: "delete",
      url: `/api/users`,
      data: {
        id: users[key]._id,
      },
    })
      .then((res) => {
        let deleteUser = [...users];
        deleteUser.splice(key, 1);
        setUsers(deleteUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickUser = (_id, name) => {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    setCookie("id", _id, { path: "/", expires: date });
    setCookie("Name", name, { path: "/", expires: date });
    navigate("/board");
  };

  useEffect(() => {
    loadDatas();
  }, []);

  return (
    <>
      <UserListView
        users={users}
        deleteData={deleteData}
        handleClickUser={handleClickUser}
      />
    </>
  );
};

export default UserList;
