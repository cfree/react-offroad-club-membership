import { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Select from 'react-select';

import {
  MESSAGE_QUERY,
  SEND_MESSAGE_MUTATION,
} from './message.gql';
// import Filter from '../login/Filter';
import Loading from '../utility/Loading';
import ErrorMessage from '../utility/ErrorMessage';
import RichTextArea from '../utility/RichTextArea';
import { 
  isAdmin,
  isBoardMember,
  isRunMaster,
  isAtLeastRunMaster,
  isActive,
  formatFilterSelect,
  formatFilterSelected,
  emailGroups,
} from '../../lib/utils';

export class Message extends Component {
  state = {
    recipients: (this.props.recipients && this.props.recipients.split(',')) || [],
    subject: '',
    htmlText: '',
  }

  handleSelectChange = (recipients) => {
    const newRecipients = (Array.isArray(recipients))
      ? recipients.map(recipient => recipient.value)
      : [recipients.value];
    console.log('recipients', recipients);
    this.setState({ recipients: newRecipients });
  }

  handleTextChange = (htmlText) => {
    this.setState({ htmlText });
  }

  handleSubjectChange = (e) => {
    this.setState({ subject: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
  }

  determineEmailGroups = (role, status) => {
    const defaultGroups = emailGroups.filter(group => (
      group.value === 'officers' || group.value === 'webmaster'
    ));

    if (!isActive(status)) { return defaultGroups; } 

    if (isAdmin(role) && isActive(status)) {
      return emailGroups;
    }

    if (isBoardMember(role) && isActive(status)) {
      return emailGroups.filter(group => group.value !== 'all_users');
    }

    if (isRunMaster(role) && isActive(status)) {
      return emailGroups
        .filter(group => group.value === 'run_leaders')
        .concat(defaultGroups);
    }

    return emailGroups
      .filter(group => group.value === 'runmaster')
      .concat(defaultGroups);
  }

  render() {
    return (
      <>
        <h3>Send a Message</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <div className="">
              <Query query={MESSAGE_QUERY}>
                {({ data, loading, error }) => {
                  if (loading) {
                    return <div>Loading...</div>;
                  }
                  if (error) {
                    return <div>Error: {error.message}</div>;
                  }

                  const { myself, getMessageRecipients: users } = data;

                  const fullMembersMap = users.reduce((acc, user) => ({
                    ...acc, 
                    [user.username]: `${user.firstName} ${user.lastName}`
                  }), {});

                  return (
                    <>
                      <p>Recipient(s):</p>
                      <Select
                        placeholder="Select recipient(s)"
                        isMulti={isAtLeastRunMaster(myself.role)}
                        defaultValue={formatFilterSelected(this.state.recipients, fullMembersMap)}
                        options={[
                          ...this.determineEmailGroups(myself.role, myself.accountStatus),
                          ...formatFilterSelect(fullMembersMap)
                        ]}
                        onChange={this.handleSelectChange}
                      />
                    </>
                  );
                }}
              </Query>
              <p>Subject:</p>
              <input
                width="200"
                onChange={this.handleSubjectChange}
                type="text"
                name="subject"
                value={this.state.subject}
              />
            </div>
          </div>

          <p>Message:</p>
          <RichTextArea onChange={this.handleTextChange} />
          
          <Mutation
            mutation={SEND_MESSAGE_MUTATION}
            variables={{
              to: this.state.recipients,
              subject: this.state.subject,
              htmlText: this.state.htmlText,
            }}
          >
            {(sendMessage, { data = {}, loading, error }) => (
              <>
                <button disabled={loading} onClick={sendMessage}>Send</button>
                <Loading loading={loading} />
                {data.sendMessage && (
                  <p>{data.sendMessage.message}</p>
                )}
                {error && (
                  <ErrorMessage error={error} />
                )}
              </>
            )}
          </Mutation>
        </form>
      </>
    );
  }
};

export default Message;
