import React from 'react';
import { Label } from 'semantic-ui-react'

/**
* Component for the Issue tag
*/
class UserTag extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {};

    this.getImage = this.getImage.bind(this);
  }

  /*
  * Gets the image for this user
  */
  getImage() {
    var image = '';
    if (this.props.profile.avatar) {
      image = "{images/uploads/{this.props.profile.avatar}"
    }
    else {
      image = "../user.png"
    }

    return <img src={image} role="presentation" />
  }

  render() {
    return (
      <Label as='a' image>
        {this.getImage()} {this.props.profile.firstName} {this.props.profile.lastName}
      </Label>
    );
  }
}

export default UserTag;
