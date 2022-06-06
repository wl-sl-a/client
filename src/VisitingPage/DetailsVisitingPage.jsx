import React from 'react';
import {visitingService, directionService, animalService} from "../_services";
import {Link} from "react-router-dom";

export class DetailsVisitingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            directions: []
        };
    }

    componentDidMount() {
        visitingService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))

        directionService.getDirectionsByVisitingId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({directions : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        const items = this.state.items;
        const directions = this.state.directions;
        console.log(items);
        console.log(directions)
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}: {items.animalId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}: {items.doctorId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}: {items.date}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}: {items.time}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Діагноз': 'Diagnosis'}: {items.diagnosis}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Аналізи': 'Analyzes'}: {items.analyzes}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Обстеження': 'Examination'}: {items.examination}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Медикаменти': 'Medicines'}: {items.medicines}</li>
                </ul>
                <Link to={`/visitings/${items.doctorId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
                <br></br><br></br><br></br>
                <div>
                    <h1>{localStorage.getItem('language') == 'uk'? 'Направлення': 'Directions'}</h1>
                    <Link to={`/create_direction/${items.id}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Додати направлення': 'Register new direction'}</Link>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Id</th>
                            <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Прийом': 'Visiting Id'}</th>
                            <th style={{ width: '40%' }}>{localStorage.getItem('language') == 'uk'? 'Послуга': 'Service Id'}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {directions.map(item => (
                            <tr key={item.id}>
                                <td>{item.id} </td>
                                <td>{item.visitingId}</td>
                                <td><Link to={`/service/${item.serviceId}`}>{item.serviceId}</Link></td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <button onClick={(e)=>deleteDirection(item.id, e)} className="option">
                                        {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                    </button>
                                    <Link to={`/edit_direction/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
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

function deleteDirection(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете видалити направлення номер ':
        'Are you sure that you want delete direction number '}${id}?`)){
        directionService.deleteDirection(id).then(() => this.setState({animals: this.state.directions.filter(x=>x.id !== id)}))
            .then(()=>window.location.reload());
        window.location.reload();
    }
}