import { React, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Link,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
const UserListView = (props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(-1);
  const handleOpen = (key) => {
    setSelectOpen(key);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectOpen(-1);
    setOpen(false);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
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

      <TableContainer style={{ marginTop: "5rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map((user, i) => (
              <TableRow className="table_hover">
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Link style={{ color: "black" }} href={`/user/${user._id}`}>
                    {user.Name}
                  </Link>
                </TableCell>
                <TableCell>{user.Phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => props.handleClickUser(user._id, user.Name)}
                  >
                    Login
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="warning"
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      navigate(`/user/${user._id}/edit`);
                    }}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="contained"
                    disableElevatio
                    onClick={() => handleOpen(i)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "3rem",
          marginTop: "3rem",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/user/register");
          }}
        >
          회원 등록
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
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
              <Button
                style={{ color: "black" }}
                onClick={() => {
                  props.deleteData(selectOpen);
                  handleClose();
                }}
              >
                예
              </Button>
              <Button style={{ color: "black" }} onClick={() => setOpen(false)}>
                아니오
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
export default UserListView;
