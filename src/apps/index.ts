import { Express } from 'express'
import { drugRouter } from "./pharmacy/routes";

export const applyAppRoutes = (app: Express) => {
  app.use('/api/pharmacy', drugRouter);
}