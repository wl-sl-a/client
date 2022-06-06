import React from 'react';

class HomePage extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <nav className="menu">
                    <input checked="checked" className="menu-toggler" type="checkbox"/>
                        <ul>
                            <li className="menu-item">
                                <a href="/" id="homeM"><br/>Home</a>
                            </li>
                            <li className="menu-item">
                                <a href="/owners" id="ownerM"><br/>Owners</a>
                            </li>
                            <li className="menu-item">
                                <a href="/doctors" id="doctorM"><br/>Doctors</a>
                            </li>
                            <li className="menu-item">
                                <a href="/services" id="serviceM"><br/>Services</a>
                            </li>
                            <li className="menu-item">
                                <a href="#" id="appointmentM"><br/>Appoinment</a>
                            </li>
                            <li className="menu-item">
                                <a href="#"></a>
                            </li>
                        </ul>
                </nav>
            </div>
        );

    }
}

export { HomePage };