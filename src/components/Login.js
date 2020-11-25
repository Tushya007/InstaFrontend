import React, { useState } from 'react';
import './css/Login.css';

const Login = ({userLogin}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const onClickHandler = async (e) => {
        e.preventDefault();
        await userLogin(username,password)
    };

    return (
        <div className='login'>
            <form className='login__form'>
                <label htmlFor='username'>Username</label>
                <input
                    className='login__username'
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    className='login__password'
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className='login__button' onClick={onClickHandler}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
