import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import Community from '../components/Community'

class CommunityContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      displayError: false,
      community: [],
      members: [],
      projects: [],
      organizations: [],
    };

    this.parseInfoResponse = this.parseInfoResponse.bind(this);
  }

  componentDidMount() {
    request.get('/api/community/' + this.props.params.id)
    .send()
    .end(this.parseInfoResponse);
  }

  /**
  * Parse the response to the get community request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch(response.status) {
      case 200:
      this.setState({
        community: response.body.community,
        members: response.body.members,
        projects: response.body.projects,
        organizations: response.body.organizations});
        break;
        case 404:
        browserHistory.push('/');
        break;
        case 500:
        this.setState({
          errorMessage: response.body.errorMessage,
          displayError: true
        });
        break;
        default:
        this.setState({
          errorMessage: "Could not get community data",
          displayError: true
        });
      }
    }

    render(){
      return (
        <Community
        errorMessage={this.state.errorMessage}
        displayError={this.state.displayError}
        community={this.state.community}
        members={this.state.members}
        projects={this.state.projects}
        organizations={this.state.organizations} />
      );
    }
  }

  export default CommunityContainer;
