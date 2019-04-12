import { accountTypes as types } from './constants';

export const getMemberType = type => {
  return `${types[type] || 'Guest'} Member`;
};

// Roles
export const isAdmin = role => role === 'ADMIN';

export const isBoardMember = role => role === 'OFFICER';

export const isAtLeastBoardMember = role => {
  return ['OFFICER', 'ADMIN'].includes(role);
};

export const isRunMaster = role => role === 'RUN_MASTER';

export const isRunLeader = role => role === 'RUN_LEADER';

export const isAtLeastRunMaster = role => {
  return ['RUN_MASTER', 'OFFICER', 'ADMIN'].includes(role);
};

export const isAtLeastRunLeader = role => {
  return ['RUN_LEADER', 'RUN_MASTER', 'OFFICER', 'ADMIN'].includes(role);
};

// Types
export const isFullMember = type => type === 'FULL';

export const isAssociateMember = type => type === 'ASSOCIATE';

export const isAtLeastAssociateMember = type => {
  return ['ASSOCIATE', 'FULL'].includes(type);
}

export const isEmeritusMember = type => type === 'EMERITUS';

export const isAtLeastEmeritusMember = type => {
  return ['EMERITUS', 'ASSOCIATE', 'FULL'].includes(type);
};

export const isGuestMember = type => type === 'GUEST';

export const isAtLeastGuestMember = type => {
  return ['GUEST', 'EMERITUS', 'ASSOCIATE', 'FULL'].includes(type);
};

// Statuses
export const isActive = status => status === 'ACTIVE';
export const isNotActive = status => !isActive(status);

export const isPastDue = status => status === 'PAST_DUE';
export const isNotPastDue = status => !isPastDue(status);

export const isDelinquent = status => status === 'DELINQUENT';
export const isNotDelinquent = status => !isDelinquent(status);

export const wasRemoved = status => status === 'REMOVED';
export const wasNotRemoved = status => !wasRemoved(status);

export const hasResigned = status => status === 'RESIGNED';
export const hasNotResigned = status => !hasResigned(status);

export const isInactive = status => status === 'INACTIVE';
export const isNotInactive = status => !isInactive(status);

export const isLimited = status => status === 'LIMITED';
export const isNotLimited = status => !isLimited(status);

export const isLocked = status => status === 'LOCKED';
export const isNotLocked = status => !isLocked(status);
