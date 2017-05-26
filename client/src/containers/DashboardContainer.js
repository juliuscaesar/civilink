import React from 'react';
import request from 'superagent';
import ActivityFeed from '../components/ActivityFeed';
import Auth from '../components/Auth';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
      user: [],
      projects: [],
      errorMessage: '',
      displayError: false
    };

    this.parseFeedResponse = this.parseFeedResponse.bind(this);
    this.parseProjectResponse = this.parseProjectResponse.bind(this);
  }

  componentDidMount() {
    request
    .get('/api/dashboard/feed')
    .set('token', Auth.getToken())
    .send()
    .end(this.parseFeedResponse);

    request
    .get('/api/dashboard/projects')
    .set('token', Auth.getToken())
    .send()
    .end(this.parseProjectResponse);
  }

  /**
  * Parse the response to the get dashboard feed request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseFeedResponse(error, response) {
    switch (response.status) {
      case 200:
        this.setState({
          feed: response.body.feed.reverse(),
          user: response.body.user
        });
        break;
      case 203:
        this.setState({
          errorMessage: "Could not get activity feed",
          displayError: true
        });
        break;
      default:
        this.setState({
          errorMessage: "Could not get activity feed",
          displayError: true
        });
    }
  }

  /**
  * Parse the response to the get dashboard feed request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseProjectResponse(error, response) {
    switch (response.status) {
      case 200:
        this.setState({projects: response.body.projects});
        break;
      case 203:
        this.setState({
          errorMessage: "Could not get projects",
          displayError: true
        });
        break;
      default:
        this.setState({
          errorMessage: "Could not get projects",
          displayError: true
      });
    }
  }

  render() {
    return (
      <ActivityFeed
        {...this.state} />

    );
  }
}

export default DashboardContainer;
