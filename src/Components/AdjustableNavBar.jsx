import "../Styles/AdjustableNavBar.css";
import React, { useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import Icon from "../assets/storageicon.png";

export default function AdjustableNavBar({ children }) {
  const { user, setUser } = useContext(UserContext);



  return (
  <div className="NavBar">
    <img id="icon" src={Icon} alt="" />
<div>
  <span style={{fontSize:'2rem'}}>Stor</span><span style={{fontSize:'2rem', color:'#B0D9B1'}}>Edge</span>
</div>
<div className="children-div">
{children}
</div>
  </div>
  );
}