import React, { useState } from "react";
import { BoardRepleView } from "components/Board";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const BoardReple = (props) => {
  const [cookies] = useCookies(["id"]);
  const { id } = useParams();

  const [isModify, setIsModify] = useState([]);
  const [isModifyComment, setIsModifyComment] = useState([]);
  const [isReple, setIsReple] = useState([]);

  const [reple, setReple] = useState({
    Content: "",
    User_id: cookies.id,
    Page_id: id,
  });
  const [repleEdit, setRepleEdit] = useState({
    Content: "",
    User_id: cookies.id,
    Page_id: id,
  });

  const [Comment, setComment] = useState({
    Content: "",
    Comment_id: "",
    User_id: cookies.id,
    Page_id: id,
  });

  const [CommentEdit, setCommentEdit] = useState({
    Content: "",
    Comment_id: "",
    User_id: cookies.id,
    Page_id: id,
  });

  const writeReple = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(reple);
    await axios
      .post(`/api/comments`, body, config)
      .then((res) => {
        let changeReple = { ...reple };
        changeReple["Content"] = "";
        setReple(changeReple);
        props.setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const writeReComment = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = JSON.stringify(Comment);
    await axios
      .post(`/api/reComments`, body, config)
      .then((res) => {
        let changeReComment = { ...Comment };
        changeReComment["Content"] = "";
        setComment(changeReComment);
        props.setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeReple = (e) => {
    let changeReple = { ...reple };
    changeReple[e.target.name] = e.target.value;
    setReple(changeReple);
  };

  const handleChangeRepleEdit = (i, e) => {
    let changeReple = { ...props.repleList[i] };
    changeReple[e.target.name] = e.target.value;
    setRepleEdit(changeReple);
  };

  const handleChangeReComment = (i, e) => {
    let changeReComment = { ...Comment };
    changeReComment.Comment_id = props.repleList[i]._id;
    changeReComment[e.target.name] = e.target.value;
    setComment(changeReComment);
  };

  const handleChangeCommentEdit = (i, e) => {
    let changeComment = { ...props.reComments[i] };
    changeComment[e.target.name] = e.target.value;
    setCommentEdit(changeComment);
  };

  const updateReple = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = {
      _id: repleEdit._id,
      Content: repleEdit.Content,
    };
    await axios
      .put(`/api/comments`, body, config)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const delUpdateReple = async (i) => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = {
      _id: props.repleList[i]._id,
      Content: "댓글이 삭제되었습니다",
    };
    console.log(body);
    await axios
      .put(`/api/comments`, body, config)
      .then((res) => {
        props.setUpdate(true);
        console.log("성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReple = async (index) => {
    await axios({
      method: "delete",
      url: `/api/comments`,
      data: {
        id: props.repleList[index]._id,
      },
    })
      .then((res) => {
        props.setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateComment = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    const body = {
      _id: CommentEdit._id,
      Content: CommentEdit.Content,
    };
    console.log(body);
    await axios
      .put(`/api/reComments`, body, config)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = async (index) => {
    await axios({
      method: "delete",
      url: `/api/reComments`,
      data: {
        id: props.reComments[index]._id,
      },
    })
      .then((res) => {
        props.setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickModify = (index) => {
    let isModifyList = [];
    for (let i = 0; i < props.repleList.length; i++) {
      if (i === index) {
        if (isModify[i] === true) {
          updateReple();
          isModifyList.push(false);
          props.setUpdate(true);
        } else {
          isModifyList.push(true);
        }
      } else {
        isModifyList.push(false);
      }
    }
    setIsModify(isModifyList);
  };

  const clickModifyComment = (index) => {
    let isModifyComments = [];
    for (let i = 0; i < props.reComments.length; i++) {
      if (i === index) {
        if (isModifyComment[i] === true) {
          updateComment();
          isModifyComments.push(false);
          props.setUpdate(true);
        } else {
          isModifyComments.push(true);
        }
      } else {
        isModifyComments.push(false);
      }
    }
    setIsModifyComment(isModifyComments);
  };

  const clickReple = (index) => {
    let isRepleList = [];
    for (let i = 0; i < props.repleList.length; i++) {
      if (i === index) {
        if (isReple[i] === true) {
          isRepleList.push(false);
          props.setUpdate(true);
        } else {
          isRepleList.push(true);
        }
      } else {
        isRepleList.push(false);
      }
    }
    setIsReple(isRepleList);
  };

  const handleKeyPressReple = (e) => {
    if (e.code === "Enter") {
      writeReple();
    }
  };

  const handleKeyPressComment = (i, e) => {
    if (e.code === "Enter") {
      writeReComment();
    }
  };

  return (
    <BoardRepleView
      post={props.post}
      reple={reple}
      Comment={Comment}
      handleChangeReple={handleChangeReple}
      handleChangeRepleEdit={handleChangeRepleEdit}
      handleChangeReComment={handleChangeReComment}
      handleChangeCommentEdit={handleChangeCommentEdit}
      writeReple={writeReple}
      writeReComment={writeReComment}
      repleList={props.repleList}
      reComments={props.reComments}
      deleteReple={deleteReple}
      deleteComment={deleteComment}
      updateReple={updateReple}
      delUpdateReple={delUpdateReple}
      updateComment={updateComment}
      setUpdate={props.setUpdate}
      clickModify={clickModify}
      clickModifyComment={clickModifyComment}
      clickReple={clickReple}
      isModify={isModify}
      isModifyComment={isModifyComment}
      isReple={isReple}
      setIsModify={setIsModify}
      setIsModifyComment={setIsModifyComment}
      setIsReple={setIsReple}
      checkNumber={props.checkNumber}
      handleKeyPressReple={handleKeyPressReple}
      handleKeyPressComment={handleKeyPressComment}
    />
  );
};

export default BoardReple;
