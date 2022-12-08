import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../features/applicationSlice";
const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
    const error = useSelector((initialState) => initialState.application.error)
  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };
  const handleSetPass = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ login, password })
    )
    setLogin('')
    setPassword('')
  };
  if(error) {
    return <div>{error}</div>
  }

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        value={login}
        placeholder="name"
        onChange={handleSetName}
      />
      <input
        type="password"
        value={password}
        placeholder={"password"}
        onChange={handleSetPass}
      />
      <br />
      <button type="submit">register</button>
    </form>
  );
};

export default SignUp;
