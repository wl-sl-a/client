import React from 'react';
import {animalService, appointmentService, doctorService, servService} from "../_services";
import {Link} from "react-router-dom";

export class DetailsAppointmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animal: [],
            doctor: [],
            service: []
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
        animalService.getById(items.animalId)
            .then(res => res.json())
            .then(result => this.setState({animal : result}))

        doctorService.getById(items.doctorId)
            .then(res => res.json())
            .then(result => this.setState({doctor : result}))

        servService.getById(items.serviceId)
            .then(res => res.json())
            .then(result => this.setState({service : result}))

        const animal = this.state.animal;
        const doctor = this.state.doctor;
        const service = this.state.service;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}: {items.animalId} {animal.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}: {items.doctorId} {doctor.surname} {doctor.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}: {items.date}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}: {items.time}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}: {items.serviceId} {service.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Статус': 'Status'}: {items.status}</li>
                </ul>
                <Link to={`/visitings/${items.doctorId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
            </div>
        )
    }
}