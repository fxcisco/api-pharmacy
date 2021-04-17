import { __prod__ } from '@/config';
import { asyncHandler, BadRequestError } from '@/common';
import { Drug } from '@/databases/mongo/models';

type SearchType = 'name' | 'ndc' | 'dose' | 'label';

// @desc      Query for a drug
export const findDrugs = [
  asyncHandler(async (req, res, next) => {
    try {
      const LIMIT = 20;
      const { term, type, page = 0 } = req.body;
      if (!term || term.length < 4) {
        throw new BadRequestError('Please provide at least 4 characters');
      }
      const matchObj: any = {};
      const searchType = `${type}` as SearchType;
      const searchRegex = { $regex: '.*' + term + '.*', $options: 'i' }
      
      if (isNaN(parseInt(page))) {
        throw new BadRequestError('Invalid pagination');
      }
      if (![/name/, /ndc/, /dose/, /label/].some((rx) => rx.test(searchType))) {
        throw new BadRequestError('Valid search type is required.');
      }

      switch (searchType) {
        case 'ndc':
          matchObj.$or = [
            { ndc: searchRegex },
          ];
          break;
        case 'name':
          matchObj.$or = [
            { propname: searchRegex },
            { npropname: searchRegex },
          ];
          break;
        case 'dose':
          matchObj.$or = [
            { dosename: searchRegex },
          ];
          break;
        case 'label':
          matchObj.$or = [
            { labelname: searchRegex },
          ];
          break;
        default:
          break;
      }

      const results = await Drug.aggregate([
        { $match  : matchObj },
        { $sort   : { ndc: 1 } },
        { $project: { createdAt: 0,  __v: 0, 'packages._id': 0 }},
        {
          $facet  : {
            metadata: [
              { $count: 'total' },
              { $addFields: { page: page, limit: LIMIT } },
            ],
            data: [{ $skip: page * LIMIT }, { $limit: LIMIT }],
          },
        },
      ]);
      res.json(results[0]);
    } catch (error) {
      next(error);
    }
  }),
];
