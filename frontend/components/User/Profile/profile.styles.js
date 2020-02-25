import styled from 'styled-components';
import { clearFix } from 'polished';

export const StyledProfile = styled.div`
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
    margin-top: 5px;
  }

  .user-demographics {
    width: 60%;
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
      margin: 0 0 0 10px;
      display: inline-block;
      line-height: 1;

      &:first-child {
        margin-left: 0;
      }

      a {
        line-height: 1;
        color: ${({ theme }) => theme.colors.white};
        background: ${({ theme }) => theme.colors.red};
        font-size: 12px;
        padding: 5px 10px;
        transition: background 0.3s;

        &:hover {
          background: ${({ theme }) => theme.colors.red_light};
        }
      }
    }
  }

  .user-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }

  dl {
    ${clearFix()}
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 10px;

    dt {
      font-weight: bold;
      padding: 0;
      margin: 0;
    }

    dd {
      padding: 0;
      margin: 0;
    }
  }

  .user-garage {
    border: 1px solid ${({ theme }) => theme.colors.grey_light};
    background: ${({ theme }) => theme.colors.grey};
    padding: 20px;
  }

  .user-data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;

    &__section {
      h3 {
        margin: 0 0 10px;
        line-height: 1;
      }

      ul {
        border: 1px solid black;
        padding: 10px;
        background: ${({ theme }) => theme.colors.white_dark};
        margin: 0;
        overflow-y: scroll;
        height: 200px;
      }
    }
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
