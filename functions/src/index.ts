import * as functions from 'firebase-functions';
import axios from 'axios';

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
