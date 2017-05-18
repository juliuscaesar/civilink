import React from 'react';
import request from 'superagent';
import Auth from './modules/Auth';
import Input from './general/Input';

/**
* Component for the Register form.
*/
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    /**
    * Fields in this form are kept as state and initialized as empty
    */
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      city: '',
      state: '',
      errorMessage: "",
      token: '',
      displayError: false
    };

      //region bind all methods to this
      this.setValue = this.setValue.bind(this);
      this.getButtonClass = this.getButtonClass.bind(this);
      this.confirmPasswordValidation = this.confirmPasswordValidation.bind(this);
      this.getDisabledProperty = this.getDisabledProperty.bind(this);
      this.submitEnabled = this.submitEnabled.bind(this);
      this.buildBody = this.buildBody.bind(this);
      this.parseResponse = this.parseResponse.bind(this);
      this.submitAccount = this.submitAccount.bind(this);
      this.authorizeUser = this.authorizeUser.bind(this);
    }

    /**
    * Validation for the first name field - first name cannot be empty
    * @param value the value to be validated
    * @returns {String}'' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static firstNameValidation(value) {
      if (value === '') {
        return "First Name is required"
      } else if (value.length > 18) {
        return "Name too long"
      } else {
        return '';
      }
    }

    /**
    * Validation for the city field - cannot be empty
    * @param value the value to be validated
    * @returns {String}'' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static cityValidation(value) {
      if (value === '') {
        return "City is required"
      } else {
        return '';
      }
    }

    /**
    * Validation for the state field - first name cannot be empty
    * @param value the value to be validated
    * @returns {String}'' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static stateValidation(value) {
      if (value === '') {
        return "State is required"
      } else {
        return '';
      }
    }

    /**
    * Validation for the last name field - last name cannot be empty
    * @param value the value to be validated
    * @returns {String} '' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static lastNameValidation(value) {
      if (value === '') {
        return "Last Name is required"
      } else if (value.length > 18) {
        return "Name too long"
      } else {
        return '';
      }
    }

    /**
    * Validation for the username field
    * @param value the value to be validated
    * @returns {String} '' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static usernameValidation(value) {
      if (value === '') {
        return "Username is required"
      } else if (value.length < 4) {
        return "Username must be at least 4 characters long"
      } else if (value.length > 18) {
        return "Username too long"
      } else {
        return '';
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
    * Validation for the email field - email cannot be empty and must be of the
    * form of a valid email
    * @param value the value to be validated
    * @returns {String} '' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static emailValidation(value) {
      if (value === '') {
        return "Email is required"
      } else {
        // Regular expression from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(value)) {
          return "Please enter a valid email";
        } else {
          return '';
        }
      }
    }

    /**
    * Validation for the password field - passwords cannot be empty and must
    * be at least 8 characters
    * @param value the value to be validated
    * @returns {String} '' if the value is valid, otherwise returns
    * an appropriate error message
    */
    static passwordValidation(value) {
      if (value === '') {
        return "Password is required"
      } else if (value.length < 8) {
        return "Password must be at least 8 characters"
      } else {
        return '';
      }
    }

    /**
    * Validation for the confirm password field - cannot be empty and
    * must match password field
    * @param value the value to be validated
    * @returns {String} '' if the value is valid, otherwise returns
    * an appropriate error message
    */
    confirmPasswordValidation(value) {
      if (value === '') {
        return "Confirm Password is required"
      } else if (value !== this.state.password) {
        return "Passwords do not match";
      } else {
        return '';
      }
    }

    /**
    * Determines whether the submit button should be enabled or not
    * @returns {boolean} true if all fields in the form are valid
    */
    submitEnabled() {
      return RegisterForm.usernameValidation(this.state.username) === '' &&
      RegisterForm.firstNameValidation(this.state.firstName) === '' &&
      RegisterForm.lastNameValidation(this.state.lastName) === '' &&
      RegisterForm.emailValidation(this.state.email) === '' &&
      RegisterForm.passwordValidation(this.state.password) === '' &&
      this.confirmPasswordValidation(this.state.confirmPassword) === '' &&
      RegisterForm.cityValidation(this.state.city) === '' &&
      RegisterForm.stateValidation(this.state.state) === '';
    }

    /**
    * builds the body of the api call
    */
    buildBody() {
      var body = {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        state: this.state.state,
        city: this.state.city
      };

      return body
    }

    /**
    * Submits the information in the form to the api endpoint
    * Renders success message if account creation was successful
    * Renders error message if account creation failed
    */
    submitAccount(ev) {
      ev.preventDefault();
      request.post('/api/auth/signup')
      .send(this.buildBody())
      .end(this.parseResponse);
    }

    /**
    * Authorizes the user from the token received from register success
    */
    authorizeUser() {
      Auth.authenticateUser(this.state.token);
    }

    /**
    * Parse the response to the create account request
    * @param error any error that occurred when submitting the request
    * @param response the response returned from the server
    */
    parseResponse(error, response) {
      switch(response.status) {
        case 201:
        this.setState({
          token: response.body.token
        });
        this.authorizeUser();
        window.location = '/dashboard';

        break;
        case 203:
        this.setState({
          errorMessage: "Could not create account", displayError: true
        });
        break;
        default:
        this.setState({
          errorMessage: "Could not create account", displayError: true
        });
      }
    }

    // Render the static content
    render(){
      return (
        <form onSubmit={this.submitAccount}>
          <p>
            { this.errorMessage }
          </p>
          <Input
            label="Username"
            inputId="username"
            inputType="text"
            name="username"
            save={this.setValue}
            val={this.state.username}
            validation={RegisterForm.usernameValidation}/>
          <Input
            label="First Name"
            inputId="firstName"
            inputType="text"
            name="firstName"
            save={this.setValue}
            val={this.state.firstName}
            validation={RegisterForm.firstNameValidation}/>
          <Input
            label="Last Name"
            inputId="lastName"
            inputType="text"
            name="lastName"
            save={this.setValue}
            val={this.state.lastName}
            validation={RegisterForm.lastNameValidation}/>
          <Input
            label="Email Address"
            inputId="email"
            inputType="text"
            name="email"
            save={this.setValue}
            val={this.state.email}
            validation={RegisterForm.emailValidation}/>
          <Input
            label="Password"
            inputId="password"
            inputType="password"
            name="password"
            save={this.setValue}
            val={this.state.password}
            validation={RegisterForm.passwordValidation}/>
          <Input
            label="Confirm Password"
            inputId="confirm_password"
            inputType="password"
            name="confirmPassword"
            save={this.setValue}
            val={this.state.confirmPassword}
            validation={this.confirmPasswordValidation}/>
          <Input
            label="City"
            inputId="city"
            inputType="text"
            name="city"
            save={this.setValue}
            val={this.state.city}
            validation={RegisterForm.cityValidation}/>
          <Input
            label="State"
            inputId="state"
            inputType="text"
            name="state"
            save={this.setValue}
            val={this.state.state}
            validation={RegisterForm.stateValidation}/>
          <button
            type="submit"
            disabled={this.getDisabledProperty()}
            className={this.getButtonClass()} >Register</button>
        </form>
      );
    }
  }

  export default RegisterForm;
