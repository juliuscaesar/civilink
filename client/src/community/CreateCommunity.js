import React from 'react';
import Navbar from '../general/Navbar';

import CreateCommunityForm from './CreateCommunityForm';

/**
 * Component for the navbar.
 */
class CreateCommunity extends React.Component {
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
