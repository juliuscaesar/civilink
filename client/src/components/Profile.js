import React from 'react';
import UserImage from './UserImage';
import Activity from './Activity';
import { Grid, Segment, Feed, Statistic, List, Message } from 'semantic-ui-react';

const Profile = ({errorMessage, displayError, profile, following, followers, communities, feed}) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be
  * hidden or {} otherwise
  */
  const hideDiv = () => {
    if (displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /*
  * Builds the activity feed
  */
  const buildActivityFeed = () => {
    var rows = [];
    for (var i = 0; i < feed.length; i++) {
      rows.push(
        <Activity
          activity={feed[i]} />
      );
    }
    return rows;
  }

  /**
   * Return the stats to be displayed for this user
   */
  const getStats = () => {
    return [
      { label: "points" , value: profile.points },
      { label: "followers", value: followers.length },
      { label: "following", value: following.length }
      ]
  }

  const displayUserDetails = () => {
    const details = [];
    const location = profile.city + ", " + profile.state;
    details.push(
      <List>
        <List.Item icon='marker' content={location} />
      </List>
    );

    return details;
  }

  return (
    <div>
      <Message color='red' style={hideDiv()}>
        Error: {errorMessage}
      </Message>
      
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <Segment>
              <h3 className="header">
                {profile.firstName} {profile.lastName}
                <br />
                <small>@{profile.username}</small>
              </h3>
              <UserImage profile={profile} size='150px' />
              {profile.desc}
              <hr />
              { displayUserDetails() }
              <hr />
              <Statistic.Group
                items={getStats()}
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
                {buildActivityFeed()}
              </Feed>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Profile;
