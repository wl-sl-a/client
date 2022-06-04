import React from 'react';
import {doctorService} from "../_services";
import {Link} from "react-router-dom";

export class CreateDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surname: '',
            name: '',
            phone: '',
            specialty: '',
            items: []
        };
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSpecialtyChange = this.handleSpecialtyChange.bind(this);
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

    handleSpecialtyChange(event){
        this.setState({ specialty: event.target.value });
    }

    render() {
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}</td>
                            <input id="surname" name="theSurname" type="text" onChange={this.handleSurnameChange} value={ this.state.surname }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}</td>
                            <input id="name" name="theName" type="text" onChange={this.handleNameChange} value={ this.state.name }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}</td>
                            <input id="phone" name="thePhone" type="text" onChange={this.handlePhoneChange} value={ this.state.phone }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Спеціальність': 'Specialty'}</td>
                            <input id="specialty" name="theSpecialty" type="text" onChange={this.handleSpecialtyChange} value={ this.state.specialty }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to="/doctors">{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const surname = event.target.surname.value;
        const name = event.target.name.value;
        const phone = event.target.phone.value;
        const specialty = event.target.specialty.value;
        let data = {
            "surname": surname,
            "name": name,
            "phone": phone,
            "specialty": specialty
        }

        doctorService.createDoctor(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
    };
}