import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import CauseTag from '../community/CauseTag';
import UserTag from '../profile/UserTag';
import Task from '../task/Task';
import Sidebar from '../general/Sidebar';
import Auth from '../modules/Auth';
import CreateTaskForm from '../task/CreateTaskForm';
import {
  Grid,
  Card,
  Icon,
  Image,
  Message,
  Modal,
  Label,
  List,
  Button
} from 'semantic-ui-react'

/**
* Component for Projects.
*/
class Project extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      project: [],
      tasks: [],
      community: [],
      organizer: [],
      causes: []
    };

    //region bind all methods to this
    this.requestInfo = this.requestInfo.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.hideDiv = this.hideDiv.bind(this);
    this.hideButton = this.hideButton.bind(this);
    this.getProjectDetails = this.getProjectDetails.bind(this);
    this.displayCauses = this.displayCauses.bind(this);
    this.buildTaskList = this.buildTaskList.bind(this);

    // update page
    this.requestInfo();
  }

  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be hidden or {}
  */
  hideDiv() {
    if (this.state.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
  * Returns the style attribute for the create project button
  * @returns {*} {display: "none"} if the button should be hidden or {} otherwise
  */
  hideButton() {
    if (Auth.isUserAuthenticated()) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
  * Send the request to get the games
  */
  requestInfo() {
    request.get('/api/project/' + this.props.params.id)
    .send()
    .end(this.parseInfoResponse);
  }

  /**
  * Parse the response to the get games request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch (response.status) {
      case 200:
        this.setState({
          project: response.body.project,
          tasks: response.body.tasks,
          community: response.body.project.community,
          organizer: response.body.project.user,
          causes: response.body.project.causes
        });
        break;
      case 404:
        window.location = '/';
        break;
      default:
        this.setState({
          errorMessage: response.body.errorMessage,
          displayError: true
        });
    }
  }

  /*
  * Makes a url for the community of this project
  */
  getCommunityUrl() {
    return "/" + this.state.community.url;
  }

  /*
  * Placeholder for image
  */
  getImageUrl() {
    return "http://4vector.com/i/free-vector-city-skyline_100975_city_skyline.png";
  }

  /*
  * Display the causes of this project
  */
  displayCauses() {
    var rows = [];
    for (var i = 0; i < this.state.causes.length; i++) {
      rows.push(<CauseTag cause={this.state.causes[i]} size='mini'/>);
    }
    return rows;
  }

  /*
  * Display the tag for the organizer of this project
  */
  getProjectDetails() {
    const details = [];
    const organizerFullName = this.state.organizer.firstName + " " + this.state.organizer.lastName;
    const organizerUrl = "/user/" + this.state.organizer.username;
    const communityUrl = "/" + this.state.community.url;

    details.push(
      <List>
        <List.Item>
          <List.Icon name='user' />
          <List.Content>
            Organized by <a href={organizerUrl}>{organizerFullName}</a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='marker' />
          <List.Content>
            <a href={communityUrl}>{this.state.community.name}</a>
          </List.Content>
        </List.Item>
      </List>
    );
    return details;
  }

  /**
  * Build the list of tasks
  */
  buildTaskList() {
    var rows = [];

    for (var i = 0; i < this.state.tasks.length; i++) {
      rows.push(<Task task={this.state.tasks[i]}/>);
    }

    if (this.state.tasks.length === 0) {
      return <h4>There are currently no tasks for this project.</h4>
    }

    return rows;
  }

  // Render the static content
  render() {
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
                <Message color='red' style={this.hideDiv()}>
                  Error: {this.state.errorMessage}
                </Message>

                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      <h2 className="header">{this.state.project.title}</h2>
                    </Card.Header>
                    <Card.Description>
                      {this.getProjectDetails()}
                      <hr />
                      <p>
                        {this.state.project.desc}
                      </p>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Label.Group>
                      {this.displayCauses()}
                    </Label.Group>
                  </Card.Content>
                </Card>

                <h3 className="header">Tasks</h3>
                <hr />
                <Card.Group>
                  {this.buildTaskList()}
                </Card.Group>

                <Modal
                  floated='right'
                  size='small'
                  trigger={<Button color='blue' style={this.hideButton()}>Add a task</Button>}>
                  <div className="header">Create Task</div>
                  <div className="content">
                    <CreateTaskForm
                      projectId={this.state.project._id}
                      projectUrl={this.state.project.url}/>
                  </div>
                </Modal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Project;
