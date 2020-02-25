import React, { useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { StyledWrapper } from './button.styles';

const Button = ({
  onClick,
  children,
  ghost,
  className,
  href,
  selected = false,
  disabled = false,
}) => {
  const handleClick = useCallback((e) => {
    if (!disabled) {
      onClick(e);
    }
  });
  const classes = classnames(
    className,
    {
      'button': !ghost,
      'button--ghost': ghost,
      'selected': selected,
      'disabled': selected,
    },
  );

  const btnComponent = href
    ? <a disabled={disabled} href={href} className={classes}>{children}</a>
    : <button
        disabled={selected}
        onClick={handleClick}
        className={classes}
      >
        {children}
      </button>

  
  return <StyledWrapper>{btnComponent}</StyledWrapper>;
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  ghost: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  selected: PropTypes.boolean,
  disabled: PropTypes.boolean,
};

Button.defaultProps = {
  handleClick: () => { },
  ghost: false,
  className: '',
  href: '',
}

export default Button;
