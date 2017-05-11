import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';
import Auth from '../modules/Auth';
import ProjectCard from '../project/ProjectCard';
import { browserHistory } from 'react-router';
import { Grid, Segment, Card, Image, Message, Statistic, Label, Button, Modal } from 'semantic-ui-react'
import CauseTag from './CauseTag';
import CreateProjectForm from '../project/CreateProjectForm';

/**
* Component for the navbar.
*/
class Community extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      community: [],
      members: [],
      projects: [],
      organizations: [],
      createProject: false
    };

    //region bind all methods to this
    this.requestInfo = this.requestInfo.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.hideDiv = this.hideDiv.bind(this);
    this.hideButton = this.hideButton.bind(this);
    this.communityInfo = this.communityInfo.bind(this);
    this.buildProjectList = this.buildProjectList.bind(this);
    this.displayCauses = this.displayCauses.bind(this);
    this.getImageUrl = this.getImageUrl.bind(this);
    this.clickProjectButton = this.clickProjectButton.bind(this);

    // update page by calling the API call
    this.requestInfo();
  }

  /**
  * Returns the style attribute for the error div
  * @returns {*} {display: "none"} if the error should be hidden or {} otherwise
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
  * Send the request to get the community information
  */
  requestInfo() {
    request.get('/api/community/' + this.props.params.id)
    .send()
    .end(this.parseInfoResponse);
  }

  /**
  * Parse the response to the get community request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch(response.status) {
      case 200:
        this.setState({
          community: response.body.community,
          members: response.body.members,
          projects: response.body.projects,
          organizations: response.body.organizations});
          break;
      case 404:
        browserHistory.push('/');
        break;
      case 500:
        this.setState({
          errorMessage: response.body.errorMessage,
          displayError: true
        });
        break;
      default:
        this.setState({
          errorMessage: "Could not get community data",
          displayError: true
        });
      }
    }

    /*
    * Displays the header for the community
    */
    communityInfo() {
      return <h1>{this.state.community.name}</h1>
    }

    /*
    * Placeholder for causes
    */
    displayCauses() {
      const causes = [
        'Education',
        'Environment',
        'LGBT Rights',
        'Housing & Homelessness',
        'Economy & Jobs',
        'Public Health',
        'Justice & Equality'
      ];

      var rows = [];
      for (var i = 0; i < causes.length; i++) {
        rows.push(<CauseTag cause={causes[i]} size='large' />);
      }
      return rows;
    }

    /*
    * Placeholder for image
    */
    getImageUrl() {
      return "http://4vector.com/i/free-vector-city-skyline_100975_city_skyline.png";
    }

    /**
    * Build the list of projects
    */
    buildProjectList() {
      var rows = [];

      for (var i = 0; i < this.state.projects.length; i++) {
        rows.push(
          <ProjectCard
            project={this.state.projects[i]}
            />
        );
      }

      if (this.state.projects.length === 0 ) {
        return <h4>There are currently no projects in this community</h4>
      }

      return rows;
    }

      /**
       * Return the stats to be displayed for this user
       */
  getStats() {
    return [
      { label: "members" , value: this.state.members.length },
      { label: "projects", value: this.state.projects.length },
      { label: "organizations", value: this.state.organizations.length }
      ]
    }

    /**
     * Handle the create project button click
     */
    clickProjectButton(ev) {
      ev.preventDefault();
      this.setState({createProject: true});
    }

    // Render the static content
    render(){
      return (
        <div>
          <Navbar/>
          <div className="container-body">
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Sidebar/>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Message color='red' style={this.hideDiv()}>
                    Error: { this.state.errorMessage }
                  </Message>
                  <Card fluid>
                    <Image src={this.getImageUrl()}/>
                    <Card.Content>
                      <Card.Header>
                        <Grid>
                        <Grid.Row>
                        <Grid.Column width={4}>
                        {this.communityInfo()}
                        </Grid.Column>

                      <Grid.Column width={12}>
                        <Statistic.Group
                          items={this.getStats()}
                          color='blue'
                          size='mini'
                          widths='4'
                        />
                        </Grid.Column>
                        </Grid.Row>
                        </Grid>
                      </Card.Header>
                    </Card.Content>
                  </Card>


                    <Segment>
                      <h2>Filter by cause</h2>
                      <hr />
                      <Label.Group>
                        { this.displayCauses() }
                      </Label.Group>
                    </Segment>
                    <h2>Projects</h2>

                    <hr />
                    <Card.Group itemsPerRow={2}>
                      { this.buildProjectList() }
                    </Card.Group>

                    <Modal
                      size='small'
                      trigger={<Button floated='right' color='blue' style={this.hideButton()}>Create a project</Button>}>
                      <CreateProjectForm
                        community={this.state.community._id}/>
                    </Modal>

                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
    );
  }
}

export default Community;
