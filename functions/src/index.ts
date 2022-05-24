import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cors from 'cors';
import * as express from 'express';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const getAllTournaments = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await axios(
      `https://api.challonge.com/v1/tournaments.json`,
      {
        params: { api_key: process.env.CHALLONGE_API_KEY },
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export const addParticipant = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    //   res.set('Access-Control-Allow-Origin', '*');

    //       const response = await axios(
    //   `https://api.challonge.com/v1/tournaments/11154801/participants.json`,
    //   {
    //     params: { api_key: process.env.CHALLONGE_API_KEY },
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
    //     data: {
    //       participant: {
    //         name: req.body.name,
    //       },
    //     },
    //   }
    // );

    // res.status(200).json(response.data);

    cors()(req, res, async () => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      res.set('Access-Control-Allow-Origin', '*');

      const response = await axios(
        `https://api.challonge.com/v1/tournaments/11154793/participants.json`,
        {
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
        }
      );

      res.status(200).json(response.data);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
