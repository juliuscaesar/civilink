import React from 'react';
import Navbar from './Navbar';
//import request from 'superagent';
import Sidebar from './Sidebar';
import { Grid } from 'semantic-ui-react'

/**
* Component for Tasks dashboard.
*/
class TaskDashboard extends React.Component {
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
      <div>
        <Navbar/>
        <div className="ui container container-body">
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Sidebar/>
              </Grid.Column>
              <Grid.Column width={13}>
                <h3 className="header">My Tasks</h3>
                <hr>
                </hr>
                { this.state.errorMessage }

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default TaskDashboard;