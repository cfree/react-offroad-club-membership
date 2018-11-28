const { hasRole } = require('../utils');

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
    // Loggin in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    // Check if user has proper role to query users
    hasRoles(ctx.request.user, [
      'ADMIN',
      'EXECUTIVE_COMMITTEE',
      'RUN_LEADER',
      'FULL_MEMBER',
    ]);

    // If they do, query all the users
    return ctx.db.query.users({}, info);
  },
  async electionCandidates(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper roles?
    hasRole(ctx.request.user, ['ADMIN', 'EXECUTIVE_COMMITTEE']);

    // If they do, query all the users
    return ctx.db.query.users({
      where: {
        role_in: args.roles,
        accountStatus: args.accountStatus,
      },
    }, info);
  },
  getActiveElections(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    // Requesting user has proper roles?
    hasRole(ctx.request.user, ['FULL_MEMBER', 'RUN_LEADER', 'ADMIN', 'EXECUTIVE_COMMITTEE']);

    return ctx.db.query.elections({
      where: {
        AND: [
          { startTime_lte: new Date().toISOString() },
          { endTime_gt: new Date().toISOString() },
        ],
      },
      orderBy: 'endTime_ASC',
    }, info);
  },
  getElection(parent, args, ctx, info) {
    // Logged in?
    // if (!ctx.request.userId) {
    //   throw new Error('You must be logged in');
    // }

    // Requesting user has proper roles?
    // hasRole(ctx.request.user, ['FULL_MEMBER', 'RUN_LEADER', 'ADMIN', 'EXECUTIVE_COMMITTEE']);

    return ctx.db.query.election({
      where: {
        id: args.id
      },
    }, info);
  },
};

module.exports = Query;
