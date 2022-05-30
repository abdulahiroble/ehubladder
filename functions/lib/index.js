"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMatchSeries = exports.updateServer = exports.dublicateServer = exports.deleteParticipant = exports.resetTournament = exports.startTournament = exports.addParticipant = exports.upcomingMatches = exports.getAllTournaments = exports.helloWorld = void 0;
const functions = require("firebase-functions");
const axios_1 = require("axios");
const cors = require("cors");
const express = require("express");
const FormData = require("form-data");
const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
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
    cors()(req, res, async () => {
        try {
            res.set('Access-Control-Allow-Origin', '*');
            const username = process.env.DATHOST_USERNAME;
            const password = process.env.DATHOST_PASSWORD;
            // const baseServerId = process.env.DATHOST_BASE_SERVER_ID;
            const headers = {
                authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            };
            await (0, axios_1.default)(`https://dathost.net/api/0.1/game-servers/627107fb227fa11bae6634dc/duplicate`, {
                method: 'POST',
                headers,
            })
                .then(function (response) {
                res.status(200).json(response.data);
            });
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
        ;
    });
});
// POST reqeust to update server details
exports.updateServer = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        try {
            res.set('Access-Control-Allow-Origin', '*');
            const username = process.env.DATHOST_USERNAME;
            const password = process.env.DATHOST_PASSWORD;
            let formData = new FormData();
            formData.append('name', 'ELADDER MATCH SERVER');
            formData.append('csgo_settings.password', 'testpass');
            formData.append('csgo_settings.rcon', 'rcontestpass');
            formData.append('csgo_settings.steam_game_server_login_token', '606001CE75961E5E95736D96AF3AC196');
            await (0, axios_1.default)({
                method: 'PUT',
                url: `https://dathost.net/api/0.1/game-servers/${req.body.serverId}`,
                data: formData,
                headers: {
                    authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                res.status(200).json(response.data);
            });
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
        ;
    });
});
// POST request to start a match series
exports.startMatchSeries = functions.https.onRequest(async (req, res) => {
    cors()(req, res, async () => {
        try {
            res.set('Access-Control-Allow-Origin', '*');
            const username = process.env.DATHOST_USERNAME;
            const password = process.env.DATHOST_PASSWORD;
            let formData = new FormData();
            formData.append('game_server_id', req.body.serverId);
            formData.append('team1_name', req.body.teamOneName);
            formData.append('team1_steam_ids', 'STEAM_1:0:21977583');
            formData.append('team2_name', req.body.teamTwoName);
            formData.append('team2_steam_ids', 'STEAM_1:1:21977580');
            formData.append('warmup_time', '60');
            formData.append('number_of_maps', '2');
            formData.append('map1', req.body.mapOne);
            formData.append('map1_start_ct', req.body.startCTMapOne);
            formData.append('map2', req.body.mapTwo);
            formData.append('map1_start_ct', req.body.startCTMapTwo);
            await (0, axios_1.default)({
                method: 'POST',
                url: `https://dathost.net/api/0.1/match-series`,
                data: formData,
                headers: {
                    authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                res.status(200).json(response.data);
            });
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
        ;
    });
});
//# sourceMappingURL=index.js.map