import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cors from 'cors';
import * as express from 'express';
import * as FormData from 'form-data';

const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

// Automatically allow cross-origin requests
app.use(cors(corsOptions));



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
      `https://api.challonge.com/v1/tournaments/11154803.json?include_matches=1`,
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

export const startTournament = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    cors()(req, res, async () => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      res.set('Access-Control-Allow-Origin', '*');

      const response = await axios(
        `https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/start.json?include_matches=1`,
        {
          params: { api_key: process.env.CHALLONGE_API_KEY },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      res.status(200).json(response.data);
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export const resetTournament = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    cors()(req, res, async () => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      res.set('Access-Control-Allow-Origin', '*');

      const response = await axios(
        `https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/reset.json`,
        {
          params: { api_key: process.env.CHALLONGE_API_KEY },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
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
            Accept: '*/*',
          },
        }
      );
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  });
});

// Create a POST request to dublicate server

export const dublicateServer = functions.https.onRequest(async (req, res) => {
  cors()(req, res, async () => {
    try {
      res.set('Access-Control-Allow-Origin', '*');
      const username = process.env.DATHOST_USERNAME;
      const password = process.env.DATHOST_PASSWORD;
      // const baseServerId = process.env.DATHOST_BASE_SERVER_ID;
      const headers = {
        authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          'base64'
        )}`,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      };
      await axios(
        `https://dathost.net/api/0.1/game-servers/627107fb227fa11bae6634dc/duplicate`,
        {
          method: 'POST',
          headers,
        })
        .then(function (response) {
          res.status(200).json(response.data);
        })
    } catch (err) {
      res.status(500).json({ message: err });
    };
  });
});

// POST reqeust to update server details

export const updateServer = functions.https.onRequest(async (req, res) => {
  cors()(req, res, async () => {
    try {
      res.set('Access-Control-Allow-Origin', '*');

      const username = process.env.DATHOST_USERNAME;
      const password = process.env.DATHOST_PASSWORD;

      let formData = new FormData();
      formData.append('name', `ELADDER MATCH #${req.body.serverNo}`);
      formData.append('csgo_settings.rcon', `${req.body.csgoRcon}`);
      formData.append('csgo_settings.steam_game_server_login_token', '606001CE75961E5E95736D96AF3AC196');

      await axios({
        method: 'PUT',
        url: `https://dathost.net/api/0.1/game-servers/${req.body.serverId}`,
        data: formData,
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
    } catch (err) {
      res.status(500).json({ message: err });
    };
  });
});


// POST request to start a match series

export const startMatchSeries = functions.https.onRequest(async (req, res) => {
  cors()(req, res, async () => {
    try {
      res.set('Access-Control-Allow-Origin', '*');

      const username = process.env.DATHOST_USERNAME;
      const password = process.env.DATHOST_PASSWORD;

      let formData = new FormData();
      formData.append('game_server_id', req.body.serverId);
      formData.append('team1_name', req.body.teamOneName);
      formData.append('team1_steam_ids', req.body.team1_steam_ids);
      formData.append('team2_name', req.body.teamTwoName);
      formData.append('team2_steam_ids', req.body.team2_steam_ids);
      formData.append('warmup_time', '60');
      formData.append('number_of_maps', '2');
      formData.append('map1', req.body.mapOne);
      formData.append('map1_start_ct', req.body.startCTMapOne);
      formData.append('map2', req.body.mapTwo);
      formData.append('map1_start_ct', req.body.startCTMapTwo);
      formData.append('message_prefix', "LADDER BOT");
      formData.append('round_end_webhook_url', "https://webhook.site/c4f36389-e55e-492a-b478-fb38e4507b42")


      await axios({
        method: 'POST',
        url: `https://dathost.net/api/0.1/match-series`,
        data: formData,
        headers: {
          authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
            'base64'
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
      })
        .then(function (response) {
          res.status(200).json(response.data);
        })
    } catch (err) {
      res.status(500).json({ message: err });
    };
  });
});

// PUT Request for Challonge submit match result 

export const matchResult = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Max-Age", "1800");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  try {
    cors()(req, res, async () => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      res.set('Access-Control-Allow-Origin', '*');
      res.set("Access-Control-Allow-Credentials", "true");
      res.set("Access-Control-Max-Age", "1800");
      res.set("Access-Control-Allow-Headers", "content-type");
      res.set( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

      const response = await axios(
        `https://api.challonge.com/v1/tournaments/${req.body.tournamentId}/matches/${req.body.match_id}.json`,
        {
          params: { 
            api_key: process.env.CHALLONGE_API_KEY, 
          },
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Max-Age": "1800",
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"


          },
          data: {
            match: {
              scores_csv: req.body.scores_csv,
              winner_id: req.body.winner_id,
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