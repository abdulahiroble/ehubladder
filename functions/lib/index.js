"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addParticipant = exports.getAllTournaments = exports.helloWorld = void 0;
const functions = require("firebase-functions");
const axios_1 = require("axios");
const cors = require("cors");
const express = require("express");
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
// Create a POST cloud function that takes in a parameter with the name of the participant and adds them to the tournament. The function should return the participant object.
// export const addParticipant = functions.https.onRequest(async (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   try {
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//     const response = await axios(
//       `https://api.challonge.com/v1/tournaments/11154801/participants.json`,
//       {
//         params: { api_key: process.env.CHALLONGE_API_KEY },
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json;charset=UTF-8',
//         },
//         data: {
//           participant: {
//             name: req.body.name,
//           },
//         },
//       }
//     );
//     res.status(200).json(response.data);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });
exports.addParticipant = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        cors()(req, res, async () => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            res.set('Access-Control-Allow-Origin', '*');
            const response = await (0, axios_1.default)(`https://api.challonge.com/v1/tournaments/11154801/participants.json`, {
                params: { api_key: process.env.CHALLONGE_API_KEY },
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
                data: {
                    participant: {
                        name: req.body.name,
                    },
                },
            });
            res.status(200).json(response.data);
        });
        // const response = await axios(
        //   `https://api.challonge.com/v1/tournaments/11154801/participants.json`,
        //   {
        //     params: { api_key: process.env.CHALLONGE_API_KEY },
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     data: {
        //       participant: {
        //         name: req.body.name,
        //       },
        //     },
        //   }
        // );
        // res.status(200).json(response.data);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
// exports.addMessage = functions.https.onRequest((req, res) => {
//   cors()(req, res, () => {
//     return res.json({status: 'ok'});
//   });
// });
//# sourceMappingURL=index.js.map