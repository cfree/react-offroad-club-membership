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
      info
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
    const query = {
      orderBy: 'firstName_ASC',
      where: {},
    };

    if (args.role && args.role.length) {
      query.where = {
        role_in: args.role,
      };
    }
    if (args.accountStatus && args.accountStatus.length) {
      query.where = {
        ...query.where,
        accountStatus_in: args.accountStatus,
      };
    }
    if (args.accountType && args.accountType.length) {
      query.where = {
        ...query.where,
        accountType_in: args.accountType,
      };
    }
    if (args.office && args.office.length) {
      query.where = {
        ...query.where,
        office_in: args.office,
      };
    }
    if (args.title && args.title.length) {
      query.where = {
        ...query.where,
        title_in: args.title,
      };
      // query.where = {
      //   AND: [
      //     { accountType_in: args.accountType, },
      //     { accountStatus_in: args.accountStatus, },
      //     { role_in: args.role, },
      //     { office_in: args.office, },
      //     { title_in: args.title, },
      //   ],
      // };
    }

    // Sorting?
    // if (args.orderBy && args.orderBy.length > 0) {
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

    // If they do, query the user
    if (args.username) {
      const user = await ctx.db.query.user(
        {
          where: {
            username: args.username,
          },
        },
        info
      );

      if (user) {
        return user;
      } else {
        throw new Error('User cannot be found');
      }
    }

    return ctx.db.query.user(
      {
        where: {
          id: ctx.request.user.id,
        },
      },
      info
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
      info
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
      info
    );

    // Sort by lastName then firstName
    results.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

    return results;
  },
  async getRunLeaders(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Requesting user has proper role?
    hasRole(ctx.request.user, ['ADMIN', 'OFFICER', 'RUN_MASTER']);

    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // Return all run leaders
    const results = await ctx.db.query.users(
      {
        where: {
          AND: [
            { accountStatus: 'ACTIVE' },
            { accountType: 'FULL' },
            { role_in: ['ADMIN', 'OFFICER', 'RUN_MASTER', 'RUN_LEADER'] },
          ],
        },
        orderBy: 'firstName_ASC',
      },
      info
    );

    // Sort by lastName then firstName
    results.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));

    return results;
  },
  async getMessageRecipients(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const { user } = ctx.request;
    const members = ['FULL', 'ASSOCIATE', 'EMERITUS'];
    const query = {
      where: {},
      orderBy: 'firstName_ASC',
    };

    if (!hasAccountStatus(user, ['ACTIVE'], false)) {
      return [];
    }

    if (hasRole(user, ['ADMIN', 'OFFICER'], false)) {
      query.where = { accountType_in: config.accountType };
    } else if (hasAccountType(user, members, false)) {
      query.where = {
        AND: [{ accountStatus: 'ACTIVE' }, { accountType_in: members }],
      };
    } else {
      return [];
    }

    const results = await ctx.db.query.users(query, info);

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
      info
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
      info
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
      info
    );
  },
  async getTrails(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper account status?
    hasRole(ctx.request.user, ['ADMIN', 'OFFICER', 'RUN_MASTER', 'RUN_LEADER']);
    hasAccountStatus(ctx.request.user, ['ACTIVE']);
    hasAccountType(ctx.request.user, ['FULL']);

    // If they do, query all the users
    return ctx.db.query.trails({}, info);
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
      info
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
      info
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
      info
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
      info
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
      info
    );

    // console.log('VOTEs', votes);

    return votes;
  },
};

module.exports = Query;
