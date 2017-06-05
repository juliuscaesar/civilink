import React from 'react';
import UserImage from './UserImage';
import ActivityFeed from './ActivityFeed';
import { Grid, Segment, Statistic, List, Message } from 'semantic-ui-react';

const Profile = (props) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be
  * hidden or {} otherwise
  */
  const hideDiv = () => {
    if (props.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
   * Return the stats to be displayed for this user
   */
  const getStats = () => {
    return [
      { label: "points" , value: props.profile.points },
      { label: "followers", value: props.followers.length },
      { label: "following", value: props.following.length }
      ]
  }

  const displayUserDetails = () => {
    const details = [];
    const location = props.profile.city + ", " + props.profile.state;
    details.push(
      <List key="1">
        <List.Item icon='marker' content={location} />
      </List>
    );
    return details;
  }

  return (
    <div>
      <Message color='red' style={hideDiv()}>
        Error: {props.errorMessage}
      </Message>

      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={5}>
            <Segment>
              <h3 className="header">
                {props.profile.firstName} {props.profile.lastName}
                <br />
                <small>@{props.profile.username}</small>
              </h3>
              <UserImage profile={props.profile} size='150px' />
              {props.profile.desc}
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
            <ActivityFeed
              feed={props.feed} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Profile;
