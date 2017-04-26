import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';
import Auth from '../modules/Auth';

/**
 * Component for the Dashboard.
 */
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Fields in this form are kept as state and initialized as empty
     */
    this.state = {
      feed: [],
      user: [],
      projects: [],
      errorMessage: '',
      displayError: false
    };

    //region bind all methods to this
    this.requestInfo = this.requestInfo.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.parseInfoResponse = this.parseInfoResponse.bind(this);
    this.parseProjectResponse = this.parseProjectResponse.bind(this);
    this.getUserImage = this.getUserImage.bind(this);
    this.loggedInAs = this.loggedInAs.bind(this);

    // update page
    this.requestInfo();
    this.getProjects();
  }

  /*
    * Created this when testing user authentication and didnt get rid of it.
    * We dont have to keep it
    * Note: because of how we receive the data React is focing us to loop
    * through but there will only ever be 1 result
    */
  loggedInAs() {
    var profileUrl;
    for (var i = 0; i < this.state.user.length; i++) {
      profileUrl = "/profile/" + this.state.user[i].username;
      return <p>
        You are logged in as:
        <a href={profileUrl}>
          {this.state.user[i].firstName}
          {this.state.user[i].lastName}
        </a>
      </p>;
    }
  }

  /**
  * Send the request to get the dashboard activity feed
  */
  requestInfo() {
    request
      .get('/api/dashboard/feed')
      .set('token', Auth.getToken())
      .send().end(this.parseInfoResponse);
  }

  /**
  * Send the request to get the dashboard project suggestions
  */
  getProjects() {
    request
      .get('/api/dashboard/projects')
      .set('token', Auth.getToken())
      .send().end(this.parseProjectResponse);
  }

  /**
  * Parse the response to the get dashboard feed request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseInfoResponse(error, response) {
    switch (response.status) {
      case 200:
        this.setState({
          feed: response.body.feed.reverse(),
          user: response.body.user});
        break;
      case 203:
        this.setState({
          errorMessage: "Could not get activity feed",
          displayError: true});
        break;
      default:
        this.setState({
          errorMessage: "Could not get activity feed",
          displayError: true});
    }
  }

  /**
    * Parse the response to the get dashboard feed request
    * @param error any error that occurred when submitting the request
    * @param response the response returned from the server
    */
  parseProjectResponse(error, response) {
    switch (response.status) {
      case 200:
        this.setState({projects: response.body.projects});
        break;
      case 203:
        this.setState({
          errorMessage: "Could not get projects",
          displayError: true});
        break;
      default:
        this.setState({
          errorMessage: "Could not get projects",
          displayError: true});
    }
  }

  /*
        * Takes in a User object as input and returns the user's image
        */
  getUserImage(user) {
    if (user.avatar) {
      return <img src="images/uploads/{user.avatar}"
        className="img-circle" role="presentation"
        width="50px" height="50px"></img>;
    } else {
      return <img src="./user.png" className="img-circle"
        width="50px" height="50px" role="presentation"></img>;
    }
  }

  includeProjects() {
    var rows = [];

    for (var i = 0; i < this.state.projects.length; i++) {
      var url = "/project/" + this.state.projects[i]._id;
      rows.push(
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="content-box">
              <h4>
                <a href={url}>
                  {this.state.projects[i].title}
                </a>
              </h4>
              <hr></hr>
              <p>
                {this.state.projects[i].desc}
              </p>
              <hr></hr>
              <p>
                <small>
                  Community:
                  <a href="">
                    {this.state.projects[i].community.name}
                  </a>
                  <br></br>
                  Organizer:
                  <a href="">
                    {this.state.projects[i].user.firstName}
                    {this.state.projects[i].user.lastName}
                  </a>
                </small>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return rows;
  }

  /*
    * Builds the acitivy feed
    */
  buildBody() {
    var rows = [];

    for (var i = 0; i < this.state.feed.length; i++) {
      // create the url to be used for a user's profile
      var url = "/profile/" + this.state.feed[i].user.username;

      //if this activity is regarding a community
      if (this.state.feed[i].desttype === 'Communities') {
        // create the url for the community
        var commUrl = "/community/" + this.state.feed[i].community._id;

        // add a horizontal line
        rows.push(
          <hr></hr>
        )

        // the row for this activity:
        // user image in left column and activity in the right
        rows.push(
          <div className="row">
            <div className="col-xs-2 col-sm-1">
              {this.getUserImage(this.state.feed[i].user)}
            </div>
            <div className="col-xs-10 col-sm-11">
              <p>
                <a href={url}>
                  {this.state.feed[i].user.firstName + " "
                    + this.state.feed[i].user.lastName}
                </a>
                {" " + this.state.feed[i].details + " the community:"}
                <a href={commUrl}>{this.state.feed[i].community.name}</a>
              </p>
            </div>
          </div>
        )

        // if this activity is regarding a project
        // note: projects used to be called ideas
        // so including both just in case
      } else if (this.state.feed[i].desttype === 'Ideas' ||
          this.state.feed[i].desttype === 'Projects') {
        // create the url for the project
        var projectUrl = "/project/" + this.state.feed[i].idea._id;

        // horizontal break
        rows.push(
          <hr></hr>
        )
        rows.push(
          <div className="row">
            <div className="col-xs-2 col-sm-1">
              {this.getUserImage(this.state.feed[i].user)}
            </div>
            <div className="col-xs-10 col-sm-11">
              <p>
                <a href={url}>
                  {this.state.feed[i].user.firstName + " "
                    + this.state.feed[i].user.lastName}
                </a>
                {" " + this.state.feed[i].details + " the project:"}
                <a href={projectUrl}>{this.state.feed[i].project.title}</a>
              </p>
            </div>
          </div>
        )
        // if this activity is regarding tasks
      } else if (this.state.feed[i].desttype === 'Tasks') {
        // create the url for the task
        //var taskProject = "/project/" + this.state.feed[i].task._id;

        // horizontal break
        rows.push(
          <hr></hr>
        )
        rows.push(
          <div className="row">
            <div className="col-xs-2 col-sm-1">
              {this.getUserImage(this.state.feed[i].user)}
            </div>
            <div className="col-xs-10 col-sm-11">
              <p>
                <a href={url}>
                  {this.state.feed[i].user.firstName + " "
                    + this.state.feed[i].user.lastName}
                </a>
                {" " + this.state.feed[i].details + " the task:"}
                {this.state.feed[i].task.title}
              </p>
            </div>
          </div>
        )
      }

    }

    return rows;
  }

  // Render the static content
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container-body">
          <div className="row">
            <div className="col-sm-2 hidden-xs">
              <Sidebar/>
            </div>
            <div className="col-sm-10">
              {this.loggedInAs()}
              <div className="content-box">
                <p className="headertext">
                  Filter settings here
                </p>
              </div>

              {this.includeProjects()}

              <div className="content-box">
                <p className="headertext">
                  Activity Feed
                </p>
                {this.errorMessage}
                {this.buildBody()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
