import React from 'react';
import { Label } from 'semantic-ui-react'

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
      housing: {"color": "brown", "icon": "home"},
      justice: {"color": "violet", "icon": "law"},
      health: {"color": "red", "icon": "treatment"},
      economy: {"color": "olive", "icon": "money"},
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
      case "Environment":
        return this.state.environment.icon;
      case "LGBT Rights":
        return this.state.lgbt.icon;
      case "Housing & Homelessness":
        return this.state.housing.icon;
      case "Justice & Equality":
        return this.state.justice.icon;
      case "Public Health":
        return this.state.health.icon;
      case "Economy & Jobs":
        return this.state.economy.icon;
      default:
        return "";
    }
  }

  /**
  * Gets the color associated with the given cause
  */
  getColor() {
    switch (this.props.cause) {
      case "Education":
        return this.state.education.color;
      case "Environment":
        return this.state.environment.color;
      case "LGBT Rights":
        return this.state.lgbt.color;
      case "Housing & Homelessness":
        return this.state.housing.color;
      case "Justice & Equality":
        return this.state.justice.color;
      case "Public Health":
        return this.state.health.color;
      case "Economy & Jobs":
        return this.state.economy.color;
      default:
        return "";
    }
  }

  render() {
    return (
      <Label
        as='a'
        content={this.props.cause}
        icon={this.getIcon()}
        color={this.getColor()}
        size={this.props.size}
      />
    );
  }
}

export default CauseTag;
