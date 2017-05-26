import React from 'react';
import Activity from './Activity';
import { Segment, Feed, Message } from 'semantic-ui-react'

const Dashboard = (props) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"}  or {}
  */
  const hideDiv = () => {
    if (props.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
  * Builds the activity feed
  */
  const buildActivityFeed = props.feed.map((activity) =>
    <Activity activity={activity} />);

  return (
    <div>
      <Message color='red' style={hideDiv()}>
        Error: { props.errorMessage }
      </Message>
      <h3 className="header">Activity Feed</h3>
      <hr>
      </hr>
      <Segment>
        <Feed>
          { buildActivityFeed }
        </Feed>
      </Segment>
    </div>
  );
}

export default Dashboard;
