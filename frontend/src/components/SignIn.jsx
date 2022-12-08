import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignIn } from '../features/applicationSlice';
const SignIn = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const error = useSelector((initialState) => initialState.application.error)

const handleSetName = (e) => {
    setLogin(e.target.value)
}    
const handleSetPass = (e) => {
    setPassword(e.target.value)
}
const handleSignIn = (e) => {
    e.preventDefault()
    dispatch(authSignIn({login ,password}))
    setLogin('')
    setPassword('')
} 

if(error) {
    return <div>{error}</div>
}
    return (
       <form onSubmit={handleSignIn}>
        <input type='text' value={login} placeholder='name' onChange={handleSetName} />
        <input type="password" value={password} placeholder={'password'} onChange={handleSetPass} />
        <br />
        <button type='submit'>auth</button>
       </form>
    );
};

export default SignIn;