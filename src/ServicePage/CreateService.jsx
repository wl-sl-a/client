import React from 'react';
import {servService} from "../_services";
import {Link} from "react-router-dom";

export class CreateService extends React.Component {
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
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
    }

    handleNameChange(event){
        this.setState({ name: event.target.value });
    }

    handlePriceChange(event){
        this.setState({ price: event.target.value });
    }

    handleInfoChange(event){
        this.setState({ info: event.target.value });
    }

    render() {
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Назва': 'Name'}</td>
                            <input id="name" name="theName" type="text" onChange={this.handleNameChange} value={ this.state.name }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Ціна': 'Price'}</td>
                            <input id="price" name="thePrice" type="text" onChange={this.handlePriceChange} value={ this.state.price }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Інформація': 'Info'}</td>
                            <textarea id="info" name="theInfo" onChange={this.handleInfoChange} value={ this.state.info }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to="/services">{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const name = event.target.name.value;
        const price = event.target.price.value;
        const info = event.target.info.value;
        let data = {
            "name": name,
            "price": price,
            "info": info
        }

        servService.createService(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
    };
}