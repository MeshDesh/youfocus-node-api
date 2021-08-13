import { config } from 'dotenv';
import path from 'path';

// const envStatus = process.env.NODE_ENV;
// config({ path: path.resolve(__dirname + `/.env.${envStatus}`) });

config({path: path.resolve(__dirname + '/.env.local')});

const configEnv = {
  PORT: process.env.PORT,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
};

export default configEnv;
