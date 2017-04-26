import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';

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
      organizer: []
    };

      //region bind all methods to this
      this.requestInfo = this.requestInfo.bind(this);
      this.parseInfoResponse = this.parseInfoResponse.bind(this);
      this.hideDiv = this.hideDiv.bind(this);
      this.getCommunityUrl = this.getCommunityUrl.bind(this);
      this.getProfileUrl = this.getProfileUrl.bind(this);
      this.buildTasks = this.buildTasks.bind(this);


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
            organizer: response.body.project.user
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
        return "/community/" + this.state.community._id;
      }

      /*
      * Makes a url for the profile of this project organizer
      */
      getProfileUrl() {
        return "/profile/" + this.state.organizer.username;
      }

      /*
      * Builds the tasks for this project
      * NOTE: buttons dont work right now
      */
      buildTasks() {
        var rows = [];

        for (var i = 0; i < this.state.tasks.length; i++) {
          rows.push(
            <div>
              <hr>
              </hr>
              <div className="row">
                <div className="col-xs-8 col-sm-9">
                  <h4>
                    {this.state.tasks[i].title}
                  </h4>
                </div>
                <div className="col-xs-4 col-sm-3">
                  <a href="" className="btn btn-success">
                    Assign me
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <p>
                    {this.state.tasks[i].desc}
                  </p>
                  <p>
                    Users assigned: {this.state.tasks[i].assigned.length}/
                    {this.state.tasks[i].needed}
                    · Points offered: {this.state.tasks[i].points}
                  </p>
                </div>
              </div>
            </div>
          )
        }

        return rows;
      }

      // Render the static content
      render(){
        return (
          <div>
            <Navbar/>
            <div className="container-body">
              <div className="row">
                <div className="col-sm-2 hidden-xs">
                  <Sidebar/>
                </div>
                <div className="col-sm-10">
                  <div className="row">
                    <div className="col-sm-4 col-md-4">

                      <div className="content-box">
                        <p className="headertext">Progress</p>
                        <hr>
                        </hr>
                      </div>
                    </div>

                    <div className="col-sm-8 col-md-8">
                      <div className="content-box">
                        <p className="headertext">
                          {this.state.project.title}
                        </p>
                        <hr>
                        </hr>
                        <p>
                          {this.state.project.desc}
                        </p>
                        <p>
                          Organizer: <a href={this.getProfileUrl()}>
                          {this.state.organizer.firstName}
                          {this.state.organizer.lastName}
                        </a>
                      </p>
                    </div>


                    <div className="content-box">
                      <p className="headertext">Tasks</p>
                      { this.buildTasks() }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Project;
