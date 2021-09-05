import { config } from 'dotenv';
import path from 'path';

const envStatus = process.env.NODE_ENV;
config({ path: path.resolve(__dirname + `/.env.${envStatus}`) });


const configEnv = {
  PORT: process.env.PORT,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
};

export default configEnv;
