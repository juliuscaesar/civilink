import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import CauseTag from '../community/CauseTag';
import UserTag from '../profile/UserTag';
import Sidebar from '../general/Sidebar';
import { Grid, Segment, Card, Icon, Image, Message, Statistic, Label } from 'semantic-ui-react'

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
      this.getCommunityUrl = this.getCommunityUrl.bind(this);
      this.getProfileUrl = this.getProfileUrl.bind(this);
      this.getProfileTag = this.getProfileTag.bind(this);
      this.displayCauses = this.displayCauses.bind(this);


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
      switch(response.status) {
        case 200:
          this.setState({
            project: response.body.project,
            tasks: response.body.tasks,
            community: response.body.project.community,
            organizer: response.body.project.user,
            causes: response.body.project.causes
          });
          break;
        case 203:
          this.setState({
            errorMessage: "Could not get project data",
            displayError: true
          });
          break;
        default:
          this.setState({
            errorMessage: "Could not get project data",
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
      * Makes a url for the profile of this project organizer
      */
      getProfileUrl() {
        return "/user/" + this.state.organizer.username;
      }

      /*
      * Display the causes of this project
      */
      displayCauses() {
        var rows = [];
        for (var i = 0; i < this.state.causes.length; i++) {
          rows.push(<CauseTag cause={this.state.causes[i]} size='mini' />);
        }
        return rows;
      }

      /*
      * Display the tag for the organizer of this project
      */
      getProfileTag() {
          return <UserTag profile={this.state.organizer} />;
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
                          <h2>
                            <a href={ this.getCommunityUrl() }>
                              <Icon name='left arrow' />
                              {this.state.community.name}
                            </a>
                          </h2>
                        </Card.Header>
                      </Card.Content>
                    </Card>

                    <Card fluid>
                      <Card.Content>
                        <Card.Header>
                          <h2>{this.state.project.title}</h2>
                        </Card.Header>
                        <Card.Description>
                          <p>
                            <a href={this.getProfileUrl()}>
                              {this.getProfileTag() }
                            </a>
                          </p>
                          <p>
                            {this.state.project.desc}
                          </p>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <Label.Group>
                          { this.displayCauses() }
                        </Label.Group>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </div>
      );
    }
  }

  export default Project;
