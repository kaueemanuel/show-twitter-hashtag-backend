import { Router } from 'express';
import Tweets from './app/controllers/Tweets';

const routes = new Router();

routes.get('/tweets/iniciar/:hashtag', Tweets.IniciarStream);
routes.get('/tweets/parar', Tweets.PararStream);
routes.get('/tweets/reprovar/:id', Tweets.ReprovarTweet);
routes.get('/tweets/aprovar/:id', Tweets.AprovarTweet);

export default routes;
