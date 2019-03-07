import { roles, statuses } from './constants';

export const getMemberType = role => {
  switch (role) {
    case roles.FULL_MEMBER:
    case roles.RUN_LEADER:
    case roles.EXECUTIVE_COMMITTEE:
    case roles.ADMIN:
      return 'Full Member';
    default:
      return role.replace('_', ' ');
  }
};

export const isAdmin = role => role === roles.ADMIN;

export const isBoardMember = role => role === roles.EXECUTIVE_COMMITTEE;

export const isAtLeastBoardMember = role => {
  return [roles.EXECUTIVE_COMMITTEE, roles.ADMIN].includes(role);
};

export const isRunLeader = role => role === roles.RUN_LEADER;

export const isAtLeastRunLeader = role => {
  return [roles.RUN_LEADER, roles.EXECUTIVE_COMMITTEE, roles.ADMIN].includes(role);
};

export const isFullMember = role => role === roles.FULL_MEMBER;

export const isAtLeastFullMember = role => {
  return [roles.FULL_MEMBER, roles.RUN_LEADER, roles.EXECUTIVE_COMMITTEE, roles.ADMIN].includes(role);
};

export const isEmeritusMember = role => role === roles.EMERITUS_MEMBER;

export const isAtLeastEmeritusMember = role => {
  return [roles.EMERITUS_MEMBER, roles.FULL_MEMBER, roles.RUN_LEADER, roles.EXECUTIVE_COMMITTEE, roles.ADMIN].includes(role);
};

export const isAssociateMember = role => role === roles.ASSOCIATE_MEMBER;

export const isAtLeastAssociateMember = role => {
  return [roles.ASSOCIATE_MEMBER, roles.EMERITUS_MEMBER, roles.FULL_MEMBER, roles.RUN_LEADER, roles.EXECUTIVE_COMMITTEE, roles.ADMIN].includes(role);
}

export const isGuestMember = role => role === roles.GUEST_MEMBER;

export const isAtLeastGuestMember = role => {
  return [roles.GUEST_MEMBER, roles.FULL_MEMBER, roles.RUN_LEADER, roles.EXECUTIVE_COMMITTEE, roles.ADMIN].includes(role);
};

export const isActive = status => status === statuses.ACTIVE;
export const isNotActive = status => !isActive(status);

export const isPastDue = status => status === statuses.PAST_DUE;
export const isNotPastDue = status => !isPastDue(status);

export const isDelinquent = status => status === statuses.DELINQUENT;
export const isNotDelinquent = status => !isDelinquent(status);

export const wasRemoved = status => status === statuses.REMOVED;
export const wasNotRemoved = status => !wasRemoved(status);

export const hasResigned = status => status === statuses.RESIGNED;
export const hasNotResigned = status => !hasResigned(status);

export const isInactive = status => status === statuses.INACTIVE;
export const isNotInactive = status => !isInactive(status);

export const isLocked = status => status === statuses.LOCKED;
export const isNotLocked = status => !isLocked(status);
