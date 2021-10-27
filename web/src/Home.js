import React from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

const SESSION_DURATION_MILLIS = 1 * 60 * 1000;

export default function Home() {
    const history = useHistory();
    const isLogged = () => {
        const session = localStorage.getItem('sessionID');
        if (!session) {
            window.location.replace('http://localhost:9999/login');
            return false;
        }

        setTimeout(() => {
            console.log('session expired, login again')
            localStorage.removeItem('sessionID');
            window.location.replace('http://localhost:9999/login');
        }, SESSION_DURATION_MILLIS)
        return true
    };

    const triggerUpdate = async () => {
        try {
            await axios.post('http://localhost:8888/update', { sessionID: localStorage.getItem('sessionID') });
            alert('trigger successful');
        } catch (e) {
            console.log('failed to trigger update', e);
            window.location.replace('http://localhost:9999/login');
        }
    };

    const userLoggedIn = isLogged();
    return (
        <div>
            {userLoggedIn && (
                <>
                    <p>Welcome to the home page of <b>Cloud Sync</b> logged user</p>
                    <button onClick={triggerUpdate}>Trigger Update</button>
                </>
            )}
        </div>
    );
}
