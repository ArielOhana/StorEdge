import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import "./Styles/App.css";
import HomePage from "./Components/HomePage";
import NoPage from "./Components/NoPage";
import SignUp from "./Components/SignUp";
export const UserContext = createContext();
function App() {

  const [user, setUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App
