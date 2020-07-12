"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Tweet = require('../models/Tweet'); var _Tweet2 = _interopRequireDefault(_Tweet);

var _twit = require('twit'); var _twit2 = _interopRequireDefault(_twit);

class Tweets {
  constructor() {;Tweets.prototype.__init.call(this);Tweets.prototype.__init2.call(this);Tweets.prototype.__init3.call(this);Tweets.prototype.__init4.call(this);
    this.T = new (0, _twit2.default)({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token: process.env.ACCSESS_TOKEN,
      access_token_secret: process.env.ACCSESS_TOKEN_SECRET,
    });
    this.stream = null;
  }

  __init() {this.IniciarStream = async (req, res) => {
    let { hashtag } = req.params;
    let { estado } = req;

    if (hashtag[0] !== '#') hashtag = `#${hashtag}`;

    estado.hashtag = hashtag;
    estado.monitorando = true;

    await req.io.emit('change', estado);

    this.stream = this.T.stream('statuses/filter', { track: hashtag });
    this.stream.on('tweet', async function(tweet) {
      if (!tweet.text.includes('RT @') && tweet.text.toUpperCase().includes(hashtag.toUpperCase())) {
        const newTweet = await _Tweet2.default.create({
          hashtag: hashtag,
          timestamp: parseInt(tweet.timestamp_ms),
          nome: tweet.user.name,
          username: tweet.user.screen_name,
          text: tweet.text,
          state: 0,
        });

        estado.tweets = [...estado.tweets, newTweet];
        estado.monitorando = true;
        estado.hashtag = hashtag;

        await req.io.emit('change', estado);

      }
    });
    return res.json();
  }}

  __init2() {this.PararStream = async (req, res) => {
    let { estado } = req;
    if (this.stream) {
      this.stream.stop();
    }
    estado.monitorando = false;
    estado.hashtag = '';
    estado.tweets = [];
    estado.tweetsAprovados = [];
    estado.tweetsReprovados = [];

    await req.io.emit('change', estado);

    return res.json();
  }}

  __init3() {this.ReprovarTweet = async (req, res) => {
    let { estado } = req;
    let { id } = req.params;

    let allTweets = [...estado.tweetsAprovados, ...estado.tweets];

    let reprovado = allTweets.find(item => item._id == id);
    reprovado.state = -1;

    estado.tweetsReprovados = [...estado.tweetsReprovados, reprovado];

    estado.tweetsAprovados = estado.tweetsAprovados.filter(item => item._id != id);
    estado.tweets = estado.tweets.filter(item => item._id != id);

    await req.io.emit('change', estado);

    await _Tweet2.default.updateOne({ _id: reprovado._id }, reprovado);

    return res.json();
  }}

  __init4() {this.AprovarTweet = async (req, res) => {
    let { estado } = req;
    let { id } = req.params;

    let allTweets = [...estado.tweetsReprovados, ...estado.tweets];

    let aprovado = allTweets.find(item => item._id == id);
    aprovado.state = 1;

    estado.tweetsAprovados = [...estado.tweetsAprovados, aprovado];

    estado.tweetsReprovados = estado.tweetsReprovados.filter(item => item._id != id);
    estado.tweets = estado.tweets.filter(item => item._id != id);

    await req.io.emit('change', estado);

    await _Tweet2.default.updateOne({ _id: aprovado._id }, aprovado);

    return res.json();
  }}
}

exports. default = new Tweets();
