import React from 'react';

const Header = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <h1>{today}</h1>
    </header>
  );
};

export default Header;
