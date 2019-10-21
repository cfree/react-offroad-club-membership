const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const HASH_SECRET = process.env.HASH_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const { sendTransactionalEmail } = require('../mail');
const {
  yearInMs,
  resetTokenTimeoutInMs,
  hasRole,
  hasAccountStatus,
  hasAccountType,
  isSelf,
} = require('../utils');
const { roles, emailGroups } = require('../config');

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

    // Birthdate - lock out if under 18

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
        },
      },
      info
    );

    // Create JWT token for new user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);

    // Set the JWT as a cookie
    ctx.response.cookie('token', token, tokenSettings);

    return user;
  },
  async login(parent, { username, password }, ctx, info) {
    // Check if there is a user with that username
    const user = await ctx.db.query.user({ where: { username } });

    if (!user) {
      throw new Error('Username or password incorrect');
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
  async requestReset(parent, { email }, ctx, info) {
    // Check if this is a real user
    const user = await ctx.db.query.user({
      where: { email: email },
    });

    if (!user) {
      throw new Error('Invalid email entered');
    }

    // Set reset token and expiry
    const promisifiedRandomBytes = promisify(randomBytes);
    const resetToken = (await promisifiedRandomBytes(20)).toString('hex');
    const resetTokenExpiry = Date.now() + resetTokenTimeoutInMs;
    const res = await ctx.db.mutation.updateUser({
      where: { email: email },
      data: { resetToken, resetTokenExpiry },
    });

    // Email reset token
    return sendTransactionalEmail({
      to: user.email,
      from: 'no-reply@4-playersofcolorado.org',
      subject: 'Your 4-Players Password Reset',
      text: `
        ${user.firstName},

        Your password reset token for user "${user.username}" is here!

        Visit this URL to reset your password:
        ${process.env.FRONTEND_URL}/reset?token=${resetToken}
      `,
      html: `
        Your password reset token for user "${user.username}" is here!
        <a href="${
          process.env.FRONTEND_URL
        }/reset?token=${resetToken}">Click here to reset your password</a>
      `,
    })
      .then(() => ({ message: 'Password reset is en route' }))
      .catch(err => {
        //Extract error msg
        // const { message, code, response } = err;

        //Extract response msg
        // const { headers, body } = response;

        throw new Error(err.toString());
      });
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
      info
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
      info
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

    console.log('EVENT', event);

    const attendees = [
      {
        member: {
          connect: {
            id: ctx.request.userId,
          },
        },
        status: 'GOING',
      },
    ];

    if (event.host !== ctx.request.userId) {
      attendees.push({
        member: {
          connect: {
            username: event.host,
          },
        },
        status: 'GOING',
      });
    }

    const results = await ctx.db.mutation.createEvent(
      {
        data: {
          title: event.title,
          creator: {
            connect: { id: ctx.request.userId },
          },
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
          host: {
            connect: {
              username: event.host,
            },
          },
          rsvps: {
            create: attendees,
          },
          address: event.address,
          trailDifficulty: event.trailDifficulty,
          trailNotes: event.trailNotes,
          rallyAddress: event.rallyAddress,
          rallyTime: event.rallyTime,
          membersOnly: event.membersOnly,
          trail: {
            connect: {
              id: event.trail,
            },
          },
        },
      },
      info
    );

    return { message: 'Your event has been created' };
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
      '{ id, eventsRSVPd { id, status, event { id } } }'
    );

    if (!currentUser) {
      throw new Error('User does not have permission');
    }

    // Has this user already RSVPd?
    const userRSVP = currentUser.eventsRSVPd.find(
      eventRSVP => eventRSVP.event.id === rsvp.eventId
    );

    // If this RSVP is not different, return gracefully
    if (userRSVP && userRSVP.status === rsvp.status) {
      return { message: 'Already RSVPd, no change recorded' };
    }

    // If this RSVP is different, update RSVP
    if (userRSVP && userRSVP.status !== rsvp.status) {
      await ctx.db.mutation.updateRSVP(
        {
          where: { id: userRSVP.id },
          data: { status: rsvp.status },
        },
        info
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
      info
    );

    return { message: 'Thank you for RSVPing' };
  },
  async sendMessage(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    // Requesting user has proper account status?
    const { user } = ctx.request;

    const { to, subject, htmlText } = args;

    if (to.length === 0) {
      throw new Error('No recipients found');
    }

    // Can email ALL users
    if (to.includes('all_users')) {
      hasRole(user, ['ADMIN']);
      hasAccountStatus(user, ['ACTIVE']);
      hasAccountType(user, ['FULL']);
    }

    // Can email guests or full members
    if (
      to.includes('guests') ||
      to.includes('all_active') ||
      to.includes('full_membership')
    ) {
      // Is active full member and at least an officer
      hasRole(user, ['ADMIN', 'OFFICER']);
      hasAccountStatus(user, ['ACTIVE']);
      hasAccountType(user, ['FULL']);
    }

    // Can email run leaders
    if (to.includes('run_leaders')) {
      // Is active full member and at least the Run Master
      hasRole(user, ['ADMIN', 'OFFICER', 'RUN_MASTER']);
      hasAccountStatus(user, ['ACTIVE']);
      hasAccountType(user, ['FULL']);
    }

    // Can email multiple individual members
    if (
      (!to.includes('officers') || !to.includes('webmaster')) &&
      !to.some(subject => subject === emailGroups) &&
      to.length > 1
    ) {
      // Is active full or emeritus and at least a run leader
      hasRole(user, roles.filter(role => role !== 'USER'));
      hasAccountStatus(user, ['ACTIVE']);
      hasAccountType(user, ['FULL', 'EMERITUS']);
    }

    // Can email individual members
    if (
      (!to.includes('officers') || !to.includes('webmaster')) &&
      !to.some(subject => subject === emailGroups)
    ) {
      // Is active full or emeritus
      hasAccountStatus(user, ['ACTIVE']);
      hasAccountType(user, ['FULL', 'EMERITUS', 'ASSOCIATE']);
    }

    // Can email Run Master
    if (to.includes('runmaster')) {
      // Is active member
      hasAccountStatus(user, ['ACTIVE']);
    }

    // Anyone logged in can email the officers or the webmaster

    const emailSettings = {
      from: user.email,
      subject: `[4-Players] ${subject || `Message from ${user.firstName}`}`,
      // text,
      html: htmlText,
    };

    if (
      to.length === 1 &&
      !emailGroups.some(recipient => recipient === to[0])
    ) {
      // Send email to one person
      const email = await ctx.db.query.user(
        {
          where: { username: to[0] },
        },
        '{ email }'
      );

      emailSettings.to = [email];
    } else {
      // Send email to many people
      // To do: email permissions
      const peopleQueries = to
        .filter(recipient => !emailGroups.includes(recipient))
        .map(person => ({ username: person }));
      const groupQueries = to
        .filter(recipient => emailGroups.includes(recipient))
        .map(group => {
          switch (group) {
            case 'officers':
              return {
                NOT: { office: null },
              };
            case 'runmaster':
              return { role: 'RUN_MASTER' };
            case 'webmaster':
              return { title: 'WEBMASTER' };
            case 'run_leaders':
              return { role: 'RUN_LEADER' };
            case 'full_membership':
              return {
                AND: [
                  {
                    OR: [
                      { accountType: 'FULL' },
                      { accountType: 'EMITERUS' },
                      { accountType: 'ASSOCIATE' },
                    ],
                  },
                  { accountStatus: 'ACTIVE' },
                ],
              };
            case 'all_active':
              return { accountStatus: 'ACTIVE' };
            case 'all_users':
              return {
                NOT: { email: null },
              };
            default:
              // guests
              return {
                AND: [{ accountType: 'GUEST' }, { accountStatus: 'ACTIVE' }],
              };
          }
        });

      // To do: handle duplicates, if any
      let query = {
        where: {
          OR: peopleQueries,
        },
      };

      if (groupQueries.length) {
        query = {
          where: {
            OR: [...query.where['OR'], ...groupQueries],
          },
        };
      }

      const emails = await ctx.db.query.users(query, '{ email }');

      if (emails && emails.length > 1) {
        emailSettings.to = 'info@4-playersofcolorado.org';
        emailSettings.bcc = emails.map(email => email.email);
      } else {
        emailSettings.to = user.email;
      }
    }

    if (emailSettings.to.length >= 1) {
      return sendTransactionalEmail(emailSettings)
        .then(() => ({ message: 'Message has been sent' }))
        .catch(err => {
          throw new Error(err.toString());
        });
    }

    throw new Error('No email addresses found for recipient(s)');
  },
  async updateUserProfileSettings(parent, args, ctx, info) {
    // Logged in?
    if (!ctx.request.userId) {
      throw new Error('User must be logged in');
    }

    // Have proper roles to do this?
    if (
      !hasRole(ctx.request.user, ['ADMIN', 'OFFICER'], false) ||
      !isSelf(ctx.request.user, args.id, false)
    ) {
      throw new Error(
        'User profile can only be updated by the user, an admin, or an officer'
      );
    }

    // Requesting user has proper account status?
    hasAccountStatus(ctx.request.user, ['ACTIVE']);
    console.log('data', args.data);
    // Update user
    const obj = {
      data: {
        firstName: args.data.firstName,
        lastName: args.data.lastName,
        username: args.data.username,
        gender: args.data.gender,
        birthdate: args.data.birthdate, // may need to format
        joined: args.data.joined, // may need to format
        contactInfo: {
          upsert: {
            create: {
              id: args.data.contactInfoId,
              street: args.data.street,
              city: args.data.city,
              state: args.data.state,
              zip: args.data.zip,
              phone: args.data.phone,
            },
            update: {
              street: args.data.street,
              city: args.data.city,
              state: args.data.state,
              zip: args.data.zip,
              phone: args.data.phone,
            },
          },
        },
        preferences: {
          upsert: {
            create: {
              id: args.data.preferencesId,
              emergencyContactName: args.data.emergencyContactName,
              emergencyContactPhone: args.data.emergencyContactPhone,
              showPhoneNumber: args.data.showPhoneNumber,
            },
            update: {
              emergencyContactName: args.data.emergencyContactName,
              emergencyContactPhone: args.data.emergencyContactPhone,
              showPhoneNumber: args.data.showPhoneNumber,
            },
          },
        },
      },
      where: { id: args.id },
    };

    console.log('OBJ', obj);
    const results = await ctx.db.mutation.updateUser(obj, info);

    console.log('results', results);

    if (false) {
      return { message: 'Unable to update user profile settings' };
    }
    return { message: 'User profile settings updated' };
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
      info
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
      info
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
