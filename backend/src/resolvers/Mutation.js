const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const HASH_SECRET = process.env.HASH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const { transport, makeANiceEmail } = require('../mail');
const { yearInMs, resetTokenTimeoutInMs, hasRole } = require('../utils');

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
          role: 'GUEST_MEMBER',
          avatarSmall: '/static/img/default-user.jpg'
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
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset your password</a>
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
  async updatePermissions(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    // Query the current user
    const currentUser = await ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info);

    // Have proper roles to do this?
    hasRole(currentUser, ['ADMIN', 'EXECUTIVE_COMMITTEE']);

    // Update permissions
    return ctx.db.mutation.updateUser({
      data: {
        permissions: {
          set: args.permissions,
        }
      },
      where: {
        id: args.userId,
      },
    }, info);
  },
  async submitElection(parent, args, ctx, info) {
    // Logged in?
    // if (!ctx.request.userId) {
    //   throw new Error('User must be logged in');
    // }

    // Query the current user
    // const currentUser = await ctx.db.query.user({
    //   where: { id: ctx.request.userId }
    // }, info);

    // Have proper roles to do this?
    // hasRole(currentUser, ['ADMIN', 'EXECUTIVE_COMMITTEE']);

    const { election } = args;

    // Format races
    const races = election.races.map(race => {
      race.candidates = {
        connect: race.candidates.map(candidate => ({ id: candidate.id }))
      };
      return race;
    });

    // Update permissions
    return ctx.db.mutation.createElection({
      data: {
        electionName: election.electionName,
        startTime: election.startTime,
        endTime: election.endTime, // 1 week default
        races: { create: races },
      },
    }, info);
  },
};

module.exports = Mutations;
