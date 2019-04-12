const { addFragmentToInfo } = require('graphql-binding');
const { hasRole, hasAccountType, hasAccountStatus } = require('../utils');
const config = require('../config');

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
    hasAccountType(ctx.request.user, ['FULL', 'ASSOCIATE', 'EMERITUS']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    const query = { orderBy: 'firstName_ASC' };

    if (args.roles) {
      query.where = {
        roles_in: args.roles,
        accountStatus_in: args.accountStatus,
      };
    } else {
      query.where = {
        accountType_in: args.accountType,
        accountStatus_in: args.accountStatus,
      };
    }

    // Sorting?
    // if (args.orderBy && args.orderBy.length > 1) {
    //   query.orderBy = args.orderBy[0];
    // }

    const results = await ctx.db.query.users(query, info);
    results.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
    return results;
  },
  async user(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL', 'ASSOCIATE', 'EMERITUS']);

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
  async getOfficer(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL', 'ASSOCIATE', 'EMERITUS']);

    // // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query the officer
    const results = await ctx.db.query.users(
      {
        where: {
          office: args.office,
        },
      },
      info,
    );

    return results.length > 0 ? results[0] : {};
  },
  async getMembers(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL', 'ASSOCIATE', 'EMERITUS']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the members
    const results = await ctx.db.query.users(
      {
        where: {
          AND: [
            { accountStatus: 'ACTIVE' },
            { accountType_in: args.accountTypes },
            { office: null }, // No officers
          ],
        },
        orderBy: 'firstName_ASC',
      },
      info,
    );

    // Sort by lastName then firstName
    results.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

    return results;
  },
  async getUpcomingEvents(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    return ctx.db.query.events(
      {
        where: {
          startTime_gte: new Date().toISOString(),
        },
        orderBy: 'startTime_ASC',
      },
      info,
    );
  },
  async getPastEvents(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    return ctx.db.query.events(
      {
        where: {
          startTime_lte: new Date().toISOString(),
        },
        orderBy: 'startTime_DESC',
      },
      info,
    );
  },
  async getEvent(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // If they do, query all the users
    return ctx.db.query.event(
      {
        where: { id: args.eventId },
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
