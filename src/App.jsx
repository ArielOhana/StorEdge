import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import "./Styles/App.css";
import HomePage from "./Components/HomePage";
import NoPage from "./Components/NoPage";
import SignUp from "./Components/SignUp";
import MainPage from "./Components/MainPage";
import SignIn from "./Components/SignIn";
export const UserContext = createContext();
function App() {

  const [user, setUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App
