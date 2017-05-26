import React from 'react';
import CommunityCard from './CommunityCard';
import { Card, Message } from 'semantic-ui-react'

const CommunityDashboard = (props) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} or {}
  */
  const hideDiv = () => {
    if (props.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
  * Build the list of communities
  */
  const buildCommunityList = () => {
    var rows = [];

    for (var i = 0; i < props.communities.length; i++) {
      rows.push(
        <CommunityCard
          community={props.communities[i]}
          />
      );
    }
    return rows;
  }

  return (
    <div>
      <h3>My Communities</h3>
      <hr />
      <Message color='red' style={hideDiv()}>
        Error: { props.errorMessage }
      </Message>
      <Card.Group itemsPerRow={2} stackable>
        { buildCommunityList() }
      </Card.Group>

    </div>
  );
}

export default CommunityDashboard;
