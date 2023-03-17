import React, { useEffect } from "react";
import { BoardDetailView } from "components/Board";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BoardDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [update, setUpdate] = useState(true);
  const [post, setPost] = useState({
    Title: "",
    Content: "",
  });
  const [repleList, setRepleList] = useState([
    {
      _id: "",
      Content: "",
      User_id: "",
    },
  ]);
  const [reComments, setReComments] = useState([
    {
      Content: "",
      Comment_id: "",
      User_id: "",
      Page_id: id,
    },
  ]);

  const checkNumber = (ID) => {
    let temp = [];
    temp.push(post.User_id);
    for (let i = 0; i < repleList.length; i++) {
      temp.push(repleList[i].User_id);
    }
    for (let j = 0; j < reComments.length; j++) {
      temp.push(reComments[j].User_id);
    }

    let array = [...new Set(temp)];
    let num = [{}];

    for (let i = 0; i < array.length; i++) {
      num[i] = { name: `익명${i}`, id: array[i] };
    }
    for (let j = 0; j < array.length; j++) {
      if (num[j].id === ID) return num[j].name;
    }
  };

  const loadData = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    await axios
      .get(`/api/pages/${id}`, config)
      .then((res) => {
        setPost(res.data);
        setRepleList(res.data.Comment_ids);
        setReComments(res.data.reComment_ids);
        setUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = async () => {
    await axios({
      method: "delete",
      url: `/api/pages`,
      data: {
        id: post._id,
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
    if (update === true) {
      loadData();
    }
  }, [update]);

  return (
    <BoardDetailView
      post={post}
      setUpdate={setUpdate}
      deleteData={deleteData}
      repleList={repleList}
      reComments={reComments}
      checkNumber={checkNumber}
    />
  );
};

export default BoardDetail;
