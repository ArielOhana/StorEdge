import React, { useContext, useEffect, useState } from 'react';
import '../Styles/MainPage.css'
import { UserContext } from '../App';
import AdjustableNavBar from './AdjustableNavBar';
import { Link, useNavigate } from 'react-router-dom';
import { Box, IconButton, Modal } from '@mui/material';
import List from './List';
import AddAdvancedList from './AddAdvancedList';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddBoxIcon from '@mui/icons-material/AddBox';
export default function MainPage()  {
    const { user, setUser } = useContext(UserContext);
    const [ClickedOn, setClickedOn] = useState(user?.list?.length);
    const [open, setOpen] = React.useState(false);
    const autoClose = () => setOpen(false);;
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false);} 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
      const navigate = useNavigate()
      useEffect(() => {
        if (!user?.username) {
          navigate("/error");
        }
      }, [user, navigate]);
    
      const RemoveList = (index) => {
        const updatedUsers = JSON.parse(localStorage.getItem("users"));
        const userIndex = updatedUsers.findIndex((userData) => userData.username === user.username);
      
        if (userIndex !== -1) {
          updatedUsers[userIndex].list?.splice(index, 1);
      
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
          <Link to="/" style={{padding: '13px 13px'}}><IconButton aria-label="home page" sx={{ fontSize:40, padding: '0' }}>
            <div style={{display:"flex", flexDirection:'column'}}>  <LogoutRoundedIcon fontSize='large' /> <span style={{fontSize:12,margin:0}}>Log out</span>          </div>
                        </IconButton></Link>
                        <Link onClick={handleOpen} style={{padding: '13px 13px'}}><IconButton aria-label="home page" sx={{ fontSize:40, padding: '0' }}>
            <div style={{display:"flex", flexDirection:'column'}}>  <AddBoxIcon fontSize='large' /> <span style={{fontSize:12,margin:0}}>Add</span>          </div>
                        </IconButton></Link>
          </AdjustableNavBar>
          <div>
          <Modal
  open={open}
  onClose={autoClose}
>
  <Box sx={style}>
     <AddAdvancedList handleClose={handleClose}/>
  </Box>
</Modal>
            {user?.list?.map((list, index) => (
              <List key={index} ClickedOn={index} RemoveList={RemoveList} />
            ))}
          </div>
        </>
      )
      
     
}
