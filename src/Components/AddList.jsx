import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../Styles/Addlist.css';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../App';
import * as React from 'react';
import Table from '@mui/joy/Table';
import AddIcon from '@mui/icons-material/Add';

export default function AddList({ handleClose, ClickedOn }) {
  const { user, setUser } = useContext(UserContext);
  const NewItemNameRef = useRef(null);
  const NewItemAmountRef = useRef(null);
  const NewItemLocationRef = useRef(null);
  const NewItemWeightRef = useRef(null);
  let list = {};
  user.list[ClickedOn] ? (list = user.list[ClickedOn]) : (list = {name:'', items: []});
  user.list[ClickedOn] = list;
  const ListNameRef = useRef(null);
  const handleClick = () => handleClose();
  const [removedRows, setRemovedRows] = useState([]); // State to keep track of removed row
  const additem = () => {
    const updatedUser = { ...user };
    const userDataArray = JSON.parse(localStorage.getItem('users'));
    const userIndex = userDataArray.findIndex(
      (userData) => userData.username === updatedUser.username
    );
    userDataArray[userIndex] = updatedUser
    setUser(user)
    localStorage.setItem('users', JSON.stringify(userDataArray));
    if (
      userDataArray[userIndex] &&
      userDataArray[userIndex].list &&
      userDataArray[userIndex].list[ClickedOn] &&
      userDataArray[userIndex].list[ClickedOn].items
    ) {
      const listToModify = userDataArray[userIndex].list[ClickedOn];
      const updatedItems = [...listToModify.items];

      const newItemData = {
        name: NewItemNameRef.current.value,
        amount: NewItemAmountRef.current.value,
        location: NewItemLocationRef.current.value,
        weight: NewItemWeightRef.current.value,
      };

      updatedItems.push(newItemData);
      listToModify.items = updatedItems;

      userDataArray[userIndex].list[ClickedOn] = listToModify;
      localStorage.setItem('users', JSON.stringify(userDataArray));
      setUser({ ...user, list: userDataArray[userIndex].list });
    }
  };
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
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <TextField inputRef={ListNameRef} placeholder={list.name || 'List Name'} variant="standard" />
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
            {list.items.map((item, index) => {
              if (!removedRows.includes(index)) {
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
            <tr>
              <td><TextField inputRef={NewItemNameRef} variant="standard" /></td>
              <td><TextField inputRef={NewItemAmountRef} variant="standard" /></td>
              <td><TextField inputRef={NewItemLocationRef} variant="standard" /></td>
              <td><TextField inputRef={NewItemWeightRef} variant="standard" /></td>
              <div onClick={additem}>
                <IconButton aria-label="Add" sx={{ mt: 'auto' }}>
                  <AddIcon />
                </IconButton>
              </div>
            </tr>
          </tbody>
        </Table>
      </div>
      <Button color='success' variant='outlined'>Save</Button>
    </div>
  );
}
