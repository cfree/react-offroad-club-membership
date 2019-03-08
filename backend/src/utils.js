module.exports.hasRole = function hasRole(user, rolesNeeded) {
  const matchedRoles = rolesNeeded.includes(user.role);

  if (!matchedRoles) {
    throw new Error(`You do not have the necessary role
      : ${rolesNeeded}
      You Have
      : ${user.role}
    `);
  }
};

module.exports.hasAccountStatus = function hasAccountStatus(user, statusNeeded) {
  const matchedStatus = statusNeeded.includes(user.accountStatus);

  if (!matchedStatus) {
    throw new Error(`You do not have the necessary account status
      : ${statusNeeded}
      You Have
      : ${user.accountStatus}
    `);
  }
};

module.exports.hasAccountType = function hasAccountType(user, statusNeeded) {
  const matchedStatus = statusNeeded.includes(user.accountType);

  if (!matchedStatus) {
    throw new Error(`You do not have the necessary account type
      : ${statusNeeded}
      You Have
      : ${user.accountType}
    `);
  }
};

module.exports.yearInMs = (1000 * 60 * 60 * 24 * 365); // 1 year
module.exports.resetTokenTimeoutInMs = 3600000;  // 1 hour
