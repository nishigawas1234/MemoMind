import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignIn from "./Sign-in"
import Dashboard from "./Dashboard"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signUp" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
         
      
      </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
