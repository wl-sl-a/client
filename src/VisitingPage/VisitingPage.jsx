import React from 'react';
import {visitingService} from '../_services';
import { Link } from 'react-router-dom';

class VisitingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        visitingService.getVisitingsByDoctorId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }
    render() {
        document.getElementById('owners').className = 'active'
        const items = this.state.items;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Прийоми': 'Visitings'}</h1></div>
                <br></br>
                <br></br>
                <Link to={`/create_visiting/doctor/${this.props.match.params.id}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Почати новий прийом': 'Start new visiting'}</Link>
                <br></br>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Id</th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}</th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                    </tr>

                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.animalId} </td>
                            <td>{item.doctorId}</td>
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
        )
    }
}
function deleteVisiting(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете видалити дані про прийом номер ':
        'Are you sure that you want delete visiting number '}${id}?`)){
        visitingService.deleteVisiting(id).then(r => console.log(r));
        alert("Data is deleted")
        window.location.reload();
    }
}

export { VisitingPage };