import React from 'react';
import { Navbar } from '../../components';

/**
 * Header section component
 * Combines the Navbar component with any additional header content
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <Navbar />
    </header>
  );
};

export default Header; 