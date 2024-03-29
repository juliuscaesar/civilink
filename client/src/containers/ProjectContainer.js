import React from 'react';
import request from 'superagent';
import Project from '../components/Project';

class ProjectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      displayError: false,
      project: [],
      tasks: [],
      community: [],
      organizer: [],
      causes: []
    };

    this.parseInfoResponse = this.parseInfoResponse.bind(this);
  }

  componentDidMount() {
    request.get('/api/project/' + this.props.params.id)
    .send()
    .end(this.parseInfoResponse);
  }

  /**
  * Parse the response to the get games request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch (response.status) {
      case 200:
        this.setState({
          project: response.body.project,
          tasks: response.body.tasks,
          community: response.body.project.community,
          organizer: response.body.project.user,
          causes: response.body.project.causes
        });
        break;
      case 404:
        window.location = '/';
        break;
      default:
        this.setState({
          errorMessage: response.body.errorMessage,
          displayError: true
        });
    }
  }

  render() {
    return (
      <Project
        {...this.state} />
    );
  }
}

export default ProjectContainer;
