import React from 'react';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>Odinbook</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Odinbook © 2024</p>
      </footer>
    </div>
  );
}

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
