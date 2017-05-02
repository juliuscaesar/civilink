import React from 'react';
import { Card, Icon, Image, Label } from 'semantic-ui-react'

/**
* Component for the Issue tag
*/
class CauseTag extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      education: {"color": "teal", "icon": "student"},
      environment: {"color": "green", "icon": "tree"},
      lgbt: {"color": "purple", "icon": "lesbian"},
      housing: {"color": "brown", "icon": "home"}
    };

    this.getIcon = this.getIcon.bind(this);
  }

  /**
  * Gets the Icon associated with the given cause
  */
  getIcon() {
    switch (this.props.cause) {
      case "Education":
        return this.state.education.icon;
        break;
      case "Environment":
        return this.state.environment.icon;
        break;
      case "LGBT Rights":
        return this.state.lgbt.icon;
        break;
      case "Housing & Homelessness":
        return this.state.housing.icon;
        break;
    }
  }

  /**
  * Gets the color associated with the given cause
  */
  getColor() {
    switch (this.props.cause) {
      case "Education":
        return this.state.education.color;
        break;
      case "Environment":
        return this.state.environment.color;
        break;
      case "LGBT Rights":
        return this.state.lgbt.color;
        break;
      case "Housing & Homelessness":
        return this.state.housing.color;
        break;
    }
  }

  render() {
    return (
      <Label
        as='a'
        content={this.props.cause}
        icon={this.getIcon()}
        color={this.getColor()}
        size='large'
      />
    );
  }
}

export default CauseTag;
