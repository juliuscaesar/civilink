import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';
import CommunityCard from './CommunityCard';
import { Card, Grid } from 'semantic-ui-react'

/**
* Component for Communities dashboard.
*/
class CommunityDashboard extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      communities: [],
      errorMessage: '',
    };

    //region bind all methods to this
    this.requestInfo = this.requestInfo.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.buildCommunityList = this.buildCommunityList.bind(this);

    // update the page
    this.requestInfo();
  }

  /**
  * Send the request to get the communities
  */
  requestInfo() {
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
      this.setState({errorMessage: "Could not get communities"});
      break;
      default:
      this.setState({errorMessage: "Could not get communities"});
    }
  }

  /**
  * Build the list of communities
  */
  buildCommunityList() {
    var rows = [];

    for (var i = 0; i < this.state.communities.length; i++) {
      rows.push(
        <CommunityCard
          community={this.state.communities[i]}
          />
      );
    }

    return rows;
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
                <h3>My Communities</h3>
                <hr>
                </hr>
                { this.state.errorMessage }
                <Card.Group itemsPerRow={2}>
                  { this.buildCommunityList() }
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default CommunityDashboard;
