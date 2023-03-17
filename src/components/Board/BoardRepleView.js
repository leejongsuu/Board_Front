import { React, useState } from "react";
import {
  Button,
  TextField,
  Avatar,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import { useCookies } from "react-cookie";
import SendIcon from "@mui/icons-material/Send";
import SubdirectoryArrowRightOutlinedIcon from "@mui/icons-material/SubdirectoryArrowRightOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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

const BoardRepleView = (props) => {
  const [cookies] = useCookies(["id", "Name"]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ padding: "0px 40px", marginTop: "2rem" }}>
      {cookies.id === undefined ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            color: "gray",
          }}
        >
          <TextField
            style={{ width: "70%", marginBottom: "1rem" }}
            id="input-with-sx"
            error
            label="로그인이 필요합니다. "
            variant="standard"
            disabled
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            color: "gray",
          }}
        >
          <TextField
            style={{ width: "70%", marginBottom: "1rem" }}
            id="input-with-sx"
            label="댓글을 입력해주세요 : "
            variant="standard"
            onKeyDown={props.handleKeyPressReple}
            multiline
            onChange={props.handleChangeReple}
            value={props.reple.Content}
            name={"Content"}
          />
          <Button
            endIcon={<SendIcon />}
            style={{ color: "green" }}
            onClick={props.writeReple}
          ></Button>
        </div>
      )}
      <div>
        {props.repleList.map((reple, i) => {
          return (
            <div key={i}>
              <div
                style={{
                  marginTop: "0.3rem",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  color: "gray",
                }}
              >
                <>
                  {reple.User_id === cookies.id ? (
                    <>
                      <Avatar src="" sx={{ width: 20, height: 20 }} />
                      <span
                        style={{
                          color: "gray",
                          marginLeft: "1rem",
                          marginBottom: "0.2rem",
                          display: "flex",
                          width: "13%",
                        }}
                      >
                        나
                      </span>
                    </>
                  ) : (
                    <>
                      <Avatar src="" sx={{ width: 20, height: 20 }} />
                      <span
                        style={{
                          color: "gray",
                          marginLeft: "1rem",
                          marginBottom: "0.2rem",
                          display: "flex",
                          width: "13%",
                        }}
                      >
                        {props.post.User_id === reple.User_id ? (
                          <span style={{ color: "green", fontweight: "bold" }}>
                            글쓴이
                          </span>
                        ) : (
                          props.checkNumber(reple.User_id)
                        )}
                      </span>
                    </>
                  )}

                  <span style={{ marginLeft: "22rem" }}>
                    {cookies.id !== undefined ? (
                      <Button
                        style={{ padding: "0px" }}
                        onClick={() => {
                          props.clickReple(i);
                        }}
                      >
                        <ChatBubbleIcon
                          style={{ color: "gray" }}
                          fontSize="small"
                        />
                      </Button>
                    ) : null}
                    {reple.User_id === cookies.id &&
                    reple.Content !== "댓글이 삭제되었습니다" ? (
                      <>
                        <Button
                          style={{ color: "black", padding: "0px" }}
                          onClick={() => {
                            props.clickModify(i);
                          }}
                        >
                          {props.isModify[i] === true ? (
                            <>
                              <span>완료</span>
                            </>
                          ) : (
                            <>
                              <BorderColorOutlinedIcon
                                style={{ color: "gray" }}
                                fontSize="small"
                              />
                            </>
                          )}
                        </Button>
                        {props.isModify[i] === true ? (
                          <>
                            <Button
                              style={{ color: "black", padding: "0px" }}
                              onClick={() => {
                                {
                                  props.setIsModify(false);
                                }
                              }}
                            >
                              취소
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              style={{ color: "black", padding: "0px" }}
                              onClick={handleOpen}
                            >
                              <DeleteOutlineOutlinedIcon
                                fontSize="small"
                                style={{ color: "gray" }}
                              />
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
                                <Typography
                                  id="modal-modal-title"
                                  variant="h6"
                                  component="h2"
                                >
                                  삭제하시겠습니까?
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 1 }}
                                >
                                  <Button
                                    style={{ color: "black" }}
                                    onClick={() => {
                                      reple.reComment_ids.length === 0
                                        ? props.deleteReple(i)
                                        : props.delUpdateReple(i);
                                      setOpen(false);
                                    }}
                                  >
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
                          </>
                        )}
                      </>
                    ) : null}
                  </span>
                </>
              </div>
              <div
                style={{
                  marginTop: "0.5rem",
                  marginLeft: "2rem",
                  marginBottom: "1rem",
                }}
              >
                {!props.isModify[i] ? (
                  <span style={{}}>&nbsp;&nbsp;{reple.Content}</span>
                ) : (
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    defaultValue={reple.Content}
                    onChange={(e) => {
                      props.handleChangeRepleEdit(i, e);
                    }}
                    name="Content"
                  />
                )}
              </div>

              {props.reComments.map((Comment, j) => {
                return (
                  <div
                    style={{
                      marginTop: "0.3rem",
                      marginLeft: "5rem",
                      display: "flex",
                    }}
                    key={j}
                  >
                    {props.repleList[i]._id ===
                    props.reComments[j].Comment_id ? (
                      <>
                        <SubdirectoryArrowRightOutlinedIcon color="action" />
                        <div
                          style={{
                            width: "70%",
                            borderRadius: "20px",
                            backgroundColor: "rgba(80,80,80,0.05)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {Comment.User_id === cookies.id ? (
                            <span
                              style={{
                                color: "gray",
                                width: "10%",
                                marginLeft: "1rem",
                              }}
                            >
                              나 :
                            </span>
                          ) : (
                            <span style={{ color: "gray", width: "30%" }}>
                              {props.post.User_id === Comment.User_id ? (
                                <span
                                  style={{
                                    color: "green",
                                    fontweight: "bold",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  글쓴이 :
                                </span>
                              ) : (
                                <span style={{ marginLeft: "1rem" }}>
                                  {props.checkNumber(Comment.User_id)} :
                                </span>
                              )}
                            </span>
                          )}

                          {!props.isModifyComment[j] ? (
                            <span style={{ width: "80%", marginRight: "6rem" }}>
                              {Comment.Content}
                            </span>
                          ) : (
                            <span style={{ width: "80%" }}>
                              <TextField
                                id="standard-basic"
                                variant="standard"
                                type="text"
                                defaultValue={Comment.Content}
                                onChange={(e) => {
                                  props.handleChangeCommentEdit(j, e);
                                }}
                                name="Content"
                              />
                            </span>
                          )}
                        </div>

                        {Comment.User_id === cookies.id ? (
                          <>
                            <Button
                              style={{ color: "black" }}
                              onClick={() => {
                                props.clickModifyComment(j);
                              }}
                            >
                              {props.isModifyComment[j] === true ? (
                                <>
                                  <span>완료</span>
                                </>
                              ) : (
                                <>
                                  <BorderColorOutlinedIcon
                                    style={{ color: "gray" }}
                                    fontSize="small"
                                  />
                                </>
                              )}
                            </Button>
                            {props.isModifyComment[j] === true ? (
                              <>
                                <Button
                                  style={{ color: "black" }}
                                  onClick={() => {
                                    {
                                      props.setIsModifyComment(false);
                                    }
                                  }}
                                >
                                  취소
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  style={{ color: "black" }}
                                  onClick={handleOpen}
                                >
                                  <DeleteOutlineOutlinedIcon
                                    fontSize="small"
                                    style={{ color: "gray" }}
                                  />
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
                                    <Typography
                                      id="modal-modal-title"
                                      variant="h6"
                                      component="h2"
                                    >
                                      삭제하시겠습니까?
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ mt: 1 }}
                                    >
                                      <Button
                                        style={{ color: "black" }}
                                        onClick={() => {
                                          props.deleteComment(j);
                                          setOpen(false);
                                        }}
                                      >
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
                              </>
                            )}
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                );
              })}

              <div style={{ marginLeft: "2.1rem" }}>
                {!props.isReple[i] ? null : (
                  <span style={{ color: "gray", fontSize: "5px" }}>
                    답글 : &nbsp; &nbsp; &nbsp;
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      type="text"
                      onKeyDown={(e) => {
                        props.handleKeyPressComment(i, e);
                      }}
                      onChange={(e) => {
                        props.handleChangeReComment(i, e);
                      }}
                      value={props.Comment.Content}
                      name={"Content"}
                    />
                    <Button
                      endIcon={<SendIcon />}
                      fontSize="small"
                      style={{ color: "green" }}
                      onClick={() => {
                        props.writeReComment();
                        props.clickReple(i);
                      }}
                    ></Button>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardRepleView;
