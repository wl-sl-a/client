import React from 'react';
import {animalService, doctorService, scheduleService} from "../_services";
import {Link} from "react-router-dom";


export class DetailsDoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            schedules: []
        };
    }

    componentDidMount() {
        doctorService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))

        scheduleService.getSchedulesByDoctorId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({schedules : result}))
    }

    render() {
        const items = this.state.items;
        const schedules = this.state.schedules;
        console.log(schedules);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}: {items.surname}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}: {items.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}: {items.phone}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Спеціальність': 'Specialty'}: {items.specialty}</li>
                    <button>
                        <Link to={`/doctors`}>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
                    </button>
                </ul>
                <h2>{localStorage.getItem('language') == 'uk'? 'Розклад': 'Schedule'}</h2>
                <div>
                    <Link to={`/create_schedule/${items.id}`}>{localStorage.getItem('language') == 'uk'? 'Додати розклад': 'Register new schedule'}</Link>
                    <table className="table table-striped" width={'100%'}>
                        <thead>
                        <tr>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'День тижня': 'Weekday'}</th>
                            <th style={{ width: '90%' }}>{localStorage.getItem('language') == 'uk'? 'Початок': 'Start'}</th>
                            <th style={{ width: '90%' }}>{localStorage.getItem('language') == 'uk'? 'Кінець': 'End'}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {schedules.map(item => (
                            <tr key={item.id}>
                                <td>{item.weekday} </td>
                                <td>{item.startTime}</td>
                                <td>{item.endTime}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`/schedule/${item.id}`} className="btn btn-sm btn-primary mr-1">{localStorage.getItem('language') == 'uk'? 'ДЕТАЛІ': 'DETAILS'}</Link>
                                    <button onClick={(e)=>deleteSchedule(item.id, e)} className="btn btn-sm btn-danger btn-delete-user">
                                        {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                    </button>
                                    <Link to={`/edit_schedule/${item.id}`} className="btn btn-sm btn-primary mr-1">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
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

function deleteSchedule(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете розклад номер ':
        'Are you sure that you want delete schedule number '}${id}?`)){
        scheduleService.deleteSchedule(id).then(() => this.setState({schedules: this.state.schedules.filter(x=>x.id !== id)}))
            .then(()=>window.location.reload());
        window.location.reload();
    }
}