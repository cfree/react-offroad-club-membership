import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Loading from '../../utility/Loading';

const RSVP_MUTATION = gql`
  mutation RSVP_MUTATION($rsvp: RSVPInput) {
    setRSVP(rsvp: $rsvp) {
      message
    }
  }
`;

const StyledRsvp = styled.div`
  display: inline-block;

  .rsvp__attendees {
    margin-bottom: 7px;
    width: 250px;
  }

  .rsvp__count {
    margin-left: 10px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.black_light};
  }

  .past-rsvp__status {
    font-size: 1.6rem;
    font-weight: 700;
    width: 250px;
  }

  .past-rsvp__count {
    font-size: 1.2rem;
    font-weight: 400;
    margin-left: 20px;
  }
`;

export default class Rsvp extends Component {
  state = {
    status: this.props.userStatus,
    attendeeCount: this.props.attendeeCount,
    isPastEvent: this.props.pastEvent,
  }

  static propTypes = {
    userStatus: PropTypes.string,
    attendeeCount: PropTypes.number,
    userId: PropTypes.string,
    eventId: PropTypes.string,
    pastEvent: PropTypes.bool,
  }

  handleClick = (status, callback) => {
    this.setState(state => {
      let count;

      if (state.status === this.props.userStatus) {
        // Has not RSVPd
        switch (status) {
          case 'GOING':
            count = ++state.attendeeCount;
            break;
          case 'CANT_GO':
          case 'MAYBE':
            count = --state.attendeeCount;
          default:
            count = state.attendeeCount;
        }
      } else {
        // Has RSVPd
        if (state.status === 'GOING' && (status === 'MAYBE' || status === 'CANT_GO')) {
          count = --state.attendeeCount;
        } else if ((state.status === 'MAYBE' || state.status === 'CANT_GO') && status === 'GOING') {
          count = ++state.attendeeCount;
        } else {
          count = state.attendeeCount;
        }
      }

      return {
        status,
        attendeeCount: count,
      };
    }, callback);
  }

  getPastRsvpText = () => {
    switch (this.state.status) {
      case 'GOING':
        return `You went`;
      case 'MAYBE':
      case 'CANT_GO':
      default:
        return `You didn't go`;
    }
  }

  getPastCountText = () => {
    switch (this.state.attendeeCount) {
      case 0:
        return `Nobody went`;
      case 1:
        return `1 person went`;
      default:
        return `${this.state.attendeeCount} people went`;
    }
  }

  getRsvpText = () => {
    switch (this.state.status) {
      case 'GOING':
        return `You're going`;
      case 'MAYBE':
        return `You're considering it`;
      case 'CANT_GO':
        return `You're not going`;
      default:
        return 'Are you going?';
    }
  }

  render() {
    return (
      <Mutation
        mutation={RSVP_MUTATION}
        variables={{
          rsvp: {
            userId: this.props.userId,
            eventId: this.props.eventId,
            status: this.state.status,
          },
        }}
      >
        {(setRsvp, { loading, error }) => {
          return (
            <StyledRsvp>
              {this.state.isPastEvent ? (
                <div className="past-rsvp__status">
                  {this.getPastRsvpText()}{' '}
                  <span className="past-rsvp__count">
                    {this.getPastCountText()}
                  </span>
                </div>
              ) : (
                <>
                  <div className="rsvp__attendees">
                    {this.getRsvpText()}
                    <span className="rsvp__count">
                      {this.state.attendeeCount} going
                    </span>
                  </div>
                  <button
                    disabled={
                      loading || this.state.status === 'GOING'
                    }
                    onClick={() => this.handleClick('GOING', setRsvp)}
                  >
                    Yes
                  </button>
                  <button
                    disabled={
                      loading || this.state.status === 'MAYBE'
                    }
                    onClick={() => this.handleClick('MAYBE', setRsvp)}
                  >
                    Maybe
                  </button>
                  <button
                    disabled={
                      loading || this.state.status === 'CANT_GO'
                    }
                    onClick={() =>
                      this.handleClick('CANT_GO', setRsvp)
                    }
                  >
                    No
                  </button>
                  <Loading loading={loading} />
                </>
              )}
            </StyledRsvp>
          );
        }}
      </Mutation>
    );
  }
}
