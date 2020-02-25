import styled from 'styled-components';

export const StyledEvents = styled.div`
  h2 {
    margin-top: 0;
  }
`;

export const StyledEventsList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 50%;
`;

export const StyledEvent = styled.li`
  & + & {
    padding-top: 10px;
    /* border-top: 2px solid ${({ theme }) => theme.colors.grey_lighter}; */
  }

  padding: 0;
  margin: 0 0 10px;

  /* &:first-child {
    margin-top: 0;
  } */

  .event {
    border: 1px solid ${({ theme }) => theme.colors.grey_lighter};
    border-radius: 5px;
    padding: 20px;
  }

  .event__header {
    display: flex;
    margin-bottom: 20px;
    /* flex-direction: column; */
  }

  .event__header-details {
    margin-right: 10px;
  }

  .event-details {
    width: 100%;
  }

  .event-image {
    border-radius: 5px;
    margin-left: auto;
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
