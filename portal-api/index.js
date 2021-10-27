const express = require('express');
const cors = require('cors');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const sessions = {}; // to store tokens, key is token, value is time of expiration

const SESSION_DURATION_MILLIS = 2 * 60 * 1000;

app.post('/login', (req, res) => {
    console.log('POST /login', req.body);

    const { username, password } = req.body;
    if (username === 'ns1' && password === 'privatedns') {
        const apikey = uuidv4();
        sessions[apikey] = moment().add(SESSION_DURATION_MILLIS, 'milliseconds').toISOString();
        return res.json({ apikey: apikey });
    }
    return res.status(403).json({ message: 'invalid credentials' });
});

app.post('/validate', (req, res) => {
    console.log('POST /validate', req.body);

    const { apikey } = req.body;
    if (!sessions[apikey]) {
        return res.status(401).json({ message: 'user never logged in' });
    } else if (moment().isAfter(sessions[apikey])) {
        return res.status(401).json({ message: 'expired apikey' });
    }
    return res.status(200).json({ message: 'valid apikey' });
});

app.listen('9999', () => {
    console.log('portal-api listening on port 9999');
});
