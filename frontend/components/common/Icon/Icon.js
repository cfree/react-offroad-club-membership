import React from 'react';
import { StyledIcon } from './icon.styles';

const Icon = ({ icon, children }) => {
  return (
    <StyledIcon>
      <span className={`icon-${icon}`}>{children}</span>
    </StyledIcon>
  );
};

export default Icon;
