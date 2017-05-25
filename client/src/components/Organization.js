import React from 'react';
import Navbar from './Navbar';
import request from 'superagent';
import Sidebar from './Sidebar';

/**
* Component for Organizations.
*/
class Organization extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      organization: [],
      members: [],
      supporters: []};

      //region bind all methods to this
      this.requestInfo = this.requestInfo.bind(this);
      this.hideDiv = this.hideDiv.bind(this);
      this.parseInfoResponse = this.parseInfoResponse.bind(this);

      // update page by calling the API call
      this.requestInfo();
    }

    /**
    * Returns the style attribute for the error div
    * @returns {*} {display: "none"} if the error should be hidden or {} if not
    */
    hideDiv() {
      if (this.state.displayError) {
        return {};
      } else {
        return {display: "none"};
      }
    }

    /**
    * Send the request to get the organization information
    */
    requestInfo() {
      request.get('/api/org/' + this.props.params.id)
      .send()
      .end(this.parseInfoResponse);
    }

    /**
    * Parse the response to the get organization request
    * @param error any error that occurred when submitting the request
    * @param response the response returned from the server
    */
    parseInfoResponse(error, response) {
      switch(response.status) {
        case 200:
        this.setState({organization: response.body.organization});
        break;
        case 203:
        this.setState({
          errorMessage: "Could not get organization data", displayError: true
        });
        break;
        default:
        this.setState({
          errorMessage: "Could not get organization data", displayError: true
        });
      }
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
                    <div
                      className="alert alert-danger"
                      style={this.hideDiv()}>
                      {"Error! " + this.state.errorMessage}
                    </div>
                    <div className="content-box">
                      <p className="headertext">
                        {this.state.organization.title}
                      </p>
                      <hr/>
                      <p>
                        {this.state.organization.desc}
                      </p>
                    </div>

                    <div className="content-box">
                      <p className="headertext2">Members<small>
                        ({this.state.members.length})</small></p>
                      <hr/>
                      <hr/>
                      <a href="#">
                        View all
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-8 col-md-8">


                    <div className="content-box">
                      <p className="headertext2">
                        Activity Feed
                      </p>
                      <hr/>
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

  export default Organization;
