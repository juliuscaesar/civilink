import React from 'react';
import request from 'superagent';
import CommunityDashboard from '../components/CommunityDashboard';

/**
* Component for Communities dashboard.
*/
class CommunityDashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      communities: [],
      errorMessage: '',
      displayError: false
    };

    this.parseInfoResponse = this.parseInfoResponse.bind(this);
  }

  /**
  * Send the request to get the communities
  */
  componentDidMount() {
    request.get('/api/community')
    .send()
    .end(this.parseInfoResponse);
  }

  /**
  * Parse the response to the get games request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch(response.status) {
      case 200:
        this.setState({communities: response.body.communities});
        break;
      case 203:
        this.setState({
          displayError: true,
          errorMessage: "Could not get communities"});
        break;
      default:
        this.setState({
          displayError: true,
          errorMessage: "Could not get communities"});
    }
  }

  render(){
    return (
      <CommunityDashboard
        {...this.state} />
    );
  }
}

export default CommunityDashboardContainer;
