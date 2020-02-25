import styled from 'styled-components';

export const StyledWrapper = styled.span`
  & + & {
    margin-left: 15px;
  }

  .button {
    border: 3px solid black;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    padding: 10px 10px 7px;
    /* font-family: $font-primary; */
    text-transform: uppercase;
    font-weight: 900;
    font-size: 13px;
    letter-spacing: 2px;
    line-height: 1;
    color: black;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      color: silver;
      border-color: silver;
    }

    &:active,
    &.selected,
    &.selected:hover {
      color: white;
      background: black;
      border-color: black;
    }

    &.disabled {
      cursor: not-allowed;
    }

    &--ghost {
      border: 3px solid white;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      padding: 10px 10px 7px;
      /* font-family: $font-primary; */
      text-transform: uppercase;
      font-weight: 900;
      font-size: 13px;
      letter-spacing: 2px;
      line-height: 1;
      color: white;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        color: silver;
        border-color: silver;
      }

      &:active,
      &.selected,
      &.selected:hover {
        color: black;
        background: white;
        border-color: white;
      }

      &.disabled {
        cursor: not-allowed;
      }
    }
  }
`;
