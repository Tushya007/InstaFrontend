import React,{useState} from 'react';
import './css/Signup.css';

const Signup = ({userSignup}:any) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onClickHandler = async (e:any) => {
        e.preventDefault();
        await userSignup(username,email,password)
    };
    return (
        <div className='signup'>
            <form className='signup__form'>
                <label htmlFor='username'>Username</label>
                <input
                    className='signup__username'
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={(e:any) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
                <input
                    className='signup__email'
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={(e:any) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    className='signup__password'
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={(e:any) => setPassword(e.target.value)}
                />
                <button className='signup__button' onClick={onClickHandler}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
