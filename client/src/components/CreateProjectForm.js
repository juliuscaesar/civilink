import React from 'react';
import request from 'superagent';
import Input from './Input';
import Auth from './Auth';
import CauseTag from './CauseTag';
import { Label, Message } from 'semantic-ui-react';

/**
* Component for the navbar.
*/
class CreateProjectForm extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      errorMessage: '',
      displayError: false,
      title: '',
      desc: '',
      causes: ['Public Health', 'Economy & Jobs']
    };

    //region bind all methods to this
    this.hideDiv = this.hideDiv.bind(this);
    this.setValue = this.setValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayCauses = this.displayCauses.bind(this);
    this.getButtonClass = this.getButtonClass.bind(this);
    this.getDisabledProperty = this.getDisabledProperty.bind(this);
    this.buildBody = this.buildBody.bind(this);
    this.submitEnabled = this.submitEnabled.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.parseResponse = this.parseResponse.bind(this);

    //update the page

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
  * Saves the given value to the given name in the state
  * @param name the name of the state field to be set
  * @param value the value to set
  */
  setValue(name, value) {
    this.setState({[name]: value});
  }

  handleClick(ev, cause) {
    ev.preventDefault();
    console.log('The link was clicked.');
    this.setState({causes: this.state.causes.concat([cause])});
    return false;
  }

  displayCauses() {
    const causes = [
      'Education',
      'Environment',
      'LGBT Rights',
      'Housing & Homelessness',
      'Economy & Jobs',
      'Public Health',
      'Justice & Equality'
    ];

    var rows = [];
    for (var i = 0; i < causes.length; i++) {
      rows.push(
        <button
          onClick={() => this.handleClick(this, causes[i])}
          name={causes[i]}
          size='large'>
          {causes[i]}
        </button>
      );
    }
    return rows;
  }

  /**
  * Returns what the disabled property on the button should be set to
  * @returns boolean if the button should be enabled, "disabled" if not
  */
  getDisabledProperty() {
    if(!this.submitEnabled()) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Returns the correct class for the submit button element
  * @returns {string} classes for the submit button
  */
  getButtonClass() {
    var className = "ui button green fluid";
    if(!this.submitEnabled()) {
      className += " disabled";
    }
    return className;
  }

  /**
  * Validation for the email field - email cannot be empty and must be of
  * the form of a valid email
  * @param value the value to be validated
  * @returns {String} '' if the value is valid, otherwise returns an
  * appropriate error message
  */
  static nameValidation(value) {
    if (value === '') {
      return "Title is required"
    } else if (value.length < 5) {
      return "Title too short"
    } else {
      return '';
    }
  }

  /**
  * Validation for the password field - passwords cannot be empty and
  * must be at least 8 characters
  * @param value the value to be validated
  * @returns {String} '' if the value is valid, otherwise returns an
  * appropriate error message
  */
  static descValidation(value) {
    if (value === '') {
      return "Description is required"
    } else {
      return '';
    }
  }

  /**
  * Determines whether the submit button should be enabled or not
  * @returns {boolean} true if all fields in the form are valid
  */
  submitEnabled() {
    return CreateProjectForm.nameValidation(this.state.title) === '' &&
    CreateProjectForm.descValidation(this.state.desc) === '';
  }

  /**
  * builds the body of the api call
  */
  buildBody() {
    var body = {
      title: this.state.title,
      desc: this.state.desc,
      community: this.props.community,
      causes: this.state.causes
    };

    return body
  }

  /**
  * Submits the information in the form to the api endpoint
  * Renders success message if account creation was successful
  * Renders error message if account creation failed
  */
  submitForm(ev) {
    ev.preventDefault();
    request.post('/api/project/create')
    .set('token', Auth.getToken())
    .send(this.buildBody())
    .end(this.parseResponse);
  }

  /**
  * Parse the response to the create project request
  * @param error any error that occurred when submitting the request
  * @param response the response returned from the server
  */
  parseResponse(error, response) {
    switch(response.status) {
      case 201:
      window.location = '/project/' + response.body.project.url;
      break;
      case 500:
      this.setState({
        errorMessage: "Could not create project", displayError: true
      });
      break;
      default:
      this.setState({
        errorMessage: "Could not create project", displayError: true
      });
    }
  }

  // Render the static content
  render(){
    return (
      <form className="ui form" onSubmit={this.submitForm}>
        <div className="description">
          <Message color='red' style={this.hideDiv()}>
            Error: { this.state.errorMessage }
          </Message>
          <div className="content">
            <Input
              label="Name"
              inputId="title"
              inputType="text"
              name="title"
              save={this.setValue}
              validation={CreateProjectForm.nameValidation}/>
            <Input
              label="Description"
              inputId="desc"
              inputType="text"
              name="desc"
              save={this.setValue}
              validation={CreateProjectForm.descValidation}/>
            <label>Causes</label>

          </div>
          <button
            type="submit"
            disabled={this.getDisabledProperty()}
            className={this.getButtonClass()} >
            Create Project
          </button>
        </div>
      </form>
    );
  }
}

export default CreateProjectForm;
