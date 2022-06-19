import React from 'react';
import {appointmentService} from "../_services";
import {Link} from "react-router-dom";

export class DetailsAppointmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        appointmentService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        const items = this.state.items;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}: {items.animalId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}: {items.doctorId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}: {items.date}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}: {items.time}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}: {items.serviceId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Статус': 'Status'}: {items.status}</li>
                </ul>
                <Link to={`/visitings/${items.doctorId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
            </div>
        )
    }
}