import React from 'react';
import Auth from './modules/auth';

class Logout extends React.Component {
  componentWillMount() {
    Auth.deauthenticateUser()
    window.location = '/';
  }
}

export default Logout;
