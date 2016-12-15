import React from 'react';

/**
 * Component for the navbar.
 */
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        //region bind all methods to this


        //update the page

    }
    // Render the static content
    render(){
        return (
        	<form action="/api/login" method="POST" className="form-signin">
				<input type="text" name="username" placeholder="Username" required="required" autoFocus="autoFocus" className="form-control"/>
				<input type="password" name="password" placeholder="Password" required="required" className="form-control"/>
				<button type="submit" className="btn btn-md btn-primary btn-block">Sign in</button><span className="clearfix"></span>
			</form>
        );
    }
}

export default LoginForm;