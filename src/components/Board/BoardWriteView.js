import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Link } from "@mui/material";

const BoardWriteView = (props) => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "0px 50px" }}>
      <div style={{ width: "100%", height: "100%", padding: "0px" }}>
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
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          height: "100px",
        }}
      >
        <div style={{ width: "70%", marginTop: "2rem" }}>
          <TextField
            style={{ width: "100%", padding: "0", borderBottom: "2px solid" }}
            label="제목"
            id="standard-required"
            onChange={props.handleChangePost}
            value={props.post.Title}
            variant="standard"
            name={"Title"}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          height: "332px",
        }}
      >
        <div style={{ width: "70%" }}>
          <TextField
            style={{ width: "100%", padding: "0" }}
            label="내용"
            id="standard-required"
            multiline
            rows={13}
            onChange={props.handleChangePost}
            value={props.post.Content}
            name={"Content"}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <Button
          style={{ color: "black", fontWeight: "bold" }}
          onClick={props.writeData}
        >
          등록
        </Button>
        <Button
          style={{ color: "black", fontWeight: "bold" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default BoardWriteView;
