const { rest, setupWorker } = require('msw');
import baseURL from 'baseURL';

export const handlers = [
  rest.get(`${baseURL}/posts`, (req, res, ctx) => {
    console.log('handler called');
    return res(
      ctx.status(200),
      ctx.json([
        // {
        //   _id: '63e56ebfd31674f08db1aaf5',
        //   firstName: 'DEV TEST',
        //   lastName: 'REAL',
        //   location: 'king county1',
        //   likes: {},
        //   comments: [],
        //   description: 'This is REAL TEST DESCRIPTION 1',
        //   userId: '63e56eb2d31674f08db1a810',
        // },
        // {
        //   _id: '63e564954b9ed7dc2ee4eed3',
        //   firstName: 'DEV TEST2',
        //   lastName: 'REAL2',
        //   location: 'king county2',
        //   likes: {},
        //   comments: [],
        //   description: 'This is REAL TEST DESCRIPTION 2',
        //   userId: '"63e2fe1aee8944e32fdb7391"',
        // },
      ])
    );
  }),
];
