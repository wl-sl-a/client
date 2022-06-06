import React from 'react';
import {directionService} from "../_services";
import {Link} from "react-router-dom";
import {history} from "../_helpers";

export class CreateDirection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitingId: '',
            serviceId: '',
            items: []
        };
        this.handleServiceIdChange = this.handleServiceIdChange.bind(this);
        this.state.visitingId = this.props.match.params.id;
    }

    handleServiceIdChange(event){
        this.setState({ serviceId: event.target.value });
    }


    render() {
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Прийом': 'Visiting Id'}</td>
                            <input id="visitingId" name="theVisitingId" type="text" value={ this.state.visitingId } readOnly={true}/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}</td>
                            <input id="serviceId" name="theServiceId" type="text" onChange={this.handleServiceIdChange} value={ this.state.serviceId }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to={`/visiting/${this.state.visitingId}`}>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const visitingId = event.target.visitingId.value;
        const serviceId = event.target.serviceId.value;
        let data = {
            "visitingId": visitingId,
            "serviceId": serviceId
        }

        directionService.createDirection(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
    };
}