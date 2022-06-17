import React from 'react';
import {appointmentService, doctorService, scheduleService} from "../_services";
import {Link} from "react-router-dom";


export class DetailsDoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            schedules: [],
            dates: [],
            date: '',
            appointments: [],
            appointment: ''
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(event){
        this.setState({ date: event.target.value });

        appointmentService.getAppointmentsByDate(this.props.match.params.id, event.target.value)
            .then(res => res.json())
            .then(result => this.setState({appointments : result}))
    }

    componentDidMount() {
        doctorService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))

        scheduleService.getSchedulesByDoctorId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({schedules : result}))

        scheduleService.getDates(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({dates : result}))
    }

    render() {
        const items = this.state.items;
        const schedules = this.state.schedules;
        const dates = this.state.dates;
        const appointments = this.state.appointments;
        console.log(schedules);
        return (
            <div className="col-md-6 col-md-offset-3">
                <div>
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}: {items.surname}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}: {items.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}: {items.phone}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Спеціальність': 'Specialty'}: {items.specialty}</li>
                </ul>
                <Link to={`/doctors`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
                <br></br><br></br><br></br>
                </div>
                <h1>{localStorage.getItem('language') == 'uk'? 'Розклад': 'Schedule'}</h1>
                <div>
                    <Link to={`/create_schedule/${items.id}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Додати розклад': 'Register new schedule'}</Link>
                    <table className="table table-striped" width={'100%'}>
                        <thead>
                        <tr>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'День тижня': 'Weekday'}</th>
                            <th style={{ width: '20%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {schedules.map(item => (
                            <tr key={item.id}>
                                <td>{item.weekday} </td>
                                <td>{item.startTime} - {item.endTime}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <button onClick={(e)=>deleteSchedule(item.id, e)} className='option'>
                                        {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                    </button>
                                    <Link to={`/edit_schedule/${item.id}`} className='option'>{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <h1>{localStorage.getItem('language') == 'uk'? 'Записи на прийом': 'Appointments'}</h1>
                <select id="date" name="theDate" type="text" onChange={this.handleDateChange} value={ this.state.date }>
                    {
                        dates.map(item =>(
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </select>
                <br></br>
                <table className="table table-striped" width={'100%'}>
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Id': 'Id'}</th>
                        <th style={{ width: '20%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                        <th style={{ width: '20%' }}>{localStorage.getItem('language') == 'uk'? 'Статус': 'Status'}</th>
                        <th style={{ width: '20%' }}>{localStorage.getItem('language') == 'uk'? 'Запис': 'Appointment'}</th>
                    </tr>

                    </thead>
                    <tbody>
                    {appointments.map(item => (
                        <tr key={item.id} className={item.status}>
                            <td>{item.id} </td>
                            <td>{item.time}</td>
                            <td>{item.status} </td>
                            <td>{item.appointment}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        )
    }
}

function deleteSchedule(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете розклад номер ':
        'Are you sure that you want delete schedule number '}${id}?`)){
        scheduleService.deleteSchedule(id).then(() => this.setState({schedules: this.state.schedules.filter(x=>x.id !== id)}))
            .then(()=>window.location.reload());
        window.location.reload();
    }
}