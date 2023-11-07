import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import AdjustableNavBar from "./AdjustableNavBar";
import "../Styles/Sign.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';


export default function SignIn() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { user, setUser } = useContext(UserContext);
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const navigate = useNavigate();

  const handleSubmit = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const data = {username,password}
    const isExists = users.some((element) =>
    (element.username === data.username && element.password === data.password)
      ? setTrue(element)
      : false
  );
  
  if (isExists) {
    navigate("/mainpage");
  } else {
    toast("Username or password invalid, try again", {theme: "colored", type:"error"});

  }
  }
  

  function setTrue(element) {
    setUser(element);
    return true;
  }
  return (
    <>
      <AdjustableNavBar>
      <Link to="/" style={{padding: '0 13px'}}><IconButton aria-label="home page" sx={{ fontSize:40, padding: '0' }}>
            <div style={{display:"flex", flexDirection:'column'}}>  <HomeIcon fontSize='large' /> <span style={{fontSize:12,margin:0}}>Home</span>          </div>
                        </IconButton></Link>
      </AdjustableNavBar>
      
      <ToastContainer />
      <div className="outofpage-container">
        <div className="page-container">
          <h2 className="header-text">Sign In</h2>
        
          <div
            className="textfields-holder"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              sx={{ m: 1, width: "60%" }}
              color="success"
              required
              label="Username"
              variant="outlined"
              inputRef={usernameRef}
            />
            <TextField
              sx={{ m: 1, width: "60%" }}
              color="success"
              required
              label="Password"
              type="password"
              variant="outlined"
              inputRef={passwordRef}
            />
          <div><span>Don't have account yet? </span> <Link to="../signup"><span>Press here</span></Link></div>
            <button
              className="submit-button"
              style={{
                backgroundColor: "#79AC78",
                height: "3rem",
                width: "6rem",
                borderRadius: "8%",
                marginTop: "1rem",
              }}
              onClick={handleSubmit}
            >
              <span>Submit</span>
            </button>
          </div>
          
        </div>
      </div>
     
    </>
  );
}