import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
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
