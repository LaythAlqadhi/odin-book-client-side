import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Odinbook</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Odinbook 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
