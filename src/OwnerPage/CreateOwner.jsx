import React from 'react';
import {ownerService} from "../_services";
import {Link} from "react-router-dom";

export class CreateOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: '',
            name: '',
            email: '',
            phone: '',
            username: '',
            items: []
        };
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleSurnameChange(event){
        this.setState({ surname: event.target.value });
    }

    handleNameChange(event){
        this.setState({ name: event.target.value });
    }

    handleEmailChange(event){
        this.setState({ email: event.target.value });
    }

    handlePhoneChange(event){
        this.setState({ phone: event.target.value });
    }

    handleUsernameChange(event){
        this.setState({ username: event.target.value });
    }

    render() {
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit } >
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row" align='center'>
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}</td>
                            <input id="surname" name="theSurname" type="text" onChange={this.handleSurnameChange} value={ this.state.surname } className="form-control"/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}</td>
                            <input id="name" name="theName" type="text" onChange={this.handleNameChange} value={ this.state.name } />
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Електронна пошта': 'Email'}</td>
                            <input id="email" name="theEmail" type="text" onChange={this.handleEmailChange} value={ this.state.email } />
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}</td>
                            <input id="phone" name="thePhone" type="text" onChange={this.handlePhoneChange} value={ this.state.phone }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Логін': 'Username'}</td>
                            <input id="username" name="theUsername" type="text" onChange={this.handleUsernameChange} value={ this.state.username }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit" className="option">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to="/owners" className="option">{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const surname = event.target.surname.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const username = event.target.username.value;
        let data = {
            "surname": surname,
            "name": name,
            "email": email,
            "phone": phone,
            "username": username
        }

        ownerService.createOwner(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
        alert(1)
    };
}