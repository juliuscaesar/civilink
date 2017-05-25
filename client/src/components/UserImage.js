import React from 'react';
import { Image } from 'semantic-ui-react'

/*
* Returns the user image
*/
class UserImage extends React.Component {
  constructor(props) {
    super(props);

    this.getImage = this.getImage.bind(this);
  }

  getImage() {
    if (this.props.profile.avatar) {
      return <Image
      src="{images/uploads/{this.props.profile.avatar}"
      centered
      className="img-circle"
      role="presentation"
      width={this.props.size}
      height={this.props.size} />;
    }
    else {
      return <Image
      src="../user.png"
      centered
      className="img-circle"
      width={this.props.size}
      height={this.props.size}
      role="presentation" />;
    }
  }

  render(){
    return (
      <div>
        {this.getImage()}
      </div>
    );
  }
}

export default UserImage;
