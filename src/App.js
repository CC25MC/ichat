import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  CssBaseline,
  Avatar,
  TextField,
} from "@mui/material";
import logo from "./assets/logo.png";
import Chat from "./components/Chat";
import UsersOnline from "./components/UsersOnline";
import io from "socket.io-client";
function App() {
  const [messages, setMessages] = useState([]);
  const [nombre, setNombre] = useState("");
  const socket = io("http://localhost:5000");
  const handlechange = (e) => {
    setNombre(e.target.value);
  };
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((m) => [...m, message]);
    });
  }, []);

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#F5F7FB",
        padding: 5,
      }}
    >
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          src={logo}
          sx={{ width: 100, height: 80 }}
          variant="rounded"
          alt="logo"
        />
        <Typography
          variant="h4"
          sx={{ marginTop: "1.5%", marginLeft: 3 }}
          gutterBottom
          component="div"
        >
          ICHAT
        </Typography>
      </Box>
      <Box sx={{ marginTop: 5 }} />
      <Grid container spacing={5} sx={{ height: "600px" }}>
        <Grid item xs={8}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "50px",
              height: "100%",
              padding: "50px",
            }}
          >
            <Chat
              nombre={nombre}
              socket={socket}
              setMessages={setMessages}
              messages={messages}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "50px",
              height: "100%",
              padding: "50px",
            }}
          >
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              size="small"
              onChange={handlechange}
            />
            <Box sx={{ marginTop: 2 }} />
            <UsersOnline />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
