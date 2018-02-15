const express = require('express');
const bodyParser = require('body-parser');
const requestify = require('requestify');

const app = express();
const port = process.env.PORT || 5000;
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


const url = 'http://api.steampowered.com';
const key = '7D5F2FA02FF09ACA687DE979BE355B30';




const GetPlayerId = (req, res, next) => {
  if (!req.body) return res.sendStatus(400)

  requestify.get(url + '/ISteamUser/ResolveVanityURL/v0001/?key=' + key + '&vanityurl=' + req.body.idPlayer + ' ' )
    .then(response => {
      response.getBody()
      req.body = response.body;
      next()
    })
}

const GetPlayerSummaries = (req, res, next) => {
  if (!req.body) return res.sendStatus(400)
  const steamId = JSON.parse(req.body);


  requestify.get(url + '/ISteamUser/GetPlayerSummaries/v0002/?key=' + key + '&steamids=' + steamId.response.steamid )
    .then(response => {
      response.getBody()
      const resultJson = JSON.parse(response.body)
      res.send(resultJson.response.players[0])
    })
}



// Api client
app.post('/api/player', [GetPlayerId, GetPlayerSummaries])


app.listen(port, () => console.log(`Listening on port ${port}`));