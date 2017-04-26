import React from 'react';
import request from 'superagent';
import Input from '../general/Input';

/**
* Component for the navbar.
*/
class CreateCommunityForm extends React.Component {
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
    this.submitEnabled = this.submitEnabled.bind(this);

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
  * @returns {string} "" if the button should be enabled, "disabled" if not
  */
  getDisabledProperty() {
    if(!this.submitEnabled()) {
      return "disabled";
    } else {
      return "";
    }
  }

  /**
  * Returns the correct class for the submit button element
  * @returns {string} classes for the submit button
  */
  getButtonClass() {
    var className = "btn btn-lg btn-primary btn-block";
    if(!this.submitEnabled()) {
      className += " btn-disabled  disabled";
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
      return "Name is required"
    } else if (value.length < 5) {
      return "Name too short"
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
    return CreateCommunityForm.nameValidation(this.state.title) === '' &&
    CreateCommunityForm.descValidation(this.state.desc) === '';
  }

  /**
  * Submits the information in the form to the api endpoint
  * Renders success message if account creation was successful
  * Renders error message if account creation failed
  */
  submitAccount(ev) {
    ev.preventDefault();
    request.post('/api/signup')
    .send(this.buildBody())
    .end(this.parseResponse);
  }

  // Render the static content
  render(){
    return (
      <form onSubmit={this.submitAccount}>
        <Input
          label="Name"
          inputId="title"
          inputType="text"
          name="title"
          save={this.setValue}
          validation={CreateCommunityForm.nameValidation}/>
        <Input
          label="Description"
          inputId="desc"
          inputType="text"
          name="desc"
          save={this.setValue}
          validation={CreateCommunityForm.descValidation}/>
        <button
          type="submit"
          disabled={this.getDisabledProperty()}
          className={this.getButtonClass()} >
          Create Community
        </button>
      </form>
    );
  }
}

export default CreateCommunityForm;
