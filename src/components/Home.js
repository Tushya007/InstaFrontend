import React,{useState,useEffect} from 'react';
import './css/Home.css';
import axios from '../axios';

const Home = () => {
    const [data,setData] = useState([])
    var token = localStorage.getItem('token');
    const getAllPosts = async () => {
        await axios
            .get('post/get/all/', {
                headers: {
                    "Authorization": `Token ${token}`,
                },
            })
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    useEffect(()=>{
        getAllPosts()
    },[])
    return <div>Hello</div>;
};

export default Home;
