import React from 'react';
import Navbar from './navbar';
import request from 'superagent';
import Sidebar from './sidebar';

/**
 * Component for the navbar.
 */
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        /**
         * Fields in this form are kept as state and initialized as empty
         */
        this.state = {feed: [], errorMessage: ''};

        //region bind all methods to this
        this.requestInfo = this.requestInfo.bind(this);
        this.parseInfoResponse = this.parseInfoResponse.bind(this);
        this.getUserImage = this.getUserImage.bind(this);

        // update page
        this.requestInfo();
    }


    /**
     * Send the request to get the games
     */
    requestInfo() {
        request.get('/api/dashboard')
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
                this.setState({feed: response.body.feed.reverse()});
                break;
            case 203:
                this.setState({errorMessage: "Could not get activity feed"});
                break;
            default:
                this.setState({errorMessage: "Could not get activity feed"});
        }
    }

    getUserImage(user) {
        if (user.avatar) {
            return <img src="images/uploads/{user.avatar}" className="img-circle" width="50px" height="50px"></img>;
        }
        else {
            return <img src="./user.png" className="img-circle" width="50px" height="50px"></img>;
        }
    }

    buildBody() {
      var rows = [];

      for (var i = 0; i < this.state.feed.length; i++) {
        // create the url to be used for a user's profile
        var url = "/profile/" + this.state.feed[i].user.username;

        //if this activity is regarding a community
        if (this.state.feed[i].desttype == 'Communities') {
            // create the url for the community
            var commUrl = "/community/" + this.state.feed[i].community._id;

            // add a horizontal line
          rows.push(<hr></hr>)

          // the row for this activity: user image in left column and activity in the right
          rows.push(
            <div className="row">
              <div className="col-xs-2 col-sm-1">
                  {this.getUserImage(this.state.feed[i].user)}
              </div>
              <div className="col-xs-10 col-sm-11">
                <p>
                  <a href={url}>{this.state.feed[i].user.firstName + " " + this.state.feed[i].user.lastName}</a> 
                    {" " + this.state.feed[i].details + " the community:"} <a href={commUrl}>{this.state.feed[i].community.name}</a>
                </p>
              </div>
            </div>)

        // if this activity is regarding a project
        // note: projects used to be called ideas so including both just in case
        } else if (this.state.feed[i].desttype == 'Ideas' || this.state.feed[i].desttype == 'Projects') {
            // create the url for the community
            var projectUrl = "/idea/" + this.state.feed[i].idea._id;

            // horizontal break
          rows.push(<hr></hr>)
          rows.push(
            <div className="row">
              <div className="col-xs-2 col-sm-1">
                {this.getUserImage(this.state.feed[i].user)}
              </div>
              <div className="col-xs-10 col-sm-11">
                <p>
                  <a href={url}>{this.state.feed[i].user.firstName + " " + this.state.feed[i].user.lastName}</a> 
                    {" " + this.state.feed[i].details + " the project:"} <a href={projectUrl}>{this.state.feed[i].idea.title}</a>
                </p>
              </div>
            </div>)
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
                           <div className="content-box">
                               <p className="headertext">Activity Feed</p>
                               { this.errorMessage }
                               { this.buildBody() }
                          </div>
                      </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default Dashboard;