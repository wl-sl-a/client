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