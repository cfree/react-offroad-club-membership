export { states } from "./states";

export const roles = {
  ADMIN: "Admin",
  OFFICER: "Officer",
  RUN_MASTER: "Run Master",
  RUN_LEADER: "Run Leader",
  USER: "User"
};

export const accountStatuses = {
  ACTIVE: "Active",
  PAST_DUE: "Past Due",
  DELINQUENT: "Delinquent",
  REMOVED: "Removed",
  RESIGNED: "Resigned",
  INACTIVE: "Inactive",
  LIMITED: "Limited",
  LOCKED: "Locked"
};

export const accountTypes = {
  FULL: "Full",
  ASSOCIATE: "Associate",
  EMERITUS: "Emeritus",
  GUEST: "Guest"
};

export const offices = {
  PRESIDENT: "President",
  VICE_PRESIDENT: "Vice President",
  SECRETARY: "Secretary",
  TREASURER: "Treasurer"
};

export const titles = {
  WEBMASTER: "Webmaster",
  // 'RUN_MASTER': 'Run Master',
  // 'RUN_LEADER': 'Run Leader',
  // 'EMERITUS_MEMBER': 'Emeritus Member',
  CHARTER_MEMBER: "Charter Member"
};

export const trailDifficulties = {
  UNKNOWN: "Unknown",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced"
};

export const trailConditions = {
  UNKNOWN: "Unknown",
  CLEAR: "Clear",
  MINOR_ISSUES: "Minor Issues",
  MAJOR_ISSUES: "Major Issues",
  CLOSED: "Closed"
};

export const migrationStatuses = {
  NEEDED: "Not Done",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed"
};

export const rsvpStatuses = {
  NONE: "None",
  CANT_GO: "Can't Go",
  GOING: "Going",
  MAYBE: "Maybe"
};

export const pastRsvpStatuses = {
  NONE: "",
  CANT_GO: "Didn't Go",
  GOING: "Went",
  MAYBE: "Didn't Go"
};
