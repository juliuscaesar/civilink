import React from 'react';
import request from 'superagent';
import Auth from './modules/Auth';
import Input from './general/Input';

/**
 * Component for the Login form.
 */
class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        /**
         * Fields in this form are kept as state and initialized as empty
         */
        this.state = {username: '', password: '', token: '', errorMessage: "", displayError: false};

        //region bind all methods to this
        this.setValue = this.setValue.bind(this);
        this.getButtonClass = this.getButtonClass.bind(this);
        this.getDisabledProperty = this.getDisabledProperty.bind(this);
        this.submitEnabled = this.submitEnabled.bind(this);
        this.buildBody = this.buildBody.bind(this);
        this.parseResponse = this.parseResponse.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.authorizeUser = this.authorizeUser.bind(this);

        //update the page

    }

    /**
     * Validation for the username field
     * @param value the value to be validated
     * @returns {Boolean} if the value is valid
     */
    static usernameValidation(value) {
        if (value === '') {
            return false;
        } else if (value.length < 4) {
            return false;
        } else if (value.length > 18) {
            return false;
        } else {
            return true;
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
     * @returns {string} "" if the button should be enabled, "disabled" if it should be disabled
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
     * Validation for the password field - passwords cannot be empty and must be at least 8 characters
     * @param value the value to be validated
     * @returns {Boolean} if the value is valid
     */
    static passwordValidation(value) {
        if (value === '') {
            return false;
        } else if (value.length < 8) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Determines whether the submit button should be enabled or not
     * @returns {boolean} true if all fields in the form are valid
     */
    submitEnabled() {
        return LoginForm.usernameValidation(this.state.username) &&
                LoginForm.passwordValidation(this.state.password);
    }

    /**
     * builds the body of the api call
     * @returns {{email: string, password: string, first: string, last: string}}
     */
    buildBody() {
        var body = {
            username: this.state.username,
            password: this.state.password
        };

        return body
    }
    /**
     * Authorizes the user from the token received from logging in
     */
    authorizeUser() {
      Auth.authenticateUser(this.state.token);
    }

    /**
     * Submits the information in the form to the api endpoint
     * Renders success message if account creation was successful
     * Renders error message if account creation failed
     */
    submitLogin(ev) {
        ev.preventDefault();
        request.post('/api/auth/login')
            .send(this.buildBody())
            .end(this.parseResponse);
    }

    /**
     * Parse the response to the get games request
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
            default:
                this.setValue('username', '');
                this.setValue('password', '');
                this.setState({
                  username: '',
                  password: '',
                  errorMessage: "Could not login", displayError: true
                });
        }
    }

    // Render the static content
    render(){
        return (
          <div id="form-root">
            <form onSubmit={this.submitLogin}>
                <p>{ this.errorMessage }</p>
                <Input label="Username" inputId="username" inputType="text"
                    name="username" save={this.setValue} val={this.state.username}
                    validation={LoginForm.usernameValidation}/>
                <Input label="Password" inputId="password" inputType="password"
                    name="password" save={this.setValue} val={this.state.password}
                    validation={LoginForm.passwordValidation}/>
                <button type="submit" disabled={this.getDisabledProperty()} className={this.getButtonClass()} >Login</button>
            </form>
          </div>
        );
    }
}

export default LoginForm;
