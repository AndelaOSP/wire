import * as React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return(
        <div className="columns">
            <div className="column">
                Login Left <br />
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="column">Login Right</div>
        </div>
    );
};

export default LoginPage;
