import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';
import Sidebar from '../general/Sidebar';

/**
 * Component for Communities dashboard.
 */
class CommunityDashboard extends React.Component {
    constructor(props) {
        super(props);

        /**
        * Fields in this form are kept as state and initialized as empty
        */
        this.state = {communities: [], errorMessage: ''};

        //region bind all methods to this
        this.requestInfo = this.requestInfo.bind(this);
        this.parseInfoResponse = this.parseInfoResponse.bind(this);
        this.buildCommunityList = this.buildCommunityList.bind(this);

        // update the page
        this.requestInfo();
    }

    /**
     * Send the request to get the games
     */
    requestInfo() {
        request.get('/api/community')
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
                this.setState({communities: response.body.communities});
                break;
            case 203:
               this.setState({errorMessage: "Could not get communities"});
               break;
            default:
               this.setState({errorMessage: "Could not get communities"});
        }
    }

    buildCommunityList() {
        var rows = [];

        for (var i = 0; i < this.state.communities.length; i++) {
            // create the url for this community
            var commUrl = "/community/" + this.state.communities[i]._id;
            rows.push(
                <a key={this.state.communities[i]._id} href={commUrl}>{this.state.communities[i].name}</a>
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
                           <div className="content-box">
                               <p className="headertext">My Communities</p>
                               <hr></hr>
                               { this.state.errorMessage }
                               { this.buildCommunityList() }
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default CommunityDashboard;
