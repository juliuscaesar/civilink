import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';
import { Grid, Segment } from 'semantic-ui-react'

/**
* Component for the navbar.
*/
class Community extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      community: [],
      members: [],
      projects: [],
      organizations: []
    };

    //region bind all methods to this
    this.requestInfo = this.requestInfo.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.hideDiv = this.hideDiv.bind(this);
    this.communityInfo = this.communityInfo.bind(this);
    this.issues = this.issues.bind(this);

    // update page by calling the API call
    this.requestInfo();
  }

  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be hidden or {} otherwise
  */
  hideDiv() {
    if (this.state.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }
  /**
  * Send the request to get the community information
  */
  requestInfo() {
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
      case 203:
        this.setState({
          errorMessage: "Could not get community data",
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

    /*
    * Displays the header for the community
    */
    communityInfo() {
      for (var i = 0; i < this.state.community.length; i++) {
        return <h1>{this.state.community[i].name}</h1>
      }
    }

    /*
    * Placeholder for issues
    */
    issues() {
      return <h3>Housing</h3>
    }

    // Render the static content
    render(){
      return (
        <div>
          <Navbar/>
          <div className="container-body">
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Sidebar/>
                </Grid.Column>
                <Grid.Column width={13}>
                  { this.state.errorMessage }
                  <Segment>
                    { this.communityInfo() }
                  </Segment>

                  <Segment>
                    { this.issues() }
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
  );
}
}

export default Community;
