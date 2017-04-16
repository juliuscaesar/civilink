import React from 'react';

/**
 * Component for a single input field in a form
 * Should be reusable in other forms
 */
class Input extends React.Component {
    constructor(props) {
        super(props);

        // keep the input field's value and whether an error should be visible in the state
        this.state = {value : '', errorVisible: false};

        // bind all functions to this
        this.getClassName = this.getClassName.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.displayError = this.displayError.bind(this);
    }

    /**
     * Handles a change in the input field
     * Saves the value to this component's state
     * Also saves the value to the form's state using the props.save function passed in
     * Validates the value and sets the errorVisible state appropriately
     * @param event the change event
     */
    handleChange(event) {
        this.props.save(this.props.name, event.target.value);
        this.setState({value: event.target.value});
        if(this.props.validation(event.target.value) !==  '') {
            this.setState({errorVisible : true});
        } else {
            this.setState({errorVisible: false});
        }
    }



    /**
     * Returns the appropriate classes for the form group
     * Adds an error class if an error should be visible
     * @returns {string} classes for the form group
     */
    getClassName() {
        var className = "form-group";
        if (this.state.errorVisible) {
            className += " has-error";
        }
        return className;
    }

    /**
     * Returns the style elements for the error message
     * If an error should be shown set the color to red
     * If an error should not be shown, set the error message to display: none
     * @returns {{}} the appropriate style elements for the error message
     */
    displayError() {
        var style = {};
        if (this.state.errorVisible) {
            style = {color: "red"};
        } else {
            style = {display: "none"};
        }
        return style;
    }

    /**
     * Renders the form group for this input component - including the label, input field, and error message
     * @returns {XML} the HTML for this form group
     */
    render(){
        return (
            <div className={this.getClassName()}>
                <label id={this.props.inputId + "_label"} htmlFor={this.props.inputId}>{this.props.label}</label>
                <input type={this.props.inputType} id={this.props.inputId} className="form-control"
                       onChange={this.handleChange}></input>
                <div style={this.displayError(this.state.firstName)} >{this.props.validation(this.state.value)}</div>
            </div>);
    }
}

export default Input
