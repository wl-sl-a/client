import React from 'react';
import {animalService, appointmentService, visitingService} from "../_services";
import {Link} from "react-router-dom";

export class DetailsAnimalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            visitings: [],
            appointments: []
        };
    }

    componentDidMount() {
        animalService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
        visitingService.getVisitingsByAnimalId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({visitings : result}))
        appointmentService.getAppointmentsByAnimalId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({appointments : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        const items = this.state.items;
        const visitings = this.state.visitings;
        const appointments = this.state.appointments;
        console.log(items);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Кличка': 'Name'}: {items.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Власник': 'OwnerId'}: {items.ownerId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Вік': 'Age'}: {items.age}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Вид': 'Kind'}: {items.kind}</li>
                </ul>
                <Link to={`/owner/${items.ownerId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
                <br></br><br></br><br></br>
                <div>
                    <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Прийоми': 'Visitings'}</h1></div>
                    <br></br>
                    <br></br>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Id</th>
                            <th style={{ width: '25%' }}>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}</th>
                            <th style={{ width: '25%' }}>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</th>
                            <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {visitings.map(item => (
                            <tr key={item.id}>
                                <td>{item.id} </td>
                                <td>{item.animalId}</td>
                                <td><Link to={`/doctor/${item.doctorId}`}>{item.doctorId}</Link></td>
                                <td>{item.date}</td>
                                <td>{item.time} </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`/visiting/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'ДЕТАЛІ': 'DETAILS'}</Link>
                                    <button onClick={(e)=>deleteVisiting(item.id, e)} className="option">
                                        {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                    </button>
                                    <Link to={`/edit_visiting/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <br></br><br></br><br></br>
                <div>
                    <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Записи на прийом': 'Appointments'}</h1></div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Id</th>
                            <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}</th>
                            <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Status': 'Status'}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {appointments.map(item => (
                            <tr key={item.id}>
                                <td>{item.id} </td>
                                <td><Link to={`/animal/${item.animalId}`}>{item.animalId}</Link> </td>
                                <td><Link to={`/doctor/${item.doctorId}`}>{item.doctorId}</Link></td>
                                <td>{item.date}</td>
                                <td>{item.time} </td>
                                <td><Link to={`/service/${item.serviceId}`}>{item.serviceId}</Link></td>
                                <td>{item.status} </td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <button onClick={(e)=>cancelAppointment(item.id, e)} className="option">
                                        {localStorage.getItem('language') == 'uk'? 'ВІДМІНИТИ': 'CANCEL'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
function cancelAppointment(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що відміняєте запис на прийом номер ':
        'Are you sure that you cancel appointment number '}${id}?`)){
        appointmentService.cancelAppointment(id).then(r => console.log(r));
        alert("Appointment is cancelled")
        window.location.reload();
    }
}
