import React from 'react';
import {appointmentService, animalService, doctorService, servService} from '../_services';
import { Link } from 'react-router-dom';

class AppointmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animals: [],
            animalId: '',
            status: '',
            doctors: [],
            doctorId: '',
            services: [],
            serviceId: '',
        };
        this.handleAnimalIdChange = this.handleAnimalIdChange.bind(this);
        this.handleDoctorIdChange = this.handleDoctorIdChange.bind(this);
        this.handleServiceIdChange = this.handleServiceIdChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    handleAnimalIdChange(event){
        this.setState({ animalId: event.target.value });
        const animalId = event.target.value == ''? null : event.target.value;
        const doctorId = Number(this.state.doctorId) == 0? null : Number(this.state.doctorId)
        const serviceId = Number(this.state.serviceId) == 0? null : Number(this.state.serviceId);
        const status = this.state.status == ''? null : this.state.status;
        let data = {
            "animalId": animalId,
            "doctorId": doctorId,
            "serviceId": serviceId,
            "status": status
        }
        console.log(data)
        appointmentService.filterAll(data)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    handleDoctorIdChange(event){
        this.setState({ doctorId: event.target.value });
        const animalId = Number(this.state.animalId) == 0? null : Number(this.state.animalId);
        const doctorId = event.target.value == ''? null : event.target.value;
        const serviceId = Number(this.state.serviceId) == 0? null : Number(this.state.serviceId);
        const status = this.state.status == ''? null : this.state.status;
        let data = {
            "animalId": animalId,
            "doctorId": doctorId,
            "serviceId": serviceId,
            "status": status
        }
        console.log(data)
        appointmentService.filterAll(data)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    handleServiceIdChange(event){
        this.setState({ serviceId: event.target.value });
        const animalId = Number(this.state.animalId) == 0? null : Number(this.state.animalId);
        const doctorId = Number(this.state.doctorId) == 0? null : Number(this.state.doctorId)
        const serviceId = event.target.value == ''? null : event.target.value;
        const status = this.state.status == ''? null : this.state.status;
        let data = {
            "animalId": animalId,
            "doctorId": doctorId,
            "serviceId": serviceId,
            "status": status
        }
        console.log(data)
        appointmentService.filterAll(data)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    handleStatusChange(event){
        this.setState({ status: event.target.value });
        const animalId = Number(this.state.animalId) == 0? null : Number(this.state.animalId);
        const doctorId = Number(this.state.doctorId) == 0? null : Number(this.state.doctorId)
        const serviceId = Number(this.state.serviceId) == 0? null : Number(this.state.serviceId);
        const status = event.target.value == ''? null : event.target.value;
        let data = {
            "animalId": animalId,
            "doctorId": doctorId,
            "serviceId": serviceId,
            "status": status
        }
        console.log(data)
        appointmentService.filterAll(data)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    componentDidMount() {
        appointmentService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))
        animalService.getAll()
            .then(res => res.json())
            .then(result => this.setState({animals : result}))
        doctorService.getAll()
            .then(res => res.json())
            .then(result => this.setState({doctors : result}))
        servService.getAll()
            .then(res => res.json())
            .then(result => this.setState({services : result}))
    }
    render() {
        document.getElementById('owners').className = 'active'
        const items = this.state.items;
        const animals = this.state.animals;
        const doctors = this.state.doctors;
        const services = this.state.services;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Записи на прийом': 'Appointments'}</h1></div>
                <table className="table table-striped">
                    <thead>
                    <button onClick={(e)=>reset(e)} className="option">
                        {localStorage.getItem('language') == 'uk'? 'СКИНУТИ' : 'RESET'}
                    </button>
                    <tr>
                        <th style={{ width: '10%' }}>Id</th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}
                            <br></br>
                            <select id="animalId" name="theAnimalId" type="text" onChange={this.handleAnimalIdChange} value={ this.state.animalId }>
                                <option key='0' value=''> </option>
                                {
                                    animals.map(item =>(
                                        <option key={item.id} value={item.id}>{' ' + item.id + ' ' + item.name}</option>
                                    ))
                                }
                            </select>
                        </th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}
                            <br></br>
                            <select id="doctorId" name="theDoctorId" type="text" onChange={this.handleDoctorIdChange} value={ this.state.doctorId }>
                                <option key='0' value=''> </option>
                                {
                                    doctors.map(item =>(
                                        <option key={item.id} value={item.id}>{' ' + item.id + ' ' + item.surname}</option>
                                    ))
                                }
                            </select>
                        </th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}
                            <br></br>
                            <select id="serviceId" name="theServiceId" type="text" onChange={this.handleServiceIdChange} value={ this.state.serviceId }>
                                <option key='0' value=''> </option>
                                {
                                    services.map(item =>(
                                        <option key={item.id} value={item.id}>{' ' + item.id + ' ' + item.name}</option>
                                    ))
                                }
                            </select>

                        </th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Status': 'Status'}
                            <br></br>
                            <select id="status" name="theStatus" type="text" onChange={this.handleStatusChange} value={ this.state.status }>
                                <option key='0' value=''> </option>
                                <option key={"wait"} value={"wait"}>wait</option>
                                <option key={"confirmed"} value={"confirmed"}>confirmed</option>
                                <option key={"cancelled"} value={"cancelled"}>cancelled</option>
                            </select>
                        </th>
                    </tr>

                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id} </td>
                            <td><Link to={`/animal/${item.animalId}`}>{item.animalId}</Link> </td>
                            <td><Link to={`/doctor/${item.doctorId}`}>{item.doctorId}</Link></td>
                            <td>{item.date}</td>
                            <td>{item.time} </td>
                            <td><Link to={`/service/${item.serviceId}`}>{item.serviceId}</Link></td>
                            <td>{item.status} </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button onClick={(e)=>confirmAppointment(item.id, e)} className="option">
                                    {localStorage.getItem('language') == 'uk'? 'ПІДТВЕРДИТИ': 'CONFIRM'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
function confirmAppointment(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що підтверджуєте запис на прийом номер ':
        'Are you sure that you confirm appointment number '}${id}?`)){
        appointmentService.confirmAppointment(id).then(r => console.log(r));
        alert("Appointment is confirmed")
        window.location.reload();
    }
}
function reset(e){
    window.location.reload();
}

export { AppointmentPage };