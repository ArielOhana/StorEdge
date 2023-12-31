import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import AdjustableNavBar from "./AdjustableNavBar";
import "../Styles/Sign.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';


export default function SignUp() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [helper, setHelper] = useState(["", "", ""]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleSubmit = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value.toLowerCase();
    let valid = true;


    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasLettersAndNumbers =
      /[a-zA-Z]+[0-9]|[0-9]+[a-zA-Z]/.test(password) && !/[ ]/.test(password);
    const isEmail = /^[\w.]+@[\w.]+\.\w+$/.test(email);
    if (username.length < 8 || /[ ]/.test(username)) {
      valid = false;
      toast("Username must contain at least 8 characters", {
        theme: "colored",
        type: "error",
      });
      setHelper(["Must contain at least 8 characters", helper[1], helper[2]]);
      helper[0] = "Must contain at least 8 characters";
    } else {
      setHelper(["", helper[1], helper[2]]);
      helper[0] = "";
    }
    if (!hasLettersAndNumbers || !hasCapitalLetter || password.length < 8) {
      toast(
        "Password must contain at least 8 characters, one capital letter and one number",
        { theme: "colored", type: "error" }
      );
      valid = false;
      setHelper([
        helper[0],
        "Password must contain atleast 8 characters with one capital letter and one number",
        helper[2],
      ]);
      helper[1] =
        "Password must contain atleast 8 characters with one capital letter and one number";
    } else {
      setHelper([helper[0], "", helper[2]]);
      helper[1] = "";
    }
    if (!isEmail) {
      toast("Email must be valid", { theme: "colored", type: "error" });
      valid = false;
      setHelper([helper[0], helper[1], "Must contain a proper Email adress"]);
    } else {
      setHelper([helper[0], helper[1], ""]);
    }
    if (valid) {
      const ValidData = {username, password, email,list:[]};
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isExists = users.some(
      (element) => element.username === ValidData.username ||element.email===ValidData.email
    );

    if (isExists) {
      toast("Username or email already exists", {theme: "colored", type:"error"});
    } else {
        setUser(ValidData);
      users.push(ValidData);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/mainpage")
    }
    }
  };

  return (
    <>
      <AdjustableNavBar>
      
      <Link to="/signin" style={{padding: '0 13px'}}><IconButton aria-label="Log in" sx={{ fontSize:40, padding: '0' }}>
            <div style={{display:"flex", flexDirection:'column'}}>  <LoginIcon fontSize='large' /> <span style={{fontSize:12,margin:0}}>Sign in</span>          </div>
                        </IconButton></Link>
              
                        <Link to="/" style={{padding: '0 13px'}}><IconButton aria-label="home page" sx={{ fontSize:40, padding: '0' }}>
            <div style={{display:"flex", flexDirection:'column'}}>  <HomeIcon fontSize='large' /> <span style={{fontSize:12,margin:0}}>Home</span>          </div>
                        </IconButton></Link>
              
      </AdjustableNavBar>
      
      <ToastContainer />
      <div className="outofpage-container">
        <div className="page-container">
          <h2 className="header-text">Sign Up</h2>
        
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
              color={helper[0] ? "error" : "success"}
              required
              label="Username"
              helperText={helper[0]}
              variant="outlined"
              inputRef={usernameRef}
            />
            <TextField
              sx={{ m: 1, width: "60%" }}
              color={helper[1] ? "error" : "success"}
              required
              label="Password"
              helperText={helper[1]}
              type="password"
              variant="outlined"
              inputRef={passwordRef}
            />
            <TextField
              sx={{ m: 1, width: "60%" }}
              color={helper[2] ? "error" : "success"}
              required
              label="Email"
              helperText={helper[2]}
              type="email"
              variant="outlined"
              inputRef={emailRef}
            />
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
