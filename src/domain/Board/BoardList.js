import React, { useEffect } from "react";
import { BoardListView } from "components/Board";
import { useState } from "react";
import axios from "axios";

const BoardList = () => {
  const [posts, setPosts] = useState([
    {
      User_id: { _id: "", Name: "" },
      Title: "",
      Content: "",
      CreatedAt: "1999-09-09",
    },
  ]);

  const loadDatas = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    await axios
      .get("/api/pages", config)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadDatas();
  }, []);
  return (
    <>
      <BoardListView posts={posts} />
    </>
  );
};

export default BoardList;
