import React from 'react';
import { Card } from 'semantic-ui-react'

/**
* Component for Tasks
*/
class Task extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      tasks: [],
      errorMessage: '',
      displayError: false
    };
  }

  // Render the static content
  render(){
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
              {this.props.task.title}
          </Card.Header>
          <Card.Meta>
            <span className='date'>

            </span>
          </Card.Meta>
          <Card.Description>
            {this.props.task.desc}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Task;
