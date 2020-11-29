import React, { useState, useEffect } from 'react';
import './css/Home.css';
import axios from '../axios';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

const Home = ({ commentFunc }: any) => {
    const [data, setData] = useState([]);
    const [comment, setComment] = useState('');
    var token = localStorage.getItem('token')
    let commentsShown = false;
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
    const onClickHandler = async (e: any) => {
        e.preventDefault();
        console.log(e);
        var main_post = e.target.id.split('main_post')[1];
        await commentFunc(comment, main_post);
        getAllPosts();
        setComment('');
    };
    const commentHandler = (e: any) => {
        e.preventDefault();
        var id = e.nativeEvent.path[0].id;
        var buttonEl: any = document.getElementById(id);
        var com_id = id.split('commentBlock')[1];
        var commentEl: any = document.getElementById(`comments${com_id}`);
        if (commentEl.style.display === 'flex') {
            commentEl.style.display = 'none';
            buttonEl.innerHTML = 'Show Comments';
            commentsShown = false;
        } else {
            commentEl.style.display = 'flex';
            buttonEl.innerHTML = 'Hide Comments';
            commentsShown = true;
        }
    };

    const likeOnClick = async (e: any) => {
        e.preventDefault();
        var post_id = e.nativeEvent.path[0].id
        var h5El = document.getElementById(`h5${post_id}`)
        var send_data = {
            post: post_id,
        };
        await axios
            .post('post/like/', send_data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            .then((res) => {
                if (h5El){
                    if(res.status === 201){
                        var likes = parseInt(h5El?.innerHTML.split(' ')[0]) + 1;
                        h5El.innerHTML = `${likes} ${likes > 1 ? "likes":"like"}`
                    }else if (res.status === 200){
                        var likes = parseInt(h5El?.innerHTML.split(' ')[0]) - 1;
                        h5El.innerHTML = `${likes} ${likes > 1 ? "likes":"like"}`
                    }
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
    }, []);
    return (
        <div className='home'>
            {data.map((post: any, id) => {
                return (
                    <div className='home__posts'>
                        <div className='posts__title'>
                            <a href='/'>
                                <IconButton>
                                    <PersonIcon />
                                </IconButton>
                                {post.author}
                            </a>
                            <br />
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
                            <button className='posts__likes' onClick={likeOnClick} id={`${post.id}`}>
                                <FavoriteIcon className='fav__icon' />
                                <h5 id={`h5${post.id}`}>
                                    {post.likes.length} {post.likes.length > 1 ? 'likes' : 'like'}
                                </h5>
                            </button>
                            <strong>{post.author}</strong> - {post.description}
                        </div>
                        <div className='commentForm'>
                            <form className='commentForm__form'>
                                <div className='together'>
                                    <input
                                        className='commentForm__comment'
                                        type='text'
                                        name='comment'
                                        placeholder='Comment'
                                        onChange={(e: any) => setComment(e.target.value)}
                                        value={comment}
                                    />
                                    <button
                                        className='commentForm__button'
                                        onClick={onClickHandler}
                                        id={`main_post${post.id}`}
                                    >
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                        <button
                            className='posts__showComments'
                            id={`commentBlock${id}`}
                            onClick={commentHandler}
                        >
                            {commentsShown ? 'Hide Comments' : 'Show Comments'}
                        </button>
                        <div id={`comments${id}`} className='comments'>
                            {post.comments.map((comment: any, id: Int16Array) => {
                                return (
                                    <div className='posts__comments'>
                                        <div className='posts__main__comments'>
                                            <div className='comment__author'>
                                                <IconButton>
                                                    <PersonIcon />
                                                </IconButton>
                                                {comment.author}
                                            </div>
                                            <div className='comment__content'>
                                                {comment.comment}
                                            </div>
                                        </div>
                                        {comment.sub_comments.map(
                                            (sub_comment: any, id: Int16Array) => {
                                                return (
                                                    <div className='posts__sub__comment'>
                                                        <div className='subComment__author'>
                                                            <IconButton>
                                                                <PersonIcon />
                                                            </IconButton>
                                                            {sub_comment.author}
                                                        </div>
                                                        <div className='subComment__content'>
                                                            {sub_comment.comment}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
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
