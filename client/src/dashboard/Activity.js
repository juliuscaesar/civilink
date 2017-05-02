import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import UserImage from '../profile/UserImage';
import { Feed, Icon } from 'semantic-ui-react'

/**
* Component to display an individual activity update
*/
class Activity extends React.Component {
  constructor(props) {
    super(props);

    this.buildDescription = this.buildDescription.bind(this);
    this.getUserUrl = this.getUserUrl.bind(this);
  }

 /**
  * Build the description sentence for the activity
  */
  buildDescription() {
    var description = this.props.activity.details;
    if (this.props.activity.desttype === "Communities") {
      description += " the community: ";
    }
    else if (this.props.activity.desttype === "Projects") {
      description += " the project: ";
    }
    else if (this.props.activity.desttype === "Tasks") {
      description += " the task: ";
    }
    else if (this.props.activity.desttype === "Orgs") {
      description += " the organization: ";
    }

    return description;
  }

  /**
   * Build the link for the activity
   */
   displayLink() {
     if (this.props.activity.desttype === "Communities") {
       var url = "/" + this.props.activity.community.url;
       return <a href={url}>
                {this.props.activity.community.name}
              </a>;
     }
     else if (this.props.activity.desttype === "Projects") {
      var url = "/project/"  + this.props.activity.project._id;
       return <a href={url}>{this.props.activity.project.title}</a>;
     }
     else if (this.props.activity.desttype === "Tasks") {
       return this.props.activity.task.title;
     }
     else if (this.props.activity.desttype === "Orgs") {
        var url = "/org/" + this.props.activity.org._id;
       return <a href={url}>{this.props.activity.org.name}</a>;
     }
   }

 /**
  * Return the user's profile link
  */
  getUserUrl() {
    return "/user/" + this.props.activity.user.username;
  }

  // Render the static content
  render(){
    return (
      <Feed.Event>
      <Feed.Label>
        <UserImage
          profile={this.props.activity.user}
          size='40px' />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>
            <a href={this.getUserUrl()}>
              {this.props.activity.user.firstName} {this.props.activity.user.lastName}
            </a>
          </Feed.User> {this.buildDescription()} {this.displayLink()}
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
