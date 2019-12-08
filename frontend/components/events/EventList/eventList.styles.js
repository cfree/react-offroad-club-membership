import styled from 'styled-components';

export const StyledEvents = styled.div``;

export const StyledEventsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const StyledEvent = styled.li`
  padding: 0;
  margin: 50px 0 0;

  &:first-child {
    margin-top: 0;
  }

  .event {
    display: flex;
  }

  .event-details {
    width: 100%;
  }

  .event-image {
    margin-right: 20px;
  }

  .event-date {
    text-transform: uppercase;
    font-weight: 700;
  }

  .event-title {
    margin: 0;
    line-height: 1;

    a {
      color: #000;
    }
  }

  .event-location {
    color: ${({ theme }) => theme.colors.grey_lighter};
  }

  .event-meta {
    display: flex;
    justify-content: space-between;
  }

  .event-attendees {
    color: ${({ theme }) => theme.colors.grey_lighter};
  }

  .event-attendees__avatars {
    margin-right: 7px;

    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      border: 3px solid white;
      background: tomato;
      display: inline-block;
      position: relative;
      vertical-align: top;

      :nth-of-type(1) {
        z-index: 3;
      }

      :nth-of-type(2) {
        z-index: 2;
      }

      :nth-of-type(3) {
        z-index: 1;
      }

      & + img {
        margin-left: -15px;
      }
    }
  }

  .event-rsvp {
    margin-left: auto;
  }

  .event-comment-count {
    margin-right: 20px;
  }
`;
