import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';

import Loading from '../../utility/Loading';
import { accountTypes as types, offices, titles } from '../../../lib/constants';

const RSVP_MUTATION = gql`
  mutation RSVP_MUTATION($rsvp: RSVPInput) {
    setRSVP(rsvp: $rsvp) {
      message
    }
  }
`;

export default class AttendeeStatus extends Component {
  getUserRSVPStatus = (eventId, myself) => {
    if (this.props.attendees[eventId]) {
      const attendee = this.props.attendees[eventId]
        .find(rsvp => rsvp.member.id === myself.id);

      return (attendee && attendee.status) || null;
    }
    return null;
  }

  updateAttendees = async (setRSVP) => {
    await setRSVP();

    const update = [
      ...this.props.attendees[this.props.eventId],
      {
        member: { ...this.props.user },
        status: 'GOING',
      },
    ];

    this.props.onUpdateEventAttendees({ [this.props.eventId]: update });
  };

  showStatus = status => {
    if (!this.props.isUpcoming) {
      switch (status) {
        case 'GOING':
          return 'WENT';
        case 'MAYBE':
        case 'CANT_GO':
          return null;
      }
      
      return status;
    }

    
    return status;
  }
  
  render() {
    return (
      <Mutation
        mutation={RSVP_MUTATION}
        variables={{
          rsvp: {
            userId: this.props.user.id,
            eventId: this.props.eventId,
            status: 'GOING',
          },
        }}
      >
        {(setRSVP, { loading }) => {
          const status = this.getUserRSVPStatus(
            this.props.eventId,
            this.props.user,
          );

          return (
            <>
              {status || !this.props.isUpcoming ? (
                <>
                  {this.showStatus(status) !== null ? (
                    <Link href={`/event/${this.props.eventId}`}>
                      <a>{this.showStatus(status)}</a>
                    </Link>
                  ) : null}
                </>
              ) : (
                <button
                  disabled={loading}
                  onClick={() => this.updateAttendees(setRSVP)}
                >
                  Attend
                </button>
              )}
              <Loading loading={loading} />
            </>
          );
        }}
      </Mutation>
    );
  }
}
