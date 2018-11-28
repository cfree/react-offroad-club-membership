module.exports.hasPermission = function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave),
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions
      : ${permissionsNeeded}
      You Have:
      ${user.permissions}
      `);
  }
}

module.exports.hasRole = function hasRole(user, rolesNeeded) {
  const matchedRoles = rolesNeeded.includes(user.role);

  if (!matchedRoles) {
    throw new Error(`You do not have necessary roles
      : ${rolesNeeded}
      You Have
      : ${user.role}
    `);
  }
};

module.exports.yearInMs = (1000 * 60 * 60 * 24 * 365); // 1 year
module.exports.resetTokenTimeoutInMs = 3600000;  // 1 hour
