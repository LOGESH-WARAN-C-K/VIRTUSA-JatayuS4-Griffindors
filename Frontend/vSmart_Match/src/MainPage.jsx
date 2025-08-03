import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Inside MainPage function
const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/"); // redirect to login
  }
}, []);
