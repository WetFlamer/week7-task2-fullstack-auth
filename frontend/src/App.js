import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Todos from "./components/Todos";
import Users from "./components/Users";

function App() {
  const token = useSelector((state) => state.application.token);

  if (!token) {
    return (
      <Routes>
        <Route path='/' element={<Navigate to='/auth' />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path='/login' element={<Navigate to='/' />} />
      <Route path='/auth' element={<Navigate to='/' />} />
      <Route path='/todos' element={<Todos/>} />
    </Routes>
  );
}

export default App;
