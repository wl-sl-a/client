import React from 'react';
import {directionService} from "../_services";
import {Link} from "react-router-dom";
import { history } from '../_helpers';

export class EditDirection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            visitingId: '',
            serviceId: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleVisitingIdChange = this.handleVisitingIdChange.bind(this);
        this.handleServiceIdChange = this.handleServiceIdChange.bind(this);
    }

    componentDidMount() {
        if(this.state.id == ''){
            directionService.getById(this.props.match.params.id)
                .then(res => res.json())
                .then(result => this.setState({
                    id: result.id,
                    visitingId: result.visitingId,
                    serviceId: result.serviceId
                }))
        }else{
            history.push('/doctors');
        }
    }

    handleIdChange(event){
        this.setState({ id: event.target.value });
    }

    handleVisitingIdChange(event){
        this.setState({ visitingId: event.target.value });
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
                            <td align="left" height="35" width="120">Id</td>
                            <input id="id" name="theId" type="text" onChange={this.handleIdChange} value={ this.state.id }/>
                        </tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Прийом': 'Visiting Id'}</td>
                            <input id="visitingId" name="theVisitingId" type="text" value={ this.state.visitingId } readOnly={true}/>
                        </tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}</td>
                            <input id="serviceId" name="theServiceId" type="text" onChange={this.handleServiceIdChange} value={ this.state.serviceId }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit" className='option'>{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to={`/visiting/${this.state.visitingId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const id = Number(event.target.id.value);
        const visitingId = event.target.visitingId.value;
        const serviceId = event.target.serviceId.value;
        let data = {
            "visitingId": visitingId,
            "serviceId": serviceId
        }
        directionService.editDirection(id, data)
            .then(res => {res.json();})
            .then(result => data = result)
            .catch((error) => alert( error.response.request._response ) );
        alert("Data is updated successfully")
        history.push(`/visiting/${visitingId}`);
    };
}