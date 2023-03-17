import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Link, Avatar, Box, Typography, Modal } from "@mui/material";
import dayjs from "dayjs";
import { BoardReple } from "domain/Board";

const style = {
  position: "absolute",
  top: "55%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "1px solid ",
  borderRadius: "15px",
  p: 1,
};

const BoardDetailView = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(["id", "Name"]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Format = (time) => {
    return (
      <div>
        <p style={{ marginLeft: "1rem", marginTop: "0.3rem" }}>
          {dayjs(new Date(time)).format("MM/DD hh:mm")}
        </p>
      </div>
    );
  };

  return (
    <div style={{ padding: "0px 50px", height: "600px" }}>
      <div>
        <Link href="/">
          <h1
            style={{
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#000069" }}>WOORO</span>
            <span style={{ color: "#506EA5" }}>TEST</span>
          </h1>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: "4.5rem",
        }}
      >
        {props.post.User_id === cookies.id ? (
          <div>
            <Button
              style={{ color: "black" }}
              onClick={() => navigate(`/board/${id}/edit`)}
            >
              수정
            </Button>
            <Button style={{ color: "black" }} onClick={handleOpen}>
              삭제
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box
                sx={style}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  삭제하시겠습니까?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  <Button style={{ color: "black" }} onClick={props.deleteData}>
                    예
                  </Button>
                  <Button
                    style={{ color: "black" }}
                    onClick={() => setOpen(false)}
                  >
                    아니오
                  </Button>
                </Typography>
              </Box>
            </Modal>
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2rem",
        }}
      >
        <Avatar
          style={{ marginLeft: "3rem" }}
          src=""
          sx={{ width: 50, height: 50 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0",
          }}
        >
          {props.post.User_id !== cookies.id ? (
            <span
              style={{
                color: "gray",
                fontSize: "20px",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              &nbsp;&nbsp; 익명
            </span>
          ) : (
            <span
              style={{
                color: "green",
                fontSize: "20px",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              &nbsp;&nbsp;&nbsp;글쓴이
            </span>
          )}
          <span
            style={{
              color: "gray",
              fontSize: "16px",
              fontWeight: "bold",
              width: "100%",
              marginLeft: "0",
            }}
          >
            {Format(props.post.CreatedAt)}
          </span>
        </div>
      </div>
      <div
        style={{
          marginTop: "1rem",
          marginLeft: "3rem",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        {props.post.Title}
      </div>

      <div
        style={{
          display: "flex",
          marginLeft: "3rem",
          marginTop: "2rem",
          marginRight: "4.5rem",
          flexWrap: "wrap",
        }}
      >
        {props.post.Content}
      </div>
      <hr
        style={{
          width: "90%",
          marginTop: "3rem",
          color: "green",
          border: "1px solid",
        }}
      />
      <div>
        <BoardReple
          post={props.post}
          setUpdate={props.setUpdate}
          repleList={props.repleList}
          reComments={props.reComments}
          checkNumber={props.checkNumber}
        />
      </div>

      <div style={{ height: "50px" }}></div>
    </div>
  );
};

export default BoardDetailView;
