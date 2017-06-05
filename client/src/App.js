import React from 'react';
import request from 'superagent';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: [] };

    this.parseUserResponse = this.parseUserResponse.bind(this);
  }


  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      request
      .get('/api/auth/getuser')
      .set('token', Auth.getToken())
      .send()
      .end(this.parseUserResponse);
    }
  }

  /**
  * Parse the response to the get user request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseUserResponse(error, response) {
    switch(response.status) {
      case 200:
        this.setState({ user: response.body.user });
          break;
      }
    }

    render() {
      return (
        <div>
          <Navbar {...this.state}/>
          <div className="ui container container-body">
            <Grid stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Sidebar/>
                </Grid.Column>
                <Grid.Column width={13}>
                  { this.props.children }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      );
    }
  }

  export default App;
