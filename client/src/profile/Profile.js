import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';
import UserImage from './UserImage';
import Activity from '../dashboard/Activity';
import { Grid, Segment, Feed, Statistic, List } from 'semantic-ui-react';

/**
* Component for a Profile.
*/
class Profile extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      profile: [],
      following: [],
      followers: [],
      communities: [],
      feed: []
    };

    //region bind all methods to this
    this.requestInfo = this.requestInfo.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.hideDiv = this.hideDiv.bind(this);
    this.communityList = this.communityList.bind(this);
    this.buildActivityFeed = this.buildActivityFeed.bind(this);


    // update page
    this.requestInfo();
  }

  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be
  * hidden or {} otherwise
  */
  hideDiv() {
    if (this.state.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }
  /**
  * Send the request to get the profile information
  */
  requestInfo() {
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
      case 203:
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

  /*
  * Returns the community list
  */
  communityList() {
    var rows = [];
    var url = '';

    for (var i = 0; i < this.state.communities.length; i++) {
      url = "/" + this.state.communities[i].community.url;
      rows.push(
        <a href={url}>
          {this.state.communities[i].community.name}
        </a>
      )
    }

    return rows;
  }

  /*
  * Builds the activity feed
  */
  buildActivityFeed() {
    var rows = [];

    for (var i = 0; i < this.state.feed.length; i++) {
      rows.push(
        <Activity
          activity={this.state.feed[i]} />
      );
    }

    return rows;
  }

  /**
   * Return the stats to be displayed for this user
   */
  getStats() {
    return [
      { label: "points" , value: this.state.profile.points },
      { label: "followers", value: this.state.followers.length },
      { label: "following", value: this.state.following.length }
      ]
  }

  displayUserDetails() {
    const details = [];
    const location = this.state.profile.city + ", " + this.state.profile.state;
    details.push(
      <List>
        <List.Item icon='marker' content={location} />
      </List>
    );

    return details;
  }

  // Render the static content
  render(){
    return (
      <div>
        <Navbar/>
        <div className="ui container container-body">
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Sidebar/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Segment>
                        <h3 className="header">
                          {this.state.profile.firstName} {this.state.profile.lastName}
                          <br />
                          <small>@{this.state.profile.username}</small>
                        </h3>
                        <UserImage profile={this.state.profile} size='150px' />
                        {this.state.profile.desc}
                        <hr />

                        { this.displayUserDetails() }
                        <hr />
                        <Statistic.Group
                          items={this.getStats()}
                          color='blue'
                          size='mini'
                          widths='3'
                          horizontal
                        />
                      </Segment>
                    </Grid.Column>
                    <Grid.Column width={11}>
                      <Segment>
                        <h3 className="header">Activity Feed</h3>
                        <hr />
                        <Feed>
                          {this.buildActivityFeed()}
                        </Feed>
                      </Segment>

                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Profile;
