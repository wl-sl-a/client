import React from 'react';
import {servService} from "../_services";
import {Link} from "react-router-dom";
import { history } from '../_helpers';
import {changeMenu} from "../_helpers/localization";

export class EditService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: '',
            info: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
    }

    componentDidMount() {
        if(this.state.id == ''){
            servService.getById(this.props.match.params.id)
                .then(res => res.json())
                .then(result => this.setState({
                    id: result.id,
                    name: result.name,
                    price: result.price,
                    info: result.info
                }))
        }else{
            history.push('/services');
        }
    }

    handleIdChange(event){
        this.setState({ id: event.target.value });
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
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Назва': 'Name'}</td>
                            <input id="name" name="theName" type="text" onChange={this.handleNameChange} value={ this.state.name }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Ціна': 'Price'}</td>
                            <input id="price" name="thePrice" type="text" onChange={this.handlePriceChange} value={ this.state.price }/>
                        </tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Інформація': 'Info'}</td>
                            <input id="info" name="theInfo" type="text" onChange={this.handleInfoChange} value={ this.state.info }/>
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
        const id = Number(event.target.id.value);
        const name = event.target.name.value;
        const price = event.target.price.value;
        const info = event.target.info.value;
        let data = {
            "name": name,
            "price": price,
            "info": info
        }
        servService.editService(id, data)
            .then(res => {res.json(); history.push('/services');})
            .then(result => data = result)
            .catch((error) => alert( error.response.request._response ) );

        history.push('/services');
        history.push('/services');
        window.location.reload();
    };
}