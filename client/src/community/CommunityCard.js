import React from 'react';

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
      <div className="card">
        <div className="card-block">
          <a href={this.makeUrl()}>
            <h3 className="card-title">{this.props.community.name}</h3>
          </a>
          <p className="card-text">Some quick example text to build on the card
          title and make up the bulk of the cards content.</p>
        </div>
      </div>
    );
  }
}

export default CommunityCard;
