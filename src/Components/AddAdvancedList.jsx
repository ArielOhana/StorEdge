import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import "../Styles/AddAdvancedList.css";
export default function AddAdvancedList({ handleClose }) {
  const { user, setUser } = useContext(UserContext);
  const require = [];
  const ListNameRef = useRef(null);
  const ListFirstRef = useRef(null);
  const ListSecondRef = useRef(null);
  const ListThirdRef = useRef(null);
  const ListFourthRef = useRef(null);
  const RequireOneRef = useRef(null);
  const RequireTwoRef = useRef(null);
  const RequireThreeRef = useRef(null);

  let advancedlist = { name: "", catagories: [], require: [], items: [] };

  const AddList = () => {
    const updatedUsers = JSON.parse(localStorage.getItem("users"));
    const userIndex = updatedUsers.findIndex(
      (userData) => userData.username === user.username
    );

    if (userIndex !== -1) {
      advancedlist = {
        name: ListNameRef.current.value,
        catagories: [
          ListFirstRef.current.value,
          ListSecondRef.current.value,
          ListThirdRef.current.value,
          ListFourthRef.current.value,
        ],
        require: [
          RequireOneRef.current.value,
          RequireTwoRef.current.value,
          RequireThreeRef.current.value,
        ],
        items: [],
      };
      console.log([
        RequireOneRef.current.value,
        RequireTwoRef.current.value,
        RequireThreeRef.current.value,
      ]);
      updatedUsers[userIndex].list.push(advancedlist);

      const updatedUser = {
        ...user,
        list: updatedUsers[userIndex].list,
      };

      setUser(updatedUser);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    handleClose();
  };
  const AddBasicList = () => {
    const updatedUsers = JSON.parse(localStorage.getItem("users"));
    const userIndex = updatedUsers.findIndex(
      (userData) => userData.username === user.username
    );

    if (userIndex !== -1) {
      updatedUsers[userIndex].list.push({ name: "new list", items: [] });

      const updatedUser = {
        ...user,
        list: updatedUsers[userIndex].list,
      };

      setUser(updatedUser);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    handleClose();
  };
  return (
    <>
      <div className="main-div">
        <TextField
          inputRef={ListNameRef}
          placeholder={"List Name"}
          variant="standard"
        />
        <div>
          <TextField
            style={{ width: "17%" }}
            inputRef={ListFirstRef}
            placeholder={"Header row"}
            variant="standard"
          />

          <TextField
            style={{ width: "25%" }}
            inputRef={ListSecondRef}
            placeholder={"Catagory 1"}
            variant="standard"
          />
          <Select label="type" inputRef={RequireOneRef}>
            <MenuItem value=""></MenuItem>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"numbers"}>Numbers</MenuItem>
            <MenuItem value={"string"}>String</MenuItem>
          </Select>
          <TextField
            style={{ width: "25%" }}
            inputRef={ListThirdRef}
            placeholder={"Catagory 2"}
            variant="standard"
          />
          <Select label="type" inputRef={RequireTwoRef}>
            <MenuItem value=""></MenuItem>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"numbers"}>Numbers</MenuItem>
            <MenuItem value={"string"}>String</MenuItem>
          </Select>
          <TextField
            style={{ width: "25%" }}
            inputRef={ListFourthRef}
            placeholder={"Catagory 3"}
            variant="standard"
          />
          <Select label="type" inputRef={RequireThreeRef}>
            <MenuItem value=""></MenuItem>
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"numbers"}>Numbers</MenuItem>
            <MenuItem value={"string"}>String</MenuItem>
          </Select>
        </div>
        <div>
          <Button
            style={{ margin: "10px" }}
            onClick={() => AddList()}
            color="success"
            variant="outlined"
          >
            Save
          </Button>
          <Button
            style={{ margin: "10px" }}
            onClick={() => AddBasicList()}
            color="secondary"
            variant="outlined"
          >
            Add Basic List
          </Button>
        </div>
      </div>
    </>
  );
}
