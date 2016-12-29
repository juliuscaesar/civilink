import React from 'react';
import Navbar from './navbar';
import request from 'superagent';
import Input from './input';
import CreateCommunityForm from './create_community_form';

/**
 * Component for the navbar.
 */
class CreateCommunity extends React.Component {
    constructor(props) {
        super(props);
    }

    // Render the static content
    render(){
        return (
            <div>
        	   <Navbar/>
               <div className="container-body">
                   <div className="content-box">
                        <p className="headertext">Create Community</p>
                        <hr></hr>
                        <div className="row">
                            <div className="col-xs-10 col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-1">
                                <CreateCommunityForm/>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default CreateCommunity;