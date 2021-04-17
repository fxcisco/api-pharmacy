import 'colors';
import 'module-alias/register';

import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { __root__ } from '@/config';

const envFile = path.resolve(__root__, 'keys', '.env');
dotenv.config({ path: envFile });

import { Drug } from '@/databases/mongo/models';
import { connectMongoDB } from '@/databases/mongo';

const importData = async () => {
  try {
    await connectMongoDB();
    const seedFile = path.resolve(__root__, 'data', 'drugs.json');
    console.log(seedFile);

    const drugs = await new Promise<any>((res, rej) => {
      fs.readFile(seedFile,
        'utf8',
        (err, data) => {
          if (err) return rej(`Error reading file from disk: ${err}`);
          res(JSON.parse(data));
        }
      );
    });

    console.log('Populating database...'.cyan);
    await Drug.deleteMany({});
    await Drug.insertMany(drugs);
    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Drug.deleteMany({});
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
