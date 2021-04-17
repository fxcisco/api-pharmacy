import path from 'path';
import * as dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';
import 'colors';

export const __prod__ = process.env.NODE_ENV === 'production';
export const __root__ = path.join(__dirname, '..', '..');
const envFile = path.resolve(__root__, 'keys', '.env');
dotenv.config({ path: envFile });

const HOST_ORIGINS = {
  CLIENT_DOMAIN: '*',
};
const ALLOWED_ORIGINS = Object.values(HOST_ORIGINS);
const KEYS = {};

function verifyEnvKeys(keys: { [k: string]: string | number }) {
  Object.keys(keys).forEach((k: string) => {
    if (!keys[k]) {
      throw new Error(`${k} : environment variable undefined`);
    }
  });
}

verifyEnvKeys(KEYS);
export { KEYS, ALLOWED_ORIGINS };
