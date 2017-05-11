import React from 'react';
import { Card, Label } from 'semantic-ui-react'
import CauseTag from '../community/CauseTag';

/**
* Component for the Community Card on dashboard.
*/
class ProjectCard extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {};

    this.makeUrl = this.makeUrl.bind(this);
    this.displayCauses = this.displayCauses.bind(this);
  }

  /**
  * Creates the url for the project
  */
  makeUrl() {
    return "/project/" + this.props.project._id;
  }

  /*
  * Display the causes of this project
  */
  displayCauses() {
    var rows = [];
    for (var i = 0; i < this.props.project.causes.length; i++) {
      rows.push(<CauseTag cause={this.props.project.causes[i]} size='mini' />);
    }
    return rows;
  }

  render() {
    return (
      <Card color='blue'>
        <Card.Content>
          <Card.Header>
            <a href={this.makeUrl()}>
              {this.props.project.title}
            </a>
          </Card.Header>
          <Card.Meta>
            <span className='date'>

            </span>
          </Card.Meta>
          <Card.Description>
            {this.props.project.desc}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label.Group>
            { this.displayCauses() }
          </Label.Group>
        </Card.Content>
      </Card>
    );
  }
}

export default ProjectCard;
