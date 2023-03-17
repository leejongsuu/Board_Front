import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Grid,
  Button,
  Link,
  Box,
  Typography,
  Modal,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "75%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "1px solid ",
  borderRadius: "15px",
  p: 1,
};

const UserDetailView = (props) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <hr style={{ width: "50%" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <h3>{props.user.Name}</h3>
          <h4 style={{ marginLeft: "3rem" }}>{props.user.Phone}</h4>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(`/user/${id}/edit`)}
          >
            수정하기
          </Button>
          <Button variant="outlined" onClick={handleOpen}>
            삭제하기
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

          <Button onClick={() => navigate(-1)}>뒤로가기</Button>
        </div>
      </Grid>
    </>
  );
};

export default UserDetailView;
