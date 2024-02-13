import React from 'react';
import PropTypes from 'prop-types';

function Icon({ className, size, path }) {
  const [width, height] = [size];

  return (
    <svg
      className={className}
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        className={`${className} transition-transform ease-in-out active:scale-95`}
        d={path}
      />
    </svg>
  );
}

Icon.defaultProps = {
  className: '',
  size: '32',
};

Icon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  path: PropTypes.string.isRequired,
};

export default Icon;
