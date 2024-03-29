import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Profile from '../components/Profile';

/**
* Component for a Profile.
*/
class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      displayError: false,
      profile: [],
      following: [],
      followers: [],
      communities: [],
      feed: []
    };

    this.parseInfoResponse = this.parseInfoResponse.bind(this);
  }

  componentDidMount() {
    request.get('/api/profile/' + this.props.params.id)
    .send()
    .end(this.parseInfoResponse);
  }

  /**
  * Parse the response to the get profile request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch(response.status) {
      case 200:
      this.setState({
        profile: response.body.profile,
        following: response.body.following,
        followers: response.body.followers,
        communities: response.body.communities,
        feed: response.body.activity
      });
      break;
      case 404:
      browserHistory.push('/');
      break;
      case 500:
      this.setState({
        errorMessage: "Could not get user data",
        displayError: true
      });
      break;
      default:
      this.setState({
        errorMessage: "Could not get user data",
        displayError: true
      });
    }
  }

  render(){
    return (
      <Profile
        {...this.state} />
    );
  }
}

export default ProfileContainer;
