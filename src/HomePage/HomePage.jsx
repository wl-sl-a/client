import React from 'react';
import { Link } from 'react-router-dom';
import {changeMenu} from "../_helpers/localization";

class HomePage extends React.Component {

    render() {
        changeMenu()
        document.getElementById('menu').hidden = false
        document.getElementById('home').className = 'active'
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <p>
                    <Link to="/owners">Owners</Link>
                </p>
            </div>
        );
    }
}
export { HomePage };