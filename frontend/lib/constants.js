export { states } from './states';

export const roles = {
  ADMIN: 'Admin',
  OFFICER: 'Officer',
  RUN_MASTER: 'Run Master',
  RUN_LEADER: 'Run Leader',
  USER: 'User',
};

export const accountStatuses = {
  // Paid-up full members
  ACTIVE: 'Active',
  // Full members who haven't paid dues between 1/1 and 3/31
  PAST_DUE: 'Past Due',
  // Full members who haven't paid dues between 4/1 and 12/31
  DELINQUENT: 'Delinquent',
  // Members who have been removed by the officers
  REMOVED: 'Removed',
  // Members who no longer want to be associated
  RESIGNED: 'Resigned',
  // Full members: Dues not received in a year
  INACTIVE: 'Inactive',
  // For Guests who should join or leave
  LIMITED: 'Limited',
  // For new profiles
  LOCKED: 'Locked',
};

export const accountTypes = {
  FULL: 'Full',
  ASSOCIATE: 'Associate',
  EMERITUS: 'Emeritus',
  DECEASED: 'Deceased',
  GUEST: 'Guest',
};

export const offices = {
  PRESIDENT: 'President',
  VICE_PRESIDENT: 'Vice President',
  SECRETARY: 'Secretary',
  TREASURER: 'Treasurer',
};

export const titles = {
  WEBMASTER: 'Webmaster',
  CHARTER_MEMBER: 'Charter Member',
  HISTORIAN: 'Historian',
};

export const trailDifficulties = {
  UNKNOWN: 'Unknown',
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export const trailConditions = {
  UNKNOWN: 'Unknown',
  CLEAR: 'Clear',
  MINOR_ISSUES: 'Minor Issues',
  MAJOR_ISSUES: 'Major Issues',
  CLOSED: 'Closed',
};

export const migrationStatuses = {
  NEEDED: 'Not Done',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const eventTypes = {
  RUN: 'Run',
  COLLECTION: 'Collection of Events', // Moab, camping, etc.
  FUNDRAISING: 'Fundraising', // Beer bust, etc.
  MEETING: 'Meeting',
  CLINIC: 'Clinic',
  SOCIAL: 'Social',
};

export const rsvpStatuses = {
  NONE: 'None',
  CANT_GO: "Can't Go",
  GOING: 'Going',
  MAYBE: 'Maybe',
};

export const pastRsvpStatuses = {
  NONE: '',
  CANT_GO: "Didn't Go",
  GOING: 'Went',
  MAYBE: "Didn't Go",
};

export const outfitLevel = {
  MODIFIED: 'Modified',
  STOCK: 'Stock',
};

export const DEFAULT_AVATAR_SRC = '/static/img/default-user.jpg';
export const DEFAULT_AVATAR_SMALL_SRC = '/static/img/default-user.jpg';
export const DEFAULT_RIG_SRC = '/static/img/default-vehicle.jpg';
export const DEFAULT_EVENT_SRC =
  'https://s3.us-west-2.amazonaws.com/images-prod.trailsoffroad.com/trails/299/highlights/resized_2017-08-11_12.30.25-2_3.jpg';
export const DEFAULT_EVENT_SMALL_SRC = 'https://placekitten.com/150/100';
export const DEFAULT_TRAIL_SRC = 'https://placekitten.com/700/400';
export const DEFAULT_TRAIL_SMALL_SRC = 'https://placekitten.com/150/100';

export const membershipLogMessages = {
  ACCOUNT_CREATED: 'Account created',
  ACCOUNT_UNLOCKED: logger => `Account unlocked by ${logger}`,
  ACCOUNT_CHANGED: (property, beforeState, afterState, logger) =>
    logger
      ? `${property} changed from "${beforeState}" to "${afterState}" by ${logger}`
      : `${property} automatically changed from "${beforeState}" to "${afterState}"`,
  ACCOUNT_REJECTED: (logger, reason) =>
    `Account rejected by ${logger}: ${reason}`,
  DUES_PAID: logger =>
    logger ? `Dues received by ${logger}` : `Dues received via website`,
  OFFICE_ADDED: (office, logger) => `"${office}" office added by ${logger}`,
  OFFICE_REMOVED: (office, logger) => `"${office}" office removed by ${logger}`,
  TITLE_ADDED: (title, logger) => `"${title}" title added by ${logger}`,
  TITLE_REMOVED: (title, logger) => `"${title}" title removed by ${logger}`,
  MEMBERSHIP_ELIGIBLE: 'Eligible for membership',
  GUEST_RESTRICTED: 'Attended 3 runs',
};

export const activityLogMessage = {
  EVENT_ATTENDED: (title, type) => `Attended "${title}" ${type}`,
  RUN_LEAD: title => `Led "${title}" run`,
  EVENT_REVIEW_SUBMITTED: (title, type) =>
    `Wrote a review for "${title}" ${type}`,
  RUN_REPORT_SUBMITTED: (title, type) =>
    `Wrote a Run Report for "${title}" ${type}`,
  GALLERY_PHOTO_SUBMITTED: title => `Added a photo to "${title}" gallery`,
  GALLERY_PHOTOS_SUBMITTED: title => `Added photos to "${title}" gallery`,
  PROFILE_PHOTO_SUBMITTED: 'Added a new profile photo',
  RIGBOOK_PHOTO_SUBMITTED: 'Added a new Rigbook photo',
  // COMMENTED: '',
  MEMBERSHIP_GRANTED: 'Became a Full Member',
};
