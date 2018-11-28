module.exports = {
  'roles': [
    'ADMIN', // Manage permissions 
    'EXECUTIVE_COMMITTEE', // Administrative area
    'RUN_LEADER', // Able to create events
    'FULL_MEMBER', 
    'EMERITUS_MEMBER', // Associate + roster, no voting rights
    'ASSOCIATE_MEMBER', // No roster, no voting rights, no member's only events/discussion
    'GUEST_MEMBER', // confirmed user - default
  ],
  'accountStatus': [
    'ACTIVE',
    'PAST_DUE', // account overdue - active, must pay
    'DELINQUENT', // account 3 months overdue - locked, must pay
    'REMOVED', // cannot do anything - locked, contact
    'RESIGNED', // cannot do anything - locked, contact 
    'INACTIVE', // cannot do anything - locked, contact 
    'LOCKED', // must be approved
  ],
  'permissions': [
    'DASHBOARD_AREA', // All except locked/inactive/resigned/removed
    'ADMIN_AREA', // Board, admin
    'VOTE_READ', // Full member
    'USER_DELETE', // Admin
    'ROSTER_READ', // Full members, emeritus, board, admin
    'PERMISSION_UPDATE', // Admin
  ],
  'titles': [
    'PRESIDENT', // unique
    'VICE_PRESIDENT', // unique
    'SECRETARY', // unique
    'TREASURER', // unique
    'WEBMASTER', // unique
    'RUNMASTER', // unique
    'RUN_LEADER',
    'CHARTER_MEMBER',
    'EMERITUS_MEMBER',
  ],
};

/**
 * Check Logged-in
 * Check Permission
 * Check Account Status
 */
