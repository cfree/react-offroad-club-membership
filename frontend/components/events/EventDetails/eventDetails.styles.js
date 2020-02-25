import styled from 'styled-components';

export const StyledEvent = styled.div`
  .event__header {
    padding: 20px 40px 40px;
    position: relative;
    display: flex;
    /* justify-content: space-between; */
  }

  .event__calendar {
    width: 45px;
    padding-top: 7px;
  }

  .event__info {
    margin: 0 40px 0 20px;
  }

  .event__date {
    color: ${({ theme }) => theme.colors.black_light};
  }

  .event__title {
    margin: 0 0 20px;
    line-height: 1;
  }

  .event__leader {
    img {
      float: left;
      margin-right: 10px;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.black_light};
    }
  }

  .event__rsvp {
    margin: 10px 0 0 auto;
  }

  .event__details {
    padding: 40px;
    position: relative;
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 2fr 250px;
    border-top: 5px solid ${({ theme }) => theme.colors.grey_light};
  }

  .event__columns {
    /* background: ${({ theme }) => theme.colors.grey};
    border: 1px solid ${({ theme }) => theme.colors.grey_lighter};
    border-radius: ${({ theme }) => theme.shape.borderRadius}; */
  }

  .event__aside {
    /* padding: 20px; */
    /* background: ${({ theme }) => theme.colors.grey};
    border: 1px solid ${({ theme }) => theme.colors.grey_lighter};
    border-radius: ${({ theme }) => theme.shape.borderRadius}; */
  }

  .event__aside-wrapper {
    position: sticky;
    top: 20px;
  }

  .event__section {
    img {
      max-width: 100%;
      height: auto;
    }
    /* padding: 20px; */

    & + .event__section {
      margin-top: 20px;
    }
  }

  .event__attendees {
    display: grid;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
