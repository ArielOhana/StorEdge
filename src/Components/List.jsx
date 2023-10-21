import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../App';
import * as React from 'react';
import Table from '@mui/joy/Table';
import AddIcon from '@mui/icons-material/Add';
import ChangeNameIcon from '@mui/icons-material/PublishedWithChanges';
import '../Styles/List.css'
export default function List({ClickedOn, RemoveList }) {
    const { user, setUser } = useContext(UserContext);
    const NewItemNameRef = useRef(null);
    const NewItemAmountRef = useRef(null);
    const NewItemLocationRef = useRef(null);
    const NewItemWeightRef = useRef(null);
    const ListNameRef = useRef(null);
    const TrashListPressed = () => RemoveList(ClickedOn);
    let list = user.list[ClickedOn] || {name: '', items:[]};
    const ChangeName = () => {
        const userDataArray = JSON.parse(localStorage.getItem("users"));
        const userIndex = userDataArray.findIndex(
          (userData) => userData.username === user.username
        );
        const newlistname = ListNameRef.current.value;
        userDataArray[userIndex].list[ClickedOn].name = newlistname;
        user.list[ClickedOn].name = newlistname;
        setUser({...user})
        localStorage.setItem("users", JSON.stringify(userDataArray));

    }
    const removeitem = (index) => {
        const userDataArray = JSON.parse(localStorage.getItem("users"));
        const userIndex = userDataArray.findIndex(
          (userData) => userData.username === user.username
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
                const updatedUser = {
            ...user,
            list: [...userDataArray[userIndex].list]
          };
      
          setUser(updatedUser);
          localStorage.setItem("users", JSON.stringify(userDataArray));
        }
      };
      const additem = () => {
        const newItemName = NewItemNameRef.current.value;
        const newItemAmount = NewItemAmountRef.current.value;
        const newItemLocation = NewItemLocationRef.current.value;
        const newItemWeight = NewItemWeightRef.current.value;
      
        if (!newItemName || !newItemAmount || !newItemLocation || !newItemWeight) {
          return;
        }
      
        const newItem = {
          name: newItemName,
          amount: newItemAmount,
          location: newItemLocation,
          weight: newItemWeight,
        };
      
        const userDataArray = JSON.parse(localStorage.getItem("users"));
        const userIndex = userDataArray.findIndex((userData) => userData.username === user.username);
      
        if (
          userDataArray[userIndex] &&
          userDataArray[userIndex].list &&
          userDataArray[userIndex].list[ClickedOn] &&
          userDataArray[userIndex].list[ClickedOn].items
        ) {
          const listToModify = userDataArray[userIndex].list[ClickedOn];
          listToModify.items.push(newItem);
      
          userDataArray[userIndex].list[ClickedOn] = listToModify;
      
          const updatedUser = {
            ...user,
            list: [...userDataArray[userIndex].list]
          };
      
          setUser(updatedUser);
          localStorage.setItem("users", JSON.stringify(userDataArray));
      
          // Clear the input fields after adding the item
          NewItemNameRef.current.value = "";
          NewItemAmountRef.current.value = "";
          NewItemLocationRef.current.value = "";
          NewItemWeightRef.current.value = "";
        }
      };
    return(<>
    <div className='page-div'>
     <div className="main-div">
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div onClick={() => ChangeName()}>
                        <IconButton aria-label="delete" sx={{ mt: 'auto' }}>
                          <ChangeNameIcon />
                        </IconButton>
                      </div>
        <TextField inputRef={ListNameRef} placeholder={list?.name || 'List Name'} variant="standard" />
        <div onClick={TrashListPressed}>
          <IconButton aria-label="delete" sx={{ mt: 'auto' }}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className='main-data'>
        <Table aria-label="basic table"  size={'sm'} stripe={`2n-1`}>
          <thead>
            <tr>
              {list.catagories ? (<>
              {list.catagories.map((data,index)=> {return (<th style={index == 0 ? {width:'30%'}:{width:'15%'}} >{list.catagories[index]}</th>)  
            } )}<th style={{width:'12%'}}>Add/Remove</th></>): (<><th style={{ width: '40%' }}>Items</th>
              <th>Amount</th>
              <th>Location</th>
              <th>Weight&nbsp;(kg/total)</th>
              <th>Add/Remove</th></>)}
            </tr>
          </thead>
          <tbody>
            {list.items.map((item, index) => {
             
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
              
            )}
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
    </div>
    </div></>)
}
