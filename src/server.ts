import express, { Response } from 'express';
import { ALLOWED_ORIGINS, __prod__ } from './config';
import { errorHandler } from './common/middlewares/errorHandler';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { connectMongoDB } from './databases/mongo';
import { applyAppRoutes } from './apps';

const main = async () => {
  await connectMongoDB();
  const app = express();
  if (!__prod__) {
    app.use(morgan('dev'));
  }

  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'Authorization',
      'Content-Type',
      'Accept',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: ALLOWED_ORIGINS
  };
  app.use(helmet());
  app.use(cors(options));
  app.use(express.json());

  app.get('/', (_: any, res: Response) => {
    res.json({ message: 'Drug search api.' });
  })

  applyAppRoutes(app);
  app.use(errorHandler());
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
};

main().catch((err) => console.log(err));