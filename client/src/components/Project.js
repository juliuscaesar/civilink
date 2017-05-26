import React from 'react';
import CauseTag from './CauseTag';
import Task from './Task';
import Auth from './Auth';
import CreateTaskForm from './CreateTaskForm';
import {
  Card,
  Message,
  Modal,
  Label,
  List,
  Button
} from 'semantic-ui-react'

const Project = (props) => {
  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be hidden or {}
  */
  const hideDiv = () => {
    if (props.displayError) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /**
  * Returns the style attribute for the create project button
  * @returns {*} {display: "none"} if the button should be hidden or {} otherwise
  */
  const hideButton = () => {
    if (Auth.isUserAuthenticated()) {
      return {};
    } else {
      return {display: "none"};
    }
  }

  /*
  * Display the causes of this project
  */
  const displayCauses = props.causes.map((cause) => <CauseTag key={cause.toString()} cause={cause} size='mini'/>);

  /*
  * Display the organizer and community of this project
  */
  const getProjectDetails = () => {
    const details = [];
    const organizerFullName = props.organizer.firstName + " " + props.organizer.lastName;
    const organizerUrl = "/user/" + props.organizer.username;
    const communityUrl = "/" + props.community.url;

    details.push(
      <List key="1">
        <List.Item>
          <List.Icon name='user' />
          <List.Content>
            Organized by <a href={organizerUrl}>{organizerFullName}</a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='marker' />
          <List.Content>
            <a href={communityUrl}>{props.community.name}</a>
          </List.Content>
        </List.Item>
      </List>
    );
    return details;
  }

  /**
  * Build the list of tasks
  */
  const buildTaskList = props.tasks.map((task) => <Task key={task._id} task={task}/>);


  return (
    <div>
      <Message color='red' style={hideDiv()}>
        Error: {props.errorMessage}
      </Message>

      <Card fluid>
        <Card.Content>
          <Card.Header>
            <h2 className="header">{props.project.title}</h2>
          </Card.Header>
          <Card.Description>
            {getProjectDetails()}
            <hr />
            <p>
              {props.project.desc}
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Label.Group>
            { displayCauses }
          </Label.Group>
          <Modal
            floated='right'
            trigger={<Button
                      color='blue'
                      floated='right'
                      size='tiny'
                      style={hideButton()}>
                        Add a task
                      </Button>}>
            <div className="header">Create Task</div>
            <div className="content">
              <CreateTaskForm
                projectId={props.project._id}
                projectUrl={props.project.url}/>
            </div>
          </Modal>
        </Card.Content>
      </Card>

      <h3 className="header">Tasks</h3>
      <hr />
      <Card.Group>
        { buildTaskList }
      </Card.Group>
    </div>
  );
}

export default Project;
