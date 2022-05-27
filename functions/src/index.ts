import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cors from 'cors';
import * as express from 'express';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
import * as FormData from 'form-data';

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

export const upcomingMatches = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await axios(
      `https://api.challonge.com/v1/tournaments/11202884.json?include_matches=1`,
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
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    // res.set('Access-Control-Allow-Origin', '*');

    // const response = await axios(
    //   `https://api.challonge.com/v1/tournaments/11154793/participants.json`,
    //   {
    //     params: { api_key: process.env.CHALLONGE_API_KEY },
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //     },
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
        `https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/participants.json`,
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

// DELETE participant

export const deleteParticipant = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  cors()(req, res, async () => {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      res.set('Access-Control-Allow-Origin', '*');

      const response = await axios.delete(
        `https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/participants/${req.body.participantId}.json`,
        {
          params: { api_key: process.env.CHALLONGE_API_KEY },
          method: 'DELETE',
          headers: {
            Accept: "*/*"
          },
        }
      );
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: err });

    }
  })
});




// Create a POST request to dublicate server

export const dublicateServer = functions.https.onRequest(async (req, res) => {
  const username = process.env.DATHOST_USERNAME;
  const password = process.env.DATHOST_PASSWORD;
  const baseServerId = process.env.DATHOST_BASE_SERVER_ID;
  const headers = {
    authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
      'base64'
    )}`,
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  try {
    const response = await axios(
      `https://dathost.net/api/0.1/game-servers/${baseServerId}/duplicate`,
      {
        method: 'POST',
        headers,
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// POST reqeust to update server details

export const updateServer = functions.https.onRequest(async (req, res) => {
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
  body.append(
    'csgo_settings.steam_game_server_login_token',
    'A332D726F6B28012225D456E3C556D97'
  );

  await axios({
    method: 'PUT',
    url: 'https://dathost.net/api/0.1/game-servers/628b6aac3d8bbdfae0e24308',
    data: body,
    headers: {
      authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
        'base64'
      )}`,
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
