const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const HASH_SECRET = process.env.HASH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const { transport, makeANiceEmail } = require('../mail');
const { yearInMs, resetTokenTimeoutInMs, hasRole, hasAccountStatus, hasAccountType } = require('../utils');

const getHash = async pw => {
  const salt = await bcrypt.hash(HASH_SECRET, 10);
  return bcrypt.hash(pw, salt);
};

const tokenSettings = {
  httpOnly: true,
  maxAge: yearInMs,
};

const Mutations = {
  async signUp(parent, args, ctx, info) {
    const email = args.email.toLowerCase();

    // VALIDATION
    // throw new Error('');

    // Hash the password
    const password = await getHash(args.password);

    // Create user in database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          email,
          password,
          avatarSmall: '/static/img/default-user.jpg',
          acctCreated: new Date().toISOString(),
        },
      },
      info,
    );

    // Create JWT token for new user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    // Set the JWT as a cookie
    ctx.response.cookie('token', token, tokenSettings);

    return user;
  },
  async login(parent, { email, password }, ctx, info) {
    // Check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) {
      throw new Error('Username or password incorrect for email'); // fix
    }

    // Check if password is correct
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password'); // fix
    }

    // Generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    // Set the cookie with the token
    ctx.response.cookie('token', token, tokenSettings);

    // Return the user
    return user;
  },
  logout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye' };
  },
  async requestReset(parent, args, ctx, info) {
    // Check if this is a real user
    const user = await ctx.db.query.user({
      where: { email: args.email },
    });

    if (!user) {
      throw new Error('Username or password incorrect for email'); // fix
    }

    // Set reset token and expiry
    const promisifiedRandomBytes = promisify(randomBytes);
    const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + resetTokenTimeoutInMs;
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });

    // Email reset token
    const mailRes = await transport.sendMail({
      from: 'craigfreeman@gmail.com',
      to: user.email,
      subject: 'Your password reset',
      html: makeANiceEmail(`
        Your password reset token is here!
        <a href="${
          process.env.FRONTEND_URL
        }/reset?token=${resetToken}">Click here to reset your password</a>
      `),
    });

    return { message: 'En route' };
  },
  async resetPassword(parent, args, ctx, info) {
    // Check if passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if token is legit and not expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - resetTokenTimeoutInMs,
      },
    });

    if (!user) {
      throw new Error('Token invalid or expired');
    }

    // Hash the new password
    const password = await getHash(args.password);

    // Save the new password to the User, remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.JWT_SECRET);

    // Set JWT cookie
    ctx.response.cookie('token', token, tokenSettings);

    // Return the new user
    return updatedUser;
  },
  async updateRole(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    // Query the current user
    const currentUser = await ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info,
    );

    // Have proper roles to do this?
    hasRole(currentUser, ['ADMIN']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // Update role
    return ctx.db.mutation.updateUser(
      {
        data: {
          role: args.role,
        },
        where: {
          id: args.userId,
        },
      },
      info,
    );
  },
  async createEvent(parent, args, ctx, info) {
    // Logged in?
    // if (!ctx.request.userId) {
    //   throw new Error('User must be logged in');
    // }

    // Have proper roles to do this?
    // hasRole(ctx.request.user, ['ADMIN', 'OFFICER', 'RUN_MASTER']);

    // Requesting user has proper account status?
    // hasAccountStatus(ctx.request.user, ['ACTIVE']);

    const { event } = args;

    return ctx.db.mutation.createEvent({
      data: {
        title: 'Test Event',
        description: 'Lorem ippsum sit dolor emet',
        startTime: '2019-05-01T01:00:00.000Z',
        endTime: '2019-05-01T03:00:00.000Z',
        // address: '',
        creator: {
          connect: {
            id: 'cjom00lwgdo3x0a64nm3nxu09',
            // username: 'meow',
          },
        },
        leader: {
          connect: {
            id: 'cjom00v2fdo570a644g7msg6n',
            // username: 'neow',
          },
        },
        rallyPoint: '123 Main Street',
        rallyTime: '2019-05-01T00:45:00.000Z',
        attendees: {
          connect: [
            { id: 'cjom00v2fdo570a644g7msg6n' },
            { id: 'cjom00lwgdo3x0a64nm3nxu09' }, // at least creator and leader (if not the same)
          ],
        },
        // trail: {
        //   connect: {
        //     id: event.trailId,
        //   },
        // },
      },
    });
  },
  async setRSVP(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    const { rsvp } = args;

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // Requesting user has proper role?
    if (ctx.request.userId !== rsvp.userId) {
      hasRole(ctx.request.user, ['ADMIN', 'OFFICER']);
    }

    // Query the current user
    const currentUser = await ctx.db.query.user(
      { where: { id: rsvp.userId } },
      '{ id, eventsRSVPd { id, status, event { id } } }',
    );

    if (!currentUser) {
      throw new Error('User does not have permission');
    }

    // Has this user already RSVPd?
    const userRSVP = currentUser.eventsRSVPd.find(
      eventRSVP => eventRSVP.event.id === rsvp.eventId,
    );

    // If this RSVP is not different, return gracefully
    if (userRSVP && (userRSVP.status === rsvp.status)) {
      return { message: 'Already RSVPd, no change recorded' };
    }

    // If this RSVP is different, update RSVP
    if (userRSVP && userRSVP.status !== rsvp.status) {
      await ctx.db.mutation.updateRSVP(
        {
          where: { id: userRSVP.id },
          data: { status: rsvp.status },
        },
        info,
      );

      return { message: 'Thank you for updating your RSVP' };
    }

    // If RSVP is missing, record RSVP
    await ctx.db.mutation.createRSVP(
      {
        data: {
          status: rsvp.status,
          member: {
            connect: {
              id: rsvp.userId,
            },
          },
          event: {
            connect: {
              id: rsvp.eventId,
            },
          },
        },
      },
      info,
    );

    return { message: 'Thank you for RSVPing' };
  },
  async submitElection(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    // Have proper roles to do this?
    hasRole(ctx.request.user, ['ADMIN', 'OFFICER']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    const { election } = args;

    // Format races
    const races = election.races.map(race => {
      race.candidates = {
        connect: race.candidates,
      };
      return race;
    });

    // Update election
    return ctx.db.mutation.createElection(
      {
        data: {
          electionName: election.electionName,
          startTime: election.startTime,
          endTime: election.endTime, // 1 week default
          races: { create: races },
        },
      },
      info,
    );
  },
  async submitVote(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    // Requesting user has proper account type?
    hasAccountType(ctx.request.user, ['FULL']);

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);

    // Have they voted for this ballot before?
    const { vote } = args;
    const votes = await ctx.db.query.votes(
      {
        where: {
          AND: [
            { ballot: { id: vote.ballot } },
            { voter: { id: ctx.request.userId } },
          ],
        },
      },
      info,
    );

    if (votes.length > 0) {
      throw new Error('User has voted already');
    }

    const data = {
      dateTime: new Date(vote.dateTime),
      ballot: {
        connect: {
          id: vote.ballot,
        },
      },
      voter: {
        connect: {
          id: ctx.request.userId,
        },
      },
    };

    if (vote.candidate) {
      data.candidate = {
        connect: { id: vote.candidate },
      };
    }

    // Record vote
    await ctx.db.mutation.createVote({ data });

    return { message: 'Thank you for voting' };
  },
};

module.exports = Mutations;
