import express from 'express';
import { Drugs, News } from './controllers';
const router = express.Router();

// GENERAL
router.get( '/news/recent', News.recentNews)

router.post('/drugs/search', Drugs.findDrugs);

export { router as drugRouter };
