import React, { useState } from "react";
import { BoardWriteView } from "components/Board";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const BoardWrite = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["id"]);

  const [post, setPost] = useState({
    Title: "",
    Content: "",
    User_id: cookies.id,
  });

  const writeData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(post);
    await axios
      .post(`/api/pages`, body, config)
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePost = (e) => {
    let changePost = { ...post };
    changePost[e.target.name] = e.target.value;
    setPost(changePost);
  };

  return (
    <BoardWriteView
      post={post}
      handleChangePost={handleChangePost}
      writeData={writeData}
    />
  );
};

export default BoardWrite;
