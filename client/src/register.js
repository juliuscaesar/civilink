import React from 'react';
import Navbar from './navbar';
import RegisterForm from './register_form';

/**
 * Component for the Sign up page.
 */
class Register extends React.Component {
    // Render the static content
    render(){
        return (
            <div>
        	   <Navbar/>
               <div className="container-body">
                   <div className="content-box">
                        <h2>Sign up!</h2>
                        <hr></hr>
                        <div className="row">
                            <div className="col-xs-10 col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-1">
                                <div className="signup-wall">
                                    <RegisterForm/>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default Register;
