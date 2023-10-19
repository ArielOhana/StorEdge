import React, { useContext, useState } from 'react';
import '../Styles/MainPage.css'
import AddList from './AddList';
import { UserContext } from '../App';
import AdjustableNavBar from './AdjustableNavBar';
import { Link } from 'react-router-dom';
import { Box, Modal } from '@mui/material';

export default function MainPage()  {
    const { user, setUser } = useContext(UserContext);
    const [ClickedOn, setClickedOn] = useState(user.list.length);
        console.log(ClickedOn);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
      console.log(user)
      const [open, setOpen] = React.useState(false);
      const autoClose = () => setOpen(false);;
      const handleOpen = () => {setOpen(true); setClickedOn((prev) => {return prev + 1});};
      const handleClose = () => {setOpen(false); 
    
    }
    return (
        <>
        <AdjustableNavBar>
        <Link to="/" style={{ padding: "0 13px" }}>
          <h4>Log out</h4>
        </Link>
        <Link onClick={handleOpen}><h4>Add List</h4></Link>
        </AdjustableNavBar>
        <div>
        <Modal
  open={open}
  onClose={autoClose}
>
  <Box sx={style}>
     <AddList handleClose={handleClose} ClickedOn={ClickedOn}/>

  </Box>
</Modal>
        </div>
        </>
    )
}
