import React from 'react';
import Activity from './Activity';
import { Grid, Segment, Feed, Message } from 'semantic-ui-react'

const Dashboard = ({displayError, errorMessage, feed, projects, user}) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"}  or {}
  */
  const hideDiv = () => {
    if (displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
  * Builds the activity feed
  */
  const buildActivityFeed = () => {
    var rows = [];

    for (var i = 0; i < feed.length; i++) {
      rows.push(
        <Activity
          activity={feed[i]}
          />
      );
    }
    return rows;
  }

  return (
    <div>
      <h3 className="header">Activity Feed</h3>
      <hr>
      </hr>
      <Message color='red' style={hideDiv()}>
        Error: { errorMessage }
      </Message>

      <Segment>
        {errorMessage}
        <Feed>
          {buildActivityFeed()}
        </Feed>
      </Segment>
    </div>
  );
}

export default Dashboard;
