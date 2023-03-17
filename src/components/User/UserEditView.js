import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Avatar, Button, Link, TextField } from "@mui/material";
const UserEditView = (props) => {
  const navigate = useNavigate();
  return (
    <>
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

      <Grid style={{ margin: "4rem" }}>
        <h2 style={{ display: "flex", justifyContent: "center" }}>프로필</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Avatar src="" sx={{ width: 200, height: 200 }} />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3>
            <div>
              이름 :
              <TextField
                style={{ marginLeft: "1rem" }}
                id="standard-basic"
                variant="standard"
                type="text"
                value={props.user.Name}
                onChange={props.handleChangeUser}
                name={"Name"}
              />
            </div>
          </h3>
          <h4 style={{ marginLeft: "3rem" }}>
            <div>
              번호:
              <TextField
                style={{ marginLeft: "1rem" }}
                id="standard-basic"
                variant="standard"
                type="text"
                value={props.user.Phone}
                onChange={props.handleChangeUser}
                name={"Phone"}
              />
            </div>
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button variant="outlined" onClick={props.updateData}>
            완료
          </Button>
          <Button onClick={() => navigate(-1)}>취소</Button>
        </div>
      </Grid>
    </>
  );
};

export default UserEditView;
