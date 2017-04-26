import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';

/**
* Component for a Profile.
*/
class Profile extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      profile: [],
      following: [],
      followers: [],
      communities: [],
      feed: []
    };

      //region bind all methods to this
      this.requestInfo = this.requestInfo.bind(this);
      this.parseInfoResponse = this.parseInfoResponse.bind(this);
      this.hideDiv = this.hideDiv.bind(this);
      this.getUserImage = this.getUserImage.bind(this);
      this.communityList = this.communityList.bind(this);
      this.buildBody = this.buildBody.bind(this);


      // update page
      this.requestInfo();
    }

    /**
    * Returns the style attribute for the error div
    * @returns {*} {display: "none"} if the error should be
    * hidden or {} otherwise
    */
    hideDiv() {
      if (this.state.displayError) {
        return {};
      } else {
        return {display: "none"};
      }
    }
    /**
    * Send the request to get the profile information
    */
    requestInfo() {
      request.get('/api/profile/' + this.props.params.id)
      .send()
      .end(this.parseInfoResponse);
    }

    /**
    * Parse the response to the get profile request
    * @param error any error that occurred when submitting the request
    * @param response the response returned from the server
    */
    parseInfoResponse(error, response) {
      switch(response.status) {
        case 200:
        this.setState({
          profile: response.body.profile,
          following: response.body.following,
          communities: response.body.communities,
          feed: response.body.activity
        });
          break;
        case 203:
          this.setState({
            errorMessage: "Could not get profile data",
            displayError: true
          });
          break;
        default:
          this.setState({
            errorMessage: "Could not get profile data",
            displayError: true
          });
        }
      }

      /*
      * Returns the user image
      */
      getUserImage(size) {
        if (this.state.profile.avatar) {
          return <img
            src="images/uploads/{this.state.profile.avatar}"
            className="img-circle"
            role="presentation"
            width="150px"
            height="150px">
          </img>;
        }
        else {
          return <img
            src="../user.png"
            className="img-circle"
            width={size}
            height={size}
            role="presentation">
          </img>;
        }
      }

      /*
      * Returns the community list
      */
      communityList() {
        var rows = [];
        var url = '';

        for (var i = 0; i < this.state.communities.length; i++) {
          url = "/community/" + this.state.communities[i].community._id;
          rows.push(
            <a href={url}>
              {this.state.communities[i].community.name}
            </a>
          )
        }

        return rows;
      }

      /*
      * Builds the activity feed for this user
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
              <hr>
              </hr>
            )

            // the row for this activity: user image in left column and activity
            //  in the right
            rows.push(
              <div className="row">
                <div className="col-xs-3 col-sm-2">
                  {this.getUserImage("64px")}
                </div>
                <div className="col-xs-9 col-sm-10">
                  <p>
                    <a href={url}>
                      {this.state.feed[i].user.firstName + " " +
                        this.state.feed[i].user.lastName}
                    </a>
                    {" " + this.state.feed[i].details + " the community:"}
                    <a href={commUrl}>{this.state.feed[i].community.name}</a>
                </p>
              </div>
            </div>
          )

          // if this activity is regarding a project
          // note: projects used to be called ideas so including both just in case
        } else if (this.state.feed[i].desttype === 'Ideas' ||
        this.state.feed[i].desttype === 'Projects') {
          // create the url for the project
          var projectUrl = "/project/" + this.state.feed[i].idea._id;

          // horizontal break
          rows.push(
            <hr>
            </hr>
          )
          rows.push(
            <div className="row">
              <div className="col-xs-3 col-sm-2">
                {this.getUserImage("64px")}
              </div>
              <div className="col-xs-9 col-sm-10">
                <p>
                  <a href={url}>
                    {this.state.feed[i].user.firstName + " " +
                      this.state.feed[i].user.lastName}
                  </a>
                  {" " + this.state.feed[i].details + " the project:"}
                  <a href={projectUrl}>{this.state.feed[i].project.title}</a>
              </p>
            </div>
          </div>
        )
      }
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
                    <div className="headertext">
                      {this.state.profile.firstName}
                      {this.state.profile.lastName}
                      <small>   @{this.state.profile.username}</small>
                    </div>
                    <hr/>
                    <center>
                      {this.getUserImage("150px")}
                      <br/>
                      <br/>
                      {this.state.profile.bio}
                      <p> follow button </p>
                      <hr>
                      </hr>
                      <p>
                        social media stuff
                      </p>
                    </center>
                    <p className="small">
                      {this.state.profile.city}, {this.state.profile.state}
                      <br>
                      </br>
                      {this.state.profile.occ} at {this.state.profile.occplace}
                    </p>
                    <hr>
                    </hr>
                    <div className="row">
                      <div className="col-xs-4">
                        <center>
                          <h4 className="text-primary">
                            {this.state.profile.points}
                          </h4>
                          <small>points</small>
                        </center>
                      </div>
                      <div className="col-xs-4">
                        <center>
                          <h4 className="text-primary">
                            {this.state.followers.length}
                          </h4>
                          <small>followers</small>
                        </center>
                      </div>
                      <div className="col-xs-4">
                        <center>
                          <h4 className="text-primary">
                            {this.state.following.length}
                          </h4>
                          <small>following</small>
                        </center>
                      </div>
                    </div>
                  </div>

                  <div className="content-box">
                    <p className="headertext2">
                      Communities
                      <small>({this.state.communities.length})</small>
                  </p>
                  <hr>
                  </hr>
                  { this.communityList() }
                </div>
              </div>

              <div className="col-sm-8 col-md-8">
                <div className="content-box">
                  <p className="headertext2">
                    Activity Feed
                  </p>
                  {this.buildBody()}
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

export default Profile;
