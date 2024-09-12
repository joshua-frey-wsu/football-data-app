import React, { useState } from 'react';
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

export const NavBar = () => {

    const { isAuthenticated } = useAuth0();

    return (
        <nav style={styles.navbar}>
          <div style={styles.navTitle}>
            <Link to="/" style={styles.homeLink}>Football Data</Link>
          </div>
          <div style={styles.navLinks}>
            {!isAuthenticated && (
            <>
                <LoginButton />
            </>
            )}
            {isAuthenticated && (
            <>
                <Link to="/profile" >
                  <button>Profile</button>
                </Link>
                <LogoutButton />
            </>
            )}
          </div>
        </nav>
      );
};

// Styles for the navbar
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: '10px 20px',
    color: 'white',
  },
  navTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 15px',
  },
};

