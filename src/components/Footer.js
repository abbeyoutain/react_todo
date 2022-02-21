import React from 'react'
import Logout from './Auth/Logout'
import { useAuth } from '../contexts/AuthContext';
import './Footer.css'

export default function Footer() {
    const {currentUser} = useAuth();

    return (
        <>
          {currentUser &&
            <Logout />
          }
        <footer id="footer" className="sticky-bottom text-center text-white p-4">
            <p className="bold">
                <em>&copy; {new Date().getFullYear()} All rights reserved</em>
            </p>
        </footer>
        </>
    );
      
}
