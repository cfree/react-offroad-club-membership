import gql from 'graphql-tag';

export const PROFILE_QUERY = gql`
  query PROFILE_QUERY($username: String) {
    user(username: $username) {
      id
      firstName
      lastName
      email
      gender
      birthdate
      avatar {
        url
      }
      joined
      role
      username
      title
      office
      accountType
      comfortLevel
      contactInfo {
        street
        city
        state
        zip
        phone
      }
      preferences {
        updatedAt
        emergencyContactName
        emergencyContactPhone
        photoPermissions
        showPhoneNumber
      }
      rig {
        image {
          url
        }
      }
      vehicle {
        make
        model
        year
        trim
        name
        outfitLevel
        mods
      }
      eventsRSVPd {
        event {
          id
          title
          startTime
        }
        status
      }
      trailsVisited {
        id
        name
      }
      bandaids {
        id
        occurred
        title
      }
      runReportsLogged {
        id
        reportFiled
        title
      }
      activityLog {
        id
        time
        message
      }
      membershipLog {
        id
        time
        message
      }
    }
  }
`;
