"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServer = exports.dublicateServer = exports.deleteParticipant = exports.resetTournament = exports.startTournament = exports.addParticipant = exports.upcomingMatches = exports.getAllTournaments = exports.helloWorld = void 0;
const functions = require("firebase-functions");
const axios_1 = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
const FormData = require("form-data");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from Firebase!');
});
exports.getAllTournaments = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await (0, axios_1.default)(`https://api.challonge.com/v1/tournaments.json`, {
            params: { api_key: process.env.CHALLONGE_API_KEY },
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });
        res.status(200).json(response.data);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.upcomingMatches = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await (0, axios_1.default)(`https://api.challonge.com/v1/tournaments/11154803.json?include_matches=1`, {
            params: { api_key: process.env.CHALLONGE_API_KEY },
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });
        res.status(200).json(response.data);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.addParticipant = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        cors()(req, res, async () => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            res.set('Access-Control-Allow-Origin', '*');
            const response = await (0, axios_1.default)(`https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/participants.json`, {
                params: { api_key: process.env.CHALLONGE_API_KEY },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                data: {
                    participant: {
                        name: req.body.name,
                    },
                },
            });
            res.status(200).json(response.data);
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.startTournament = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        cors()(req, res, async () => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            res.set('Access-Control-Allow-Origin', '*');
            const response = await (0, axios_1.default)(`https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/start.json?include_matches=1`, {
                params: { api_key: process.env.CHALLONGE_API_KEY },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            res.status(200).json(response.data);
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.resetTournament = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        cors()(req, res, async () => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            res.set('Access-Control-Allow-Origin', '*');
            const response = await (0, axios_1.default)(`https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/reset.json`, {
                params: { api_key: process.env.CHALLONGE_API_KEY },
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
            res.status(200).json(response.data);
        });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
// DELETE participant
exports.deleteParticipant = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    cors()(req, res, async () => {
        try {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            res.set('Access-Control-Allow-Origin', '*');
            const response = await axios_1.default.delete(`https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/participants/${req.body.participantId}.json`, {
                params: { api_key: process.env.CHALLONGE_API_KEY },
                method: 'DELETE',
                headers: {
                    Accept: '*/*',
                },
            });
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    });
});
// Create a POST request to dublicate server
exports.dublicateServer = functions.https.onRequest(async (req, res) => {
    const username = process.env.DATHOST_USERNAME;
    const password = process.env.DATHOST_PASSWORD;
    const baseServerId = process.env.DATHOST_BASE_SERVER_ID;
    const headers = {
        authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    };
    try {
        const response = await (0, axios_1.default)(`https://dathost.net/api/0.1/game-servers/${baseServerId}/duplicate`, {
            method: 'POST',
            headers,
        });
        res.status(200).json(response.data);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
// POST reqeust to update server details
exports.updateServer = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const username = process.env.DATHOST_USERNAME;
    const password = process.env.DATHOST_PASSWORD;
    // let body = {
    //   name: "hej Abdu",
    // }
    let body = new FormData();
    body.append('name', 'ELADDER MATCH SERVER');
    body.append('csgo_settings.password', 'testpass');
    body.append('csgo_settings.rcon', 'rcontestpass');
    body.append('csgo_settings.steam_game_server_login_token', 'A332D726F6B28012225D456E3C556D97');
    await (0, axios_1.default)({
        method: 'PUT',
        url: 'https://dathost.net/api/0.1/game-servers/628b6aac3d8bbdfae0e24308',
        data: body,
        headers: {
            authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(function (response) {
        res.status(200).json(response.data);
    })
        .catch(function (error) {
        res.status(500).json({ message: error });
    });
});
//# sourceMappingURL=index.js.map