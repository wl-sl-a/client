import React from 'react';
import {ownerService} from "../_services";
import {Link} from "react-router-dom";
import { history } from '../_helpers';

export class EditOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            surname: '',
            name: '',
            phone: '',
            email: '',
            username: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        if(this.state.id == ''){
            ownerService.getById(this.props.match.params.id)
                .then(res => res.json())
                .then(result => this.setState({
                    id: result.id,
                    surname : result.surname,
                    name: result.name,
                    phone: result.phone,
                    email: result.email,
                    username: result.username
                }))
        }else{
            history.push('/owners');
        }
    }

    handleIdChange(event){
        this.setState({ id: event.target.value });
    }

    handleSurnameChange(event){
        this.setState({ surname: event.target.value });
    }

    handleNameChange(event){
        this.setState({ name: event.target.value });
    }

    handlePhoneChange(event){
        this.setState({ phone: event.target.value });
    }

    handleEmailChange(event){
        this.setState({ email: event.target.value });
    }

    handleUsernameChange(event){
        this.setState({ username: event.target.value });
    }

    render() {
        changeMenu()
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35" width="120">Id</td>
                            <input id="id" name="theId" type="text" onChange={this.handleIdChange} value={ this.state.id }/>
                        </tr>
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}</td>
                            <input id="surname" name="theSurname" type="text" onChange={this.handleSurnameChange} value={ this.state.surname }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}</td>
                            <input id="name" name="theName" type="text" onChange={this.handleNameChange} value={ this.state.name }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Електронна пошта': 'Email'}</td>
                            <input id="email" name="theEmail" type="text" onChange={this.handleEmailChange} value={ this.state.email }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}</td>
                            <input id="phone" name="thePhone" type="text" onChange={this.handlePhoneChange} value={ this.state.phone }/>
                        </tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Username': 'Username'}</td>
                            <input id="username" name="theUsername" type="text" value={ this.state.username } readOnly={true}/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to="/owners">{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const id = Number(event.target.id.value);
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
        ownerService.editOwner(id, data)
            .then(res => {res.json(); history.push('/owners');})
            .then(result => data = result)
            .catch((error) => alert( error.response.request._response ) );

        history.push('/owners');
        history.push('/owners');
        window.location.reload();
    };
}