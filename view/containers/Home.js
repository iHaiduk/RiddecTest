import React, {Component} from 'react';
import Tables from './../components/Tables';

class Home extends Component {

    render () {
        //const userAgent = this.props.phoneBook; TODO radium has bug with user agent
        return (
            <div>
                <Tables radiumConfig={{userAgent: 'all'}} />
            </div>
        );
    }
}

export default Home;
