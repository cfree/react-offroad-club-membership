import { accountTypes as types } from './constants';

export const getMemberType = type => {
  return `${types[type] || 'Guest'} Member`;
};

export const getPhoneNumber = phoneNo => {
  const phoneString = phoneNo.toString();

  return phoneString.length === 10
    ? `(${phoneString.substring(0, 3)}) ${phoneString.substring(
        3,
        6,
      )}-${phoneString.substring(6)}`
    : '';
};

export const formatFilterSelect = obj => {
  return Object.entries(obj).map(entry => ({
    value: entry[0],
    label: entry[1],
  }));
};

export const formatFilterSelected = (values = [], valuesMap) => {
  const result = values
    .filter(value => valuesMap[value])
    .map(value => ({
      value,
      label: valuesMap[value],
    }));

  return result;
};

export const emailGroups = [
  { value: 'officers', label: 'Officers' },
  { value: 'runmaster', label: 'Run Master' },
  { value: 'webmaster', label: 'Webmaster' },
  { value: 'run_leaders', label: 'Run Leaders' },
  { value: 'full_membership', label: 'Active Full Members' },
  { value: 'all_active', label: 'Active Users' },
  { value: 'guests', label: 'Active Guests' },
  { value: 'all_users', label: 'ALL USERS' },
];

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

export const isAtMostRunmaster = role => {
  return ['RUN_MASTER', 'RUN_LEADER', 'USER'].includes(role);
};

export const isAtLeastRunLeader = role => {
  return ['RUN_LEADER', 'RUN_MASTER', 'OFFICER', 'ADMIN'].includes(role);
};

// Types
export const isFullMember = type => type === 'FULL';
export const isNotFullMember = type => type !== 'FULL';

export const isAssociateMember = type => type === 'ASSOCIATE';

export const isAtLeastAssociateMember = type => {
  return ['ASSOCIATE', 'FULL'].includes(type);
};

export const isMember = type => ['EMERITUS', 'FULL'].includes(type);

export const isEmeritusMember = type => type === 'EMERITUS';

export const isAtLeastEmeritusMember = type => {
  return ['EMERITUS', 'ASSOCIATE', 'FULL'].includes(type);
};

export const isGuestMember = type => type === 'GUEST';

export const isAtLeastGuestMember = type => {
  return ['GUEST', 'EMERITUS', 'ASSOCIATE', 'FULL'].includes(type);
};

export const formatPhone = phoneNum => {
  const phone = phoneNum.toString();
  const areaCode = phone.substring(0, 3);
  const prefix = phone.substring(3, 6);
  const line = phone.substring(6);

  return `${areaCode}-${prefix}-${line}`;
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

// Cloudinary upload presets
export const getUploadLocation = appendage =>
  process.env.NODE_ENV === 'development'
    ? `dev_${appendage}`
    : `prod_${appendage}`;

export const uploadImage = async (file, location) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', getUploadLocation(location));

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/fourplayers/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const jsonResults = await res.json();

    if (jsonResults) {
      return {
        publicId: jsonResults.public_id,
        url: jsonResults.secure_url,
        smallUrl: jsonResults.eager[0].secure_url,
      };
    }
  } catch (e) {
    return null;
  }
};
