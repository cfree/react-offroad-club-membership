const { addFragmentToInfo } = require('graphql-binding');
const { hasRole, hasAccountType, hasAccountStatus } = require('../utils');

const Query = {
  myself(parent, args, ctx, info) {
    // Check if there is a current user
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info,
    );
  },
  async users(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, [
      'FULL',
      'ASSOCIATE',
      'EMERITUS',
    ]);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    if (args.roles) {
      return ctx.db.query.users(
        {
          where: {
            role_in: args.roles,
            accountStatus: args.accountStatus,
          },
        },
        info,
      );
    }

    return ctx.db.query.users({}, info);
  },
  async user(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, [
      'FULL',
      'ASSOCIATE',
      'EMERITUS',
    ]);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    if (args.username) {
      return ctx.db.query.user(
        {
          where: {
            username: args.username,
          },
        },
        info,
      );
    }

    return ctx.db.query.user(
      {
        where: {
          id: ctx.request.user.id,
        },
      },
      info,
    );
  },
  async getOfficers(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, [
      'FULL',
      'ASSOCIATE',
      'EMERITUS',
    ]);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    return ctx.db.query.users(
      {
        // where: {
        //   role_in: args.roles,
        //   accountStatus: args.accountStatus,
        // },
      },
      info,
    );
  },
  async getMembers(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, [
      'FULL',
      'ASSOCIATE',
      'EMERITUS',
    ]);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    return ctx.db.query.users(
      {
        // where: {
        //   role_in: args.roles,
        //   accountStatus: args.accountStatus,
        // },
      },
      info,
    );
  },
  async electionCandidates(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper role?
    hasRole(ctx.request.user, ['ADMIN', 'OFFICER']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    return ctx.db.query.users(
      {
        where: {
          role_in: args.roles,
          accountStatus: args.accountStatus,
        },
      },
      info,
    );
  },
  getActiveElections(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    return ctx.db.query.elections(
      {
        where: {
          AND: [
            { startTime_lte: new Date().toISOString() },
            { endTime_gt: new Date().toISOString() },
          ],
        },
        orderBy: 'endTime_ASC',
      },
      info,
    );
  },
  getActiveElectionsWithResults(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper role?
    hasRole(ctx.request.user, ['ADMIN', 'OFFICER']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    return ctx.db.query.elections(
      {
        where: {
          AND: [
            { startTime_lte: new Date().toISOString() },
            { endTime_gt: new Date().toISOString() },
          ],
        },
        orderBy: 'endTime_ASC',
      },
      info,
    );
  },
  getElection(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    return ctx.db.query.election(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async getUserVote(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    const votes = await ctx.db.query.votes(
      {
        where: {
          AND: [
            { ballot: { id: args.ballot } },
            { voter: { id: ctx.request.userId } },
          ],
        },
        first: true,
      },
      info,
    );

    // console.log('VOTEs', votes);

    return votes;
  },
};

module.exports = Query;
