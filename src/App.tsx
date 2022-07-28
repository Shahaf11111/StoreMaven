import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLoginPage from "./pages/login";
import GamePage from "./pages/game";
import { Box } from "@mui/material";
import AlertBar from "./features/alert";

export default function App() {
  return (
    <Box>
      <AlertBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/home" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
