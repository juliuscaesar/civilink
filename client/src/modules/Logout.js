import React from 'react';
import Auth from './Auth';

class Logout extends React.Component {
  componentWillMount() {
    Auth.deauthenticateUser()
    window.location = '/';
  }
}

export default Logout;
