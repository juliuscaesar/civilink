import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

/**
* Component for the Community Card on dashboard.
*/
class CommunityCard extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {};

    this.makeUrl = this.makeUrl.bind(this);
  }

  /**
  * Creates the url for the community
  */
  makeUrl() {
    return "/" + this.props.community.url;
  }

  render() {
    return (
      <Card>
        <Image src="http://4vector.com/i/free-vector-city-skyline_100975_city_skyline.png" />
        <Card.Content>
          <Card.Header>
            <a href={this.makeUrl()}>
              {this.props.community.name}
            </a>
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {this.props.community.desc}
            </span>
          </Card.Meta>
          <Card.Description>

          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    );
  }
}

export default CommunityCard;
