import React from 'react';
import {Link} from 'react-router-dom';

const home = () => {
    return (
        <div style={{padding: '140px'}}>
            <h1>Home page</h1>
            <Link to='/fibonacci'>Go to fibonacci calculator</Link>

        </div>
    )
};

export default home;