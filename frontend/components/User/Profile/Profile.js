import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import styled from 'styled-components';
import Link from 'next/link';
import { accountTypes as types, offices, titles } from '../../../lib/constants';

const USER_QUERY = gql`
  query USER_QUERY($username: String) {
    user(username: $username) {
      id
      firstName
      lastName
      avatarSmall
      joined
      role
      username
      titles
      office
      phone
      accountType
      comfortLevel
      vehicle {
        make
        model
        year
        trim
        image
        name
        mods
      }
      log {
        id
        time
        message
        event {
          id
          title
        }
      }
      membershipLog {
        id
        startTime
        endTime
        message
      }
    }
  }
`;

const StyledProfile = styled.div`
  max-width: 800px;
  margin: 0 auto;

  header {
    margin: 0 auto;
  }

  .user-header {
    display: flex;
    justify-content: space-between;
  }

  .user-vehicle {
    height: 370px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid ${({ theme }) => theme.colors.grey_light};
  }

  .user-demographics {
    width: 75%;
    display: flex;

    img {
      margin: -30px 20px 15px;
      border-radius: 50%;
      border: 5px solid white;
    }
  }

  .user-name-info {
    
  }

  .user-name {
    margin: 25px 0 2px;
  }

  .user-full-name {
    margin: 0;
    line-height: 1;
  }

  .user-info {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 1.1rem;

    li {
      display: inline-block;
      margin: 0 0 0 5px;
      padding: 0;

      &:before {
        margin-right: 5px;
        content: '\\2022';
      }

      &:first-child {
        margin-left: 0;

        &:before {
          margin-right: 0;
          content: '';
        }
      }
    }
  }

  .user-actions {
    margin: 25px 20px 0 auto;
    padding: 0;
    list-style: none;

    li {
      height: 20px;
      width: 20px;
      background: tomato;
      margin: 0 0 0 10px;
      padding: 0;
      display: inline-block;
      overflow: hidden;
      text-indent: -9999em;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .user-garage {
    border: 1px solid ${({ theme }) => theme.colors.grey_light};
    background: ${({ theme }) => theme.colors.grey};
    padding: 20px;
  }

  section {
    padding: 20px;
  }

  .user-logs {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
`;

const Profile = ({ username }) => {
  const isSelf = username === undefined;

  return (
    <Query query={USER_QUERY} variables={{ username }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error: {error.message}</div>;
        }

        const { user } = data;

        const convertedTitles = user.titles.map(title => titles[title]);

        return (
          <StyledProfile>
            <header>
              <div
                aria-label={`${user.firstName}'s Vehicle`}
                className="user-vehicle"
                style={{
                  backgroundImage:
                    'url(/static/img/default-vehicle.jpg)',
                }}
              />

              <div className="user-header">
                <div className="user-demographics">
                  <img
                    src="/static/img/default-user.jpg"
                    height="130"
                  />
                  <div className="user-name-info">
                    <div className="user-name">
                      <h2 className="user-full-name">
                        {user.firstName} {user.lastName}
                      </h2>
                    </div>
                    <ul className="user-info">
                      {user.foundingMember && <li>Founding Member</li>}
                      <li>{types[user.accountType]} Member</li>
                      {(user.office || convertedTitles.length > 0) && (
                        <li>
                          {[
                            offices[user.office] || '',
                            ...convertedTitles,
                          ].join(', ')}
                        </li>
                      )}
                      <li>Joined {format(user.joined, 'YYYY')}</li>
                    </ul>
                  </div>
                </div>
                <ul className="user-actions">
                  <li>
                    <Link
                      href={{
                        pathname: 'message',
                        query: { to: user.username },
                      }}
                    >
                      <a>Send Message</a>
                    </Link>
                  </li>
                  {isSelf && (
                    <li>
                      <Link href="/settings/profile">
                        <a>Edit Profile</a>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </header>

            <main>
              {user.vehicle && (
                <div className="user-garage">
                  <h3>{user.firstName}'s Garage</h3>
                  <ul>
                    <li>
                      {user.vehicle.year} {user.vehicle.make}{' '}
                      {user.vehicle.model} {user.vehicle.trim}
                    </li>
                    {user.vehicle.name && (
                      <li>"{user.vehicle.name}"</li>
                    )}
                    {user.comfortLevel && <li>{user.comfortLevel}</li>}
                    {user.vehicle.mods && <li>{user.vehicle.mods}</li>}
                  </ul>
                </div>
              )}

              <section>
                <h3>Logs</h3>
                <div className="user-logs">
                  <div className="membership-log">
                    <h4>Membership History</h4>
                    {user.membershipLog.length > 0 ? (
                      <ul>
                        {user.membershipLog.map(logItem => (
                          <li key={logItem.id}>
                            {logItem.message}: {logItem.startTime}-
                            {logItem.endTime || 'present'}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No items found...</span>
                    )}
                  </div>
                  <div className="activity-log">
                    <h4>Activity Log</h4>
                    {user.log.length > 0 ? (
                      <ul>
                        {user.log.map(logItem => (
                          <li key={logItem.id}>
                            {logItem.time} - {logItem.message}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>No items found...</span>
                    )}
                  </div>
                </div>
              </section>
            </main>
          </StyledProfile>
        );
      }}
    </Query>
  );
}

export default Profile;
