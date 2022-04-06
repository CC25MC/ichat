import { useState } from "react";
import { Box, Typography, styled, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Scrollbars } from "react-custom-scrollbars";
const Input = styled("input")({
  borderRadius: "50px",
  height: "50px",
  padding: "20px",
  width: "100%",
  border: "0",
  outline: "none",
  backgroundColor: "#F5F7FB",
  fontSize: "18px",
});
const Message = ({ message, nombre }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        width: "100%",
        right: "0",
        backgroundColor: message.from === nombre ? "#F5F7FB" : "#4D426D",
        marginTop: 1,
        padding: 2,
        borderRadius:
          message.from === nombre ? "0 50px 50px 50px" : "50px 0 50px 50px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          width: "100%",
          color: message.from === nombre ? "black" : "white",
        }}
        gutterBottom
        component="div"
      >
        {message.body}
      </Typography>
      <Box sx={{ marginLeft: "auto", width: "100px" }}>
        <Typography
          variant="subtitle1"
          fontSize={"12px"}
          sx={{ color: message.from === nombre ? "black" : "white" }}
          gutterBottom
          component="div"
        >
          {message.from}
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize={"12px"}
          sx={{ color: message.from === nombre ? "black" : "white" }}
          gutterBottom
          component="div"
        >
          {message.date}
        </Typography>
      </Box>
    </Box>
  );
};
const Chat = ({ socket, messages, nombre }) => {
  const [body, setBody] = useState("");
  const handlechange = (e) => {
    setBody(e.target.value);
  };
  const emitMessage = () => {
    socket.emit("message", { body: body, from: nombre });
    setBody("");
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Mensajeria:
      </Typography>
      <Scrollbars
        renderTrackHorizontal={(props) => (
          <Box
            {...props}
            // sx={{ display: "none" }}
            className="track-horizontal"
          />
        )}
        style={{
          height: "350px",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} nombre={nombre} />
        ))}
      </Scrollbars>
      <Box sx={{ display: "flex", marginTop: 3 }}>
        <Input
          type="text"
          placeholder="Ingresa tu mensaje"
          value={body}
          onChange={handlechange}
        />
        <IconButton
          onClick={emitMessage}
          sx={{
            height: "50px",
            width: "50px",
            marginLeft: 2,
            backgroundColor: "#3BA58B",
          }}
        >
          <Send sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
