import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../App';
import * as React from 'react';
import Table from '@mui/joy/Table';
import AddIcon from '@mui/icons-material/Add';
import ChangeNameIcon from '@mui/icons-material/PublishedWithChanges';
import '../Styles/List.css'
import Chart from 'react-google-charts';
import { Delete } from '@mui/icons-material';
export default function List({ClickedOn, RemoveList }) {
    const { user, setUser } = useContext(UserContext);
    const NewItemNameRef = useRef(null);
    const NewItemAmountRef = useRef(null);
    const NewItemLocationRef = useRef(null);
    const NewItemWeightRef = useRef(null);
    const ListNameRef = useRef(null);
    const TrashListPressed = () => RemoveList(ClickedOn);
    let list = user.list[ClickedOn] || {name: '', items:[]};
    function isValueMatchingType(type, value) {
      type = type.toLowerCase();
      return (type === 'string' && (typeof value === 'string' || !isNaN(value))) ||
             (type === 'number' && (typeof value === 'number' || !isNaN(value)));
    }
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
        if(!isValueMatchingType(userDataArray[userIndex].list[ClickedOn].require[0],newItemAmount)|| !isValueMatchingType( userDataArray[userIndex].list[ClickedOn].require[1],newItemLocation)||!isValueMatchingType(userDataArray[userIndex].list[ClickedOn].require[2],newItemWeight))
          {
                        return;
          }
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
                      <IconButton aria-label="Add" sx={{ mt: 'auto', padding:0 }}>              
            <div style={{display:"flex", flexDirection:'column'}}>  <DeleteIcon fontSize='medium' /> <span style={{fontSize:12,margin:0}}>Delete</span></div>
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
                <IconButton aria-label="Add" sx={{ mt: 'auto', padding:0 }}>              
            <div style={{display:"flex", flexDirection:'column'}}>  <AddIcon fontSize='medium' /> <span style={{fontSize:12,margin:0}}>Add</span></div>
                </IconButton>
              </div>
            </tr>
          </tbody>
        </Table>
       {list?.require[0] ==  'number'  && list?.require[1] ==  'number' &&list?.require[2] == 'number' ? (<Chart
      chartType="Bar"
       width="99%"
      max-width="99%"
      height="400px"
      data={[
        [list?.catagories[0], list?.catagories[1], list?.catagories[2], list?.catagories[3]],
        ...list.items.map((item, index) => [
          item?.name,
          Number(item?.amount),
          Number(item?.location),
          Number(item?.weight)
        ])
      ]}
      options={{
        chart: {
          title: list?.name,
        },
      }}
      
    />) :<></>} 
      </div>
    </div>
    
    </div></>)
}
