import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import { Feed, Icon } from 'semantic-ui-react'

/**
* Component to display an individual activity update
*/
class Activity extends React.Component {
  constructor(props) {
    super(props);
  }

  // Render the static content
  render(){
    return (
      <Feed.Event>
      <Feed.Label>
      <img
        src="../user.png"
        className="img-circle"
        width="64px"
        height="64px"
        role="presentation" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{this.props.activity.user.firstName} {this.props.activity.user.lastName}</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
            4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
    );
  }
}

export default Activity;
