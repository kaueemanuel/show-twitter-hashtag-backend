import TweetModel from '../models/Tweet';

import Twit from 'twit';

class Tweets {
  constructor() {
    this.T = new Twit({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token: process.env.ACCSESS_TOKEN,
      access_token_secret: process.env.ACCSESS_TOKEN_SECRET,
    });
    this.stream = null;
  }

  IniciarStream = async (req, res) => {
    let { hashtag } = req.params;
    let { estado } = req;

    if (hashtag[0] !== '#') hashtag = `#${hashtag}`;

    estado.hashtag = hashtag;
    estado.monitorando = true;

    await req.io.emit('change', estado);

    this.stream = this.T.stream('statuses/filter', { track: hashtag });
    this.stream.on('tweet', async function(tweet) {
      if (!tweet.text.includes('RT @') && tweet.text.toUpperCase().includes(hashtag.toUpperCase())) {
        const newTweet = await TweetModel.create({
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
  };

  PararStream = async (req, res) => {
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
  };

  ReprovarTweet = async (req, res) => {
    let { estado } = req;
    let { id } = req.params;

    let allTweets = [...estado.tweetsAprovados, ...estado.tweets];

    let reprovado = allTweets.find(item => item._id == id);
    reprovado.state = -1;

    estado.tweetsReprovados = [...estado.tweetsReprovados, reprovado];

    estado.tweetsAprovados = estado.tweetsAprovados.filter(item => item._id != id);
    estado.tweets = estado.tweets.filter(item => item._id != id);

    await req.io.emit('change', estado);

    await TweetModel.updateOne({ _id: reprovado._id }, reprovado);

    return res.json();
  };

  AprovarTweet = async (req, res) => {
    let { estado } = req;
    let { id } = req.params;

    let allTweets = [...estado.tweetsReprovados, ...estado.tweets];

    let aprovado = allTweets.find(item => item._id == id);
    aprovado.state = 1;

    estado.tweetsAprovados = [...estado.tweetsAprovados, aprovado];

    estado.tweetsReprovados = estado.tweetsReprovados.filter(item => item._id != id);
    estado.tweets = estado.tweets.filter(item => item._id != id);

    await req.io.emit('change', estado);

    await TweetModel.updateOne({ _id: aprovado._id }, aprovado);

    return res.json();
  };
}

export default new Tweets();
