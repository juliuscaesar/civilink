import React from 'react';
import request from 'superagent';
import Input from '../general/Input';
import Auth from '../modules/Auth';

/**
* Component for the navbar.
*/
class CreateProjectForm extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {title: '', desc: ''};

    //region bind all methods to this
    this.setValue = this.setValue.bind(this);
    this.getButtonClass = this.getButtonClass.bind(this);
    this.getDisabledProperty = this.getDisabledProperty.bind(this);
    this.buildBody = this.buildBody.bind(this);
    this.submitEnabled = this.submitEnabled.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.parseResponse = this.parseResponse.bind(this);

    //update the page

  }

  /**
  * Saves the given value to the given name in the state
  * @param name the name of the state field to be set
  * @param value the value to set
  */
  setValue(name, value) {
    this.setState({[name]: value});
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
      community: this.props.community
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
      window.location = '/project/' + response.body.project._id;
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
        <input
          type="hidden"
          name="community"
          value={this.props.community}/>
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
