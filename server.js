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


// Get NickName
const GetPlayerNickName = (req, res, next) => {
  if (!req.body) return res.sendStatus(400)
  requestify.get(url + '/ISteamUser/ResolveVanityURL/v0001/?key=' + key + '&vanityurl=' + req.body.idPlayer + ' ' )
    .then(response => {
      response.getBody()
      req.body = response.body;
      next()
    })
}


// Get Steam Id
const getPlayerId = (res, cb) => {
  requestify.get(url + '/ISteamUser/GetPlayerSummaries/v0002/?key=' + key + '&steamids=' + res )
    .then(response => {
      response.getBody()
      const resultJson = JSON.parse(response.body)
      if(resultJson.response.players.length === 0) return cb('error')
      cb({
        personaname: resultJson.response.players[0].personaname,
        steamid: resultJson.response.players[0].steamid,
        realname: resultJson.response.players[0].realname,
        loccountrycode: resultJson.response.players[0].loccountrycode,
        profileurl: resultJson.response.players[0].profileurl,
        avatarfull: resultJson.response.players[0].avatarfull,
      })
    })
};

// Get Games
const GetOwnedGames = (res, req, next) => {
  requestify.get(url + '/IPlayerService/GetOwnedGames/v0001/?key=' + key + '&steamid=' + res.body.item.steamid)
    .then(response => {
      response.getBody()
      const resultJson = JSON.parse(response.body)

      res.body = {
        ...res.body.item,
        games: resultJson.response.games
      }
      next()
    })
};

// Steam Spy
const SteamSpyApi = (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  if (req.body.games.length === 0) return res.send('Ошибка');

  requestify.get('http://steamspy.com/api.php?request=tag&tag=Multiplayer')
    .then(response => {
      response.getBody();
      const allMultiPlayers = JSON.parse(response.body);

      // Фильтрация мультиплеерных игр
      const array1 = Object.keys(allMultiPlayers).map(key => ({
        appid: key,
        ...allMultiPlayers[key]
      }));
      const array2 = req.body.games;

      //здесь будем хранить значение элемента
      let cache;
      const games = []

      //сохраним длины массивов:
      let ln1 = array1.length;
      let ln2 = array2.length;

      for (let i = 0; i < ln1; ++i){
        cache = array1[i].appid;
        for (let j = 0; j < ln2; ++j){
          if (cache === array2[j].appid){
            games.push(array1[i])
            break;
          }
        }
      }
      req.body = {
        ...req.body,
        games: games.map(item => ({
          name: item.name,
          appid: item.appid,
          price: item.price,
          userscore: item.userscore
        }))
      }
      res.send(req.body)
    })
}


const GetPlayerSummaries = (req, res, next) => {
  if (!req.body) return res.sendStatus(400)

  const steamId = JSON.parse(req.body);
  getPlayerId(steamId.response.steamid, function (response) {
    if(response === 'error') return res.sendStatus(400)
    res.send(response)
  })
};

// Api client
app.post('/api/player-nickname', [ GetPlayerNickName, GetPlayerSummaries]);

app.post('/api/multiplayer', [ GetOwnedGames, SteamSpyApi ]);

app.post('/api/player-id', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  getPlayerId(req.body.idPlayer, function (response) {
    if(response === 'error') return res.sendStatus(400)
    res.send(response)
  })
})






app.listen(port, () => console.log(`Listening on port ${port}`));