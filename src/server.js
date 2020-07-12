import dotenv from 'dotenv';

dotenv.config();

import app from './app';

app.listen(process.env.PORT || 8888);
