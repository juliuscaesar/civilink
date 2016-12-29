import React from 'react';
import Navbar from './navbar';
import request from 'superagent';
import Sidebar from './sidebar';

/**
 * Component for the navbar.
 */
class Community extends React.Component {
    constructor(props) {
        super(props);

        /**
         * Fields in this form are kept as state and initialized as empty
         */
        this.state = {errorMessage: '', displayError: false, community: [], members: [], projects: []};

        //region bind all methods to this
        this.requestInfo = this.requestInfo.bind(this);
        this.parseInfoResponse = this.parseInfoResponse.bind(this);
        this.hideDiv = this.hideDiv.bind(this);
        this.joinButton = this.joinButton.bind(this);
        this.getUserImage = this.getUserImage.bind(this);
        this.displayMembers = this.displayMembers.bind(this);
        this.displayProjects = this.displayProjects.bind(this);
        this.displayActivity = this.displayActivity.bind(this);


        // update page
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
     * Send the request to get the games
     */
    requestInfo() {
        request.get('/api/community/' + this.props.params.id)
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
                this.setState({community: response.body.community, members: response.body.members,
                    projects: response.body.projects});
                break;
            case 203:
                this.setState({
                    errorMessage: "Could not get community data", displayError: true
                });
                break;
            default:
                this.setState({
                    errorMessage: "Could not get community data", displayError: true
                });
        }
    }

    joinButton() {
        return "button wait for logged in user";
    }

    getUserImage(user) {
        if (user.avatar) {
            return <img src="images/uploads/{user.avatar}" className="img-circle" width="50px" height="50px"></img>;
        }
        else {
            return <img src="../user.png" className="img-circle" width="50px" height="50px"></img>;
        }
    }

    displayMembers() {
        if (this.state.members.length == 0) {
            return "No one has joined this community yet";
        }
        else {
            var memberList = [];
            var profileUrl = '';



            for (var i = 0; i < this.state.members.length; i++) {
                profileUrl = "/profile/" + this.state.members[i].user.username;
                memberList.push(
                    <div className="col-xs-3 col-sm-4">
                        <center>
                            {this.getUserImage(this.state.members[i].user)}
                            <br></br>
                            <a href={profileUrl}>{this.state.members[i].user.firstName}</a>
                        </center>
                    </div>
                )
            }

            return <div className="row">{memberList}</div>;
        }
    }

    displayProjects() {
      var rows = [];
      var projectUrl = '';

      for (var i = 0; i < this.state.projects.length; i++) {
      projectUrl = "/project/" + this.state.projects[i]._id;
       rows.push(
           <div>
               <a href={projectUrl}>{this.state.projects[i].title}</a>
               <br></br>
               <p>{this.state.projects[i].desc}</p>
           </div>
       )
      }

      return rows;
    }

    displayActivity() {
        return "Nothing yet";
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
                         <div className="alert alert-danger" style={this.hideDiv()}>{"Error! " + this.state.errorMessage}</div>
                         <div className="content-box">
                           <p className="headertext">{this.state.community.name}</p>
                           <hr/>
                           { this.state.data }
                           { this.joinButton() }
                         </div>
                         <div className="content-box">
                           <p className="headertext2">Members<small> ({this.state.members.length})</small></p>
                           <hr/>
                           { this.displayMembers() }
                         </div>
                       </div>
                       <div className="col-sm-8 col-md-8">
                         <div className="content-box">
                           <p className="headertext2">Projects <small>(<a href="">create new</a>)</small></p>
                           <hr/>
                           { this.displayProjects() }
                         </div>

                         <div className="content-box">
                           <p className="headertext2">Activity Feed</p>
                           <hr/>
                           { this.displayActivity() }
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

export default Community;