import React from "react";
import { Grid, Link, Avatar, AvatarGroup } from "@mui/material";
import Jola from "static/images/Avatar/1.jpeg";
import Jola2 from "static/images/Avatar/3.jpeg";
const MainView = (props) => {
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

      <Grid style={{ textAlign: "center", padding: "16px" }}>
        <AvatarGroup
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <div>
            <Link href="user">
              <Avatar
                src={Jola2}
                sx={{ width: 250, height: 250, boxShadow: "3" }}
              />
            </Link>
            <div style={{ marginTop: "2rem" }}></div>User
          </div>
          <div>
            <Link href="board">
              <Avatar
                src={Jola}
                sx={{ width: 250, height: 250, boxShadow: "3" }}
              />
            </Link>
            <div style={{ marginTop: "2rem" }}></div>Notice Board
          </div>
        </AvatarGroup>
      </Grid>
      <hr
        style={{ marginTop: "3.5rem", color: "green", border: "1px solid" }}
      />
    </>
  );
};

export default MainView;
