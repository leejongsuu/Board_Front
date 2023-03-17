import React, { useEffect, useState } from "react";
import { BoardEditView } from "components/Board";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BoardEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({
    Title: "",
    Content: "",
  });

  const loadData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    await axios
      .get(`/api/pages/${id}`, config)
      .then((res) => {
        setPost(res.data);
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

  const updateData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(post);
    await axios
      .put(`/api/pages`, body, config)
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
    <BoardEditView
      post={post}
      handleChangePost={handleChangePost}
      updateData={updateData}
    />
  );
};
export default BoardEdit;
