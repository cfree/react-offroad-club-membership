const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HASH_SECRET = process.env.HASH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const { yearInMs } = require('../config');

const Mutations = {
  async signUp(parent, args, ctx, info) {
    const email = args.email.toLowerCase();

    // Hash the password
    const salt = await bcrypt.hash(HASH_SECRET, 10);
    const password = await bcrypt.hash(args.password, salt);

    // Create user in database
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        email,
        password,
        permissions: { set: ['USER'] },
      },
    }, info);

    // Create JWT token for new user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    // Set the JWT as a cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: yearInMs,
    });

    return user;
  },
};

module.exports = Mutations;
