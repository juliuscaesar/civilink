import React from 'react';
import Auth from './Auth';
import ProjectCard from './ProjectCard';
import { Card, Image, Message, Button, Modal, Menu } from 'semantic-ui-react'
import CreateProjectForm from './CreateProjectForm';

const Community = ({errorMessage, displayError, community, members, projects, organizations}) => {
  //state = { activeItem: 'projects' };

  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be hidden or {} otherwise
  */
  const hideDiv = () => {
    if (displayError) {
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
  * Displays the header for the community
  */
  const communityInfo = () => {
    return <h2 className="header">{community.name}</h2>
  }

  /*
  * Placeholder for image
  */
  const getImageUrl = () => {
    return "http://4vector.com/i/free-vector-city-skyline_100975_city_skyline.png";
  }

  /**
  * Build the list of projects
  */
  const buildProjectList = () => {
    var rows = [];

    for (var i = 0; i < projects.length; i++) {
      rows.push(
        <ProjectCard
          project={projects[i]}
          />
      );
    }

    if (projects.length === 0 ) {
      return <b>There are currently no projects in this community</b>
    }

    return rows;
  }

  //const handleItemClick = (e, { name }) => setState({ activeItem: name })

  //const { activeItem } = state;

  return (
    <div>
      <Message color='red' style={hideDiv()}>
        Error: { errorMessage }
      </Message>
      <Card fluid>
        <Image src={getImageUrl()}/>
        <Card.Content>
          <Card.Header>
            {communityInfo()}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Modal
            floated='right'
            size='tiny'
            trigger={<Button color='blue' size='tiny' style={hideButton()}>Create a project</Button>}>
            <div className="header">Create Project</div>
            <div className="content">
              <CreateProjectForm community={community._id}/>
            </div>
          </Modal>
        </Card.Content>
      </Card>

      <Menu pointing secondary>
        <Menu.Item name='projects' active={true} />
        <Menu.Item name='organizations' active={false} />
        <Menu.Item name='activity' active={false} />
      </Menu>

      <Card.Group itemsPerRow={2} stackable>
        { buildProjectList() }
      </Card.Group>
    </div>
  );
}

export default Community;
