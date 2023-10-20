import React, { useContext, useState } from 'react';
import '../Styles/MainPage.css'
import { UserContext } from '../App';
import AdjustableNavBar from './AdjustableNavBar';
import { Link } from 'react-router-dom';
import { Box, Modal } from '@mui/material';
import List from './List';

export default function MainPage()  {
    const { user, setUser } = useContext(UserContext);
    const [ClickedOn, setClickedOn] = useState(user.list.length);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
      const RemoveList = (index) => {
        const updatedUsers = JSON.parse(localStorage.getItem("users"));
        const userIndex = updatedUsers.findIndex((userData) => userData.username === user.username);
      
        if (userIndex !== -1) {
          updatedUsers[userIndex].list.splice(index, 1);
      
          const updatedUser = {
            ...user,
            list: updatedUsers[userIndex].list
          };
      
          setUser(updatedUser);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
      }
      const AddList = () => {
        const updatedUsers = JSON.parse(localStorage.getItem("users"));
        const userIndex = updatedUsers.findIndex((userData) => userData.username === user.username);
      
        if (userIndex !== -1) {
          updatedUsers[userIndex].list.push({name:'new list', items:[]});
      
          const updatedUser = {
            ...user,
            list: updatedUsers[userIndex].list
          };
      
          setUser(updatedUser);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        }
      }
    
    
      return (
        <>
          <AdjustableNavBar>
            <Link to="/" style={{ padding: "0 13px" }}>
              <h4>Log out</h4>
            </Link>
            <Link onClick={AddList}><h4>Add List</h4></Link>
          </AdjustableNavBar>
          <div>
            {user.list.map((list, index) => (
              <List key={index} ClickedOn={index} RemoveList={RemoveList} />
            ))}
          </div>
        </>
      )
      
     
}
