import styled from 'styled-components';
import { lighten, darken, rgba } from 'polished';

export const StyledRace = styled.section`
  padding: 20px;
  background: ${({ theme }) => theme.colors.white_dark};
  margin-bottom: 20px;
`;

export const StyledFieldset = styled.fieldset`
  padding: 20px;
  background: white;
  border: none;
  position: relative;

  &[disabled] ${StyledCandidate} {
    &:after {
      content: 'Your selection has been recorded';
      color: white;
      font-size: 40px;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      background: ${({ theme }) =>
        rgba(lighten(0.2, theme.colors.grey_light), 0.7)};
      position: absolute;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    label:hover {
      border: 10px solid transparent;
    }
  }
`;

export const StyledBallotList = styled.ul`
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-gap: 10px;

  li > div {
    height: 100%;
  }
`;

export const StyledCandidate = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;

  &:hover label {
    border: 10px solid ${({ theme }) => theme.colors.red_light};
  }

  [type='radio']:checked + label {
    border: 10px solid ${({ theme }) => theme.colors.red};

    &:after {
      position: absolute;
      content: 'Selected';
      color: white;
      font-size: 30px;
      text-transform: uppercase;
      font-weight: bold;
      
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => rgba(theme.colors.red, 0.8)};
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }

  label {
    display: block;
    border: 10px solid transparent;
    border-radius: 5px;
    position: relative;
    height: 100%;
  }

  input {
    position: absolute;
    left: -9999em;
    height: 0;
    width: 0;
  }
`;

export const StyledVoteButton = styled.button`
  border: none;
  box-shadow: none;
  border-radius: 3px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.green};
  transition: background 0.3s;
  cursor: pointer;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;

  &:hover {
    background: ${({ theme }) => darken(0.2, theme.colors.green)};
  }

  & + & {
    margin-left: 20px;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.white_dark};
    cursor: not-allowed;
  }
`;

export const StyledAbstainButton = styled(StyledVoteButton)`
  && {
    background: ${({ theme }) => darken(0.2, theme.colors.white_dark)};

    &:hover {
      background: ${({ theme }) => lighten(0.2, theme.colors.grey_light)};
    }
  }
`;
