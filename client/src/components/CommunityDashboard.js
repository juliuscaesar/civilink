import React from 'react';
import CommunityCard from './CommunityCard';
import { Card, Message } from 'semantic-ui-react'

const CommunityDashboard = ({communities, errorMessage, displayError}) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} or {}
  */
  const hideDiv = () => {
    if (displayError) {
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

    for (var i = 0; i < communities.length; i++) {
      rows.push(
        <CommunityCard
          community={communities[i]}
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
        Error: { errorMessage }
      </Message>
      <Card.Group itemsPerRow={2} stackable>
        { buildCommunityList() }
      </Card.Group>

    </div>
  );
}

export default CommunityDashboard;
