require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/generateToken', (req, res) => {
    const { roomName = 'DefaultRoom', identity = 'defaultUser' } = req.query;

    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET,
        { identity, ttl: 3600 }
    );

    token.addGrant(new VideoGrant({ room: roomName }));

    res.send(token.toJwt());
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
