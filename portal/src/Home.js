import React from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

const SESSION_DURATION_MILLIS = 5 * 60 * 1000;

export default function Home() {
    const history = useHistory();
    const isLogged = () => {
        const apikey = localStorage.getItem('apikey');
        if (!apikey) {
            return false;
        }

        setTimeout(() => {
            console.log('session expired, login again')
            localStorage.removeItem('apikey');
            history.push('/login');
        }, SESSION_DURATION_MILLIS)
        return true
    };

    const onClick = async () => {
        try {
            await axios.post('http://localhost:9999/validate', { apikey: localStorage.getItem('apikey') });
            alert('credentials are valid');
        } catch (e) {
            history.push('/login');
        }
    };

    const userLoggedIn = isLogged();
    return (
        <div>
            {userLoggedIn && (
                <>
                    <p>Welcome to the home page logged user</p>
                    <button onClick={onClick}>Validate Login</button>
                </>
            )}
            {!userLoggedIn && (
                <Redirect to="/login" />
            )}
        </div>
    );
}