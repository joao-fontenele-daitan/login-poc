const express = require('express');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const SESSION_DURATION_MILLIS = 2 * 60 * 1000;

const sessions = {};

app.post('/login', async (req, res) => {
    console.log('POST /login', req.body);

    const { apikey } = req.body;
    try {
        await axios.post('http://localhost:9999/validate', { apikey });
        const sessionID = uuidv4();

        sessions[sessionID] = moment().add(SESSION_DURATION_MILLIS, 'milliseconds');
        return res.json({ sessionID });
    } catch (e) {
        console.log('ddi responded with err', e);
        return res.status(403).json({ message: 'invalid credentials' });
    }
});

app.post('/update', (req, res) => {
    console.log('POST /update', req.body);

    const { sessionID } = req.body;
    if (!sessions[sessionID] || moment().isAfter(sessions[sessionID])) {
        return res.status(403).json({ message: 'invalid credentials' })
    }
    return res.json({ message: 'OK' });
});

app.listen('8888', () => {
    console.log('web-api listening on port 8888');
});
