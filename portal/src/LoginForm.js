import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginForm() {
    const history = useHistory();
    const [username, setUsername] = useState('ns1');
    const [password, setPassword] = useState('privatedns');

    const onChange = (e) => {
        let setFn;
        if (e.target.name === 'username') {
            setFn = setUsername;
        } else if (e.target.name === 'password') {
            setFn = setPassword;
        }
        setFn(e.target.value);
    };

    const callLogin = async () => {
        try {
            const { data } = await axios.post('http://localhost:9999/login', { username, password });
            localStorage.setItem('apikey', data.apikey);
            history.push('/');
        } catch (e) {
            alert(`login failed with err: ${e.message()}`);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        callLogin();
    };

    return (
        <form>
            <label htmlFor="username">Username</label><input name="username" type="text" value={username} onChange={onChange} />
            <br />
            <label htmlFor="password">Password</label><input name="password" type="password" value={password} onChange={onChange} />
            <br />
            <button onClick={onSubmit}>Login</button>
        </form>
    );
}

export default LoginForm;
