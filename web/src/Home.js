import React from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

const SESSION_DURATION_MILLIS = 1 * 60 * 1000;

export default function Home() {
    const isLogged = () => {
        const sessionID = Cookie.get('sessionID');
        if (!sessionID) {
            window.location.replace('http://localhost:4000/login');
            return false;
        }

        setTimeout(() => {
            console.log('session expired, login again')
            Cookie.remove('sessionID');
            window.location.replace('http://localhost:4000/login');
        }, SESSION_DURATION_MILLIS)
        return true
    };

    const triggerUpdate = async () => {
        try {
            await axios.post('http://localhost:8888/update', { sessionID: Cookie.get('sessionID') });
            alert('trigger successful');
        } catch (e) {
            console.log('failed to trigger update', e);
            Cookie.remove('sessionID');
            window.location.replace('http://localhost:4000/login');
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
