import React, { useState, useEffect } from 'react';
import './css/Home.css';
import axios from '../axios';

const Home = () => {
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    var token = localStorage.getItem('token');
    useEffect(() => {
        axios
            .get('user/get/username/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data.username);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    const commentHandler = (e:any) => {
        e.preventDefault();
        var id = e.nativeEvent.path[0].id;
        var com_id = id.split('commentBlock')[1];
        var commentEl:any = document.getElementById(`comments${com_id}`);
        if (commentEl.style.display === 'none') {
            commentEl.style.display = 'flex';
        } else {
            commentEl.style.display = 'none';
        }
    };
    const getAllPosts = async () => {
        await axios
            .get('post/get/all/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    const likePost = (e:any) => {
        e.preventDefault();
        var post_id = parseInt(e.nativeEvent.path[0].id, 10);
        data.map((_post:any, id) => {
            if (_post.id === post_id) {
                if (_post.likes.length > 0) {
                    var canLike = []
                    _post.likes.map((like:any,id:any)=>{
                        if (like.author === user) {
                            console.log("unlike");
                        } else if(like.author !== user) {
                            canLike.push("yep")
                            if (canLike.length===_post.likes.length){
                                var send_data = {
                                    "post": post_id,
                                };
                                axios
                                    .post('post/like/', send_data, {
                                        headers: {
                                            Authorization: `Token ${token}`,
                                        },
                                    })
                                    .then((res) => {
                                        getAllPosts();
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        console.log(err.response);
                                    });
                            }
                        }
                    })
                } else {
                    var send_data = {
                        "post": post_id,
                    };
                    axios
                        .post('post/like/', send_data, {
                            headers: {
                                Authorization: `Token ${token}`,
                            },
                        })
                        .then((res) => {
                            getAllPosts();
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err.response);
                        });
                }
            }
        });
    };
    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <div className='home'>
            {data.map((post:any, id) => {
                return (
                    <div className='home__posts'>
                        <div className='posts__title'>
                            <a href='/'>{post.author}</a>
                            <hr />
                            {post.title}
                        </div>
                        <hr />
                        <div className='posts__images'>
                            <img
                                src='https://res.cloudinary.com/tushya007/image/upload/v1606413288/Will_You_Shut_Up_Man_Meme_Banner_hx37u5.jpg'
                                alt=''
                            />
                            {/* <img src={post.image} alt=""/> */}
                        </div>
                        <hr />
                        <div className='posts__description'>
                            <button id={post.id} onClick={likePost}>
                                {post.likes.length} {post.likes.length > 1 ? "likes" : "like"}
                            </button>
                            <hr />
                            {post.description}
                            <br />
                            <button id={`commentBlock${id}`} onClick={commentHandler}>
                                Comments
                            </button>
                        </div>
                        <div id={`comments${id}`} className='comments'>
                            {post.comments.map((comment:any, id:Int16Array) => {
                                return (
                                    <div className='posts__comments'>
                                        <div className='posts__main__comments'>
                                            {comment.author}
                                            <hr />
                                            {comment.comment}
                                        </div>
                                        {comment.sub_comments.map((sub_comment:any, id:Int16Array) => {
                                            return (
                                                <div className='posts__sub__comment'>
                                                    {sub_comment.author}
                                                    <hr />
                                                    {sub_comment.comment}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
