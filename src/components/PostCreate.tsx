import React,{ReactPropTypes, useState} from 'react'
import './css/PostCreate.css'

const PostCreate = ({postFunc}:any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const onClickHandler = (e:any) => {
        e.preventDefault();
        postFunc(title,description)
    };
    return (
        <div className="postCreate">
            <form className='postCreate__form'>
                <label htmlFor='title'>Title</label>
                <input
                    className='postCreate__title'
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={(e:any) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor='desc'>Description</label>
                <textarea
                    className='postCreate__desc'
                    name='desc'
                    placeholder='Description'
                    onChange={(e:any) => setDescription(e.target.value)}
                    value={description}
                />
                <button className='postCreate__button' onClick={onClickHandler}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default PostCreate
