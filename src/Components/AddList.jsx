import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Styles/Addlist.css';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../App';
import * as React from 'react';
import Table from '@mui/joy/Table';

export default function AddList({ handleClose, ClickedOn }) {
  const { user, setUser } = useContext(UserContext);

  let list = {};
  ClickedOn >= 0 ? (list = user.list[ClickedOn]) : (list = {});
  const ListNameRef = useRef(null);
  const handleClick = () => handleClose();
  const [removedRows, setRemovedRows] = useState([]); // State to keep track of removed rows
  const removeitem = (index) => {
    const updatedUser = { ...user };
    const userDataArray = JSON.parse(localStorage.getItem("users"));
    const userIndex = userDataArray.findIndex(
      (userData) => userData.username === updatedUser.username
    );
  
    if (
      userDataArray[userIndex] &&
      userDataArray[userIndex].list &&
      userDataArray[userIndex].list[ClickedOn] &&
      userDataArray[userIndex].list[ClickedOn].items
    ) {
      const listToModify = userDataArray[userIndex].list[ClickedOn];
      const updatedItems = [...listToModify.items];
      updatedItems.splice(index, 1);
      listToModify.items = updatedItems;
  
      userDataArray[userIndex].list[ClickedOn] = listToModify;
  
      setUser({ ...user, list: [listToModify] });
      localStorage.setItem("users", JSON.stringify(userDataArray));
    }
  };
  

  return (
    <div className="main-div">
      <div style={{ display: 'flex', width: '100%', justifyContent: "center", alignItems: 'center' }}>
        <TextField label="List Name" inputRef={ListNameRef} value={list?.name ? list.name : ''} variant="standard" />
        <div onClick={handleClick}>
          <IconButton aria-label="delete" sx={{ mt: 'auto' }}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className='main-data'>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Items</th>
              <th>Amount</th>
              <th>Location</th>
              <th>Weight&nbsp;(kg/total)</th>
            </tr>
          </thead>
          <tbody>
            {list?.items?.map((item, index) => {
              if (!removedRows.includes(index)) { // Skip rendering removed rows
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                    <td>{item.location}</td>
                    <td>{item.weight}</td>
                    <td>
                      <div onClick={() => removeitem(index)}>
                        <IconButton aria-label="delete" sx={{ mt: 'auto' }}>
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </Table>
      </div>
      <Button color='success' variant='outlined'>Save</Button>
    </div>
  );
}
