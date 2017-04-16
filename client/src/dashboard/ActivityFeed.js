import React from 'react';
import Navbar from '../general/Navbar';
import request from 'superagent';

/**
 * Component for an Actvity Feed.
 * Not used but this will replace the obnoxious buildbody stuff
 * on the Dashboard if fully implemented.
 */
class ActivityFeed extends React.Component {
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
                        <p className="headertext">Activity Feed</p>
                        <hr></hr>

                   </div>
               </div>
            </div>
        );
    }
}

export default ActivityFeed;
