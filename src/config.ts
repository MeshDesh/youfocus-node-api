import { config } from 'dotenv';
import path from 'path';

const envStatus = process.env.NODE_ENV;
config({ path: path.resolve(__dirname + `/.env.${envStatus}`) });

const configEnv = {
  PORT: process.env.PORT,
  YOUR_ENV_VARIABLE: process.env.YOUR_ENV_VARIABLE,
};

export default configEnv;
