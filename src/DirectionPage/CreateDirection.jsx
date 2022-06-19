import React from 'react';
import {directionService, servService} from "../_services";
import {Link} from "react-router-dom";

export class CreateDirection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitingId: '',
            serviceId: '',
            items: [],
            services: []
        };
        this.handleServiceIdChange = this.handleServiceIdChange.bind(this);
        this.state.visitingId = this.props.match.params.id;
    }

    handleServiceIdChange(event){
        this.setState({ serviceId: event.target.value });
    }

    componentDidMount() {
        servService.getAll()
            .then(res => res.json())
            .then(result => this.setState({services : result}))
    }


    render() {
        document.getElementById('menu').hidden = false
        const services = this.state.services;
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
                            <select id="serviceId" name="theServiceId" type="text" onChange={this.handleServiceIdChange} value={ this.state.serviceId }>
                                <option key='0' value=''> </option>
                                {
                                    services.map(item =>(
                                        <option key={item.id} value={item.id}>{' ' + item.id + ' ' + item.name}</option>
                                    ))
                                }
                            </select>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td><Link to={`/visiting/${this.state.visitingId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                            <td align="center" height="35"><button type="submit" className='option'>{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
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