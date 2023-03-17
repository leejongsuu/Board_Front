import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Button,
  TableHead,
} from "@mui/material";

const BoardListView = (props) => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["id", "Name"]);

  const handleClickLogOut = () => {
    removeCookie("id", { path: "/" });
    removeCookie("Name", { path: "/" });
    navigate("/");
  };

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

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

      <div>
        {cookies.id === undefined ? (
          <div>
            <h4
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "2rem",
              }}
            >
              사용자 :&nbsp; Guest
            </h4>
            <h5
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "2rem",
              }}
            >
              <Button
                onClick={() => {
                  navigate("/user");
                }}
              >
                로그인
              </Button>
            </h5>
          </div>
        ) : (
          <div>
            <h4
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "2rem",
              }}
            >
              사용자 :&nbsp; {cookies.Name}
            </h4>
            <h5 style={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={() => {
                  navigate("/board/write");
                }}
              >
                글쓰기
              </Button>
              <Button
                style={{ marginLeft: "1rem", marginRight: "1rem" }}
                onClick={handleClickLogOut}
              >
                로그아웃
              </Button>
            </h5>
          </div>
        )}
      </div>
      <h3 style={{ marginLeft: "0.5rem", color: "#506EA5" }}>자유게시판</h3>
      <hr style={{ borderBottom: "2px solid", borderBottomColor: "#506EA5" }} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                No
              </TableCell>
              <TableCell
                align="center"
                style={{ width: "40%", fontWeight: "bold" }}
              >
                제목
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                글쓴이
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                작성일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ width: "100%" }}>
            {props.posts.map((post, i) => (
              <TableRow className="table_hover">
                <TableCell style={{ fontWeight: "bold" }}>{i + 1}</TableCell>
                <TableCell align="center">
                  <Link
                    key={i}
                    style={{
                      cursor: "pointer",
                      textDecorationLine: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    href={`/board/${post._id}`}
                  >
                    {post.Title}
                  </Link>
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "gray", fontWeight: "bold" }}
                >
                  {post.User_id._id === cookies.id ? "나" : "익명"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ color: "gray", fontWeight: "bold" }}
                >
                  {detailDate(new Date(post.CreatedAt))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export default BoardListView;
