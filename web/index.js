const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const upload = multer()

app.use(express.static('build'));

app.post('/api/login',  upload.none(), async (req, res) => {
    console.log('POST /login', req.body);

    const { apikey } = req.body;
    try {
        const { data } = await axios.post('http://localhost:8888/login', { apikey });

        const { sessionID } = data;
        res.cookie('sessionID', sessionID);
        return res.redirect('/');
    } catch (e) {
        console.log('failed to login', e)
        return res.redirect('http://localhost:4000/login');
    }
});

app.listen('3000', () => {
    console.log('web-bff listening on port 3000');
});
