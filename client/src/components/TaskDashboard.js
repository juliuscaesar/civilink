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
        <h3 className="header">My Tasks</h3>
        <hr>
        </hr>
        { this.state.errorMessage }
      </div>
    );
  }
}

export default TaskDashboard;
