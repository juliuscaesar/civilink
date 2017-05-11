import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';
import Auth from '../modules/Auth';
import Activity from './Activity';
import { Grid, Segment, Feed, Message } from 'semantic-ui-react'

/**
* Component for the Dashboard.
*/
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      feed: [],
      user: [],
      projects: [],
      errorMessage: '',
      displayError: false
    };

    //region bind all methods to this
    this.hideDiv = this.hideDiv.bind(this);
    this.requestInfo = this.requestInfo.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.parseProjectResponse = this.parseProjectResponse.bind(this);
    this.buildActivityFeed = this.buildActivityFeed.bind(this);

    // update page
    this.requestInfo();
    this.getProjects();
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
  * Send the request to get the dashboard activity feed
  */
  requestInfo() {
    request
    .get('/api/dashboard/feed')
    .set('token', Auth.getToken())
    .send().end(this.parseInfoResponse);
  }

  /**
  * Send the request to get the dashboard project suggestions
  */
  getProjects() {
    request
    .get('/api/dashboard/projects')
    .set('token', Auth.getToken())
    .send().end(this.parseProjectResponse);
  }

  /**
  * Parse the response to the get dashboard feed request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
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

  /**
   * Builds the activity feed
   */
  buildActivityFeed() {
    var rows = [];

    for (var i = 0; i < this.state.feed.length; i++) {
      rows.push(
        <Activity
          activity={this.state.feed[i]}
          />
      );
    }

    return rows;
  }

  // Render the static content
  render() {
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
                <h3>Activity Feed</h3>
                <hr>
                </hr>
                <Message color='red' style={this.hideDiv()}>
                  Error: { this.state.errorMessage }
                </Message>

                <Segment>
                  {this.errorMessage}
                  <Feed>
                    {this.buildActivityFeed()}
                  </Feed>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Dashboard;
