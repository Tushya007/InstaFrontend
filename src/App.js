import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from './axios';

function App() {
    const userLogin = (username, password) => {
        var data = {
            username,
            password,
        };
        axios
            .post('user/login/', data)
            .then((res) => {
                localStorage.setItem('token', res.data.details.token);
                window.location.href = 'http://localhost:3000';
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.log(err);
            });
    };
    const userSignup = (username, email, password) => {
        var data = {
            username,
            email,
            password,
        };
        axios
            .post('/user/signup/', data)
            .then((res) => {
                localStorage.setItem('token', res.data.details.token);
                window.location.href = 'http://localhost:3000';
            })
            .catch((err) => {
                alert(err.response.data.message);
                console.log(err);
            });
    };
    return (
        <div className='App'>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/signup'>
                        <Signup userSignup={userSignup} />
                    </Route>
                    <Route path='/user/profile'>
                        <Profile />
                    </Route>
                    <Route path='/login'>
                        <Login userLogin={userLogin} />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
