import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import PostCreate from './components/PostCreate';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from './axios';

function App() {
    var token = localStorage.getItem('token');
    const mainComment = (comment:string,main_post:Int16Array) =>{
        var data = {
            comment,
            main_post
        }
        axios
            .post('/post/create/maincomment/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    const userLogin = (username: string, password: string) => {
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
    const userSignup = (username: string, email: string, password: string) => {
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
    const postCreate = (title: string, description: string) => {
        var data = {
            title,
            description,
        };
        axios
            .post('/post/create/', data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
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
                    <Route path='/post/create'>
                        <PostCreate postFunc={postCreate} />
                    </Route>
                    <Route path='/login'>
                        <Login userLogin={userLogin} />
                    </Route>
                    <Route path='/'>
                        <Home commentFunc={mainComment} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
