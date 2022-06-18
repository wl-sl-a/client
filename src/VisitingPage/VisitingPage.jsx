import React from 'react';
import {visitingService, animalService} from '../_services';
import { Link } from 'react-router-dom';

class VisitingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animals: [],
            animalId: ''
        };
        this.handleAnimalIdChange = this.handleAnimalIdChange.bind(this);
    }

    handleAnimalIdChange(event){
        this.setState({ animalId: event.target.value });
        visitingService.getVisitingsByAnimalId(event.target.value)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    componentDidMount() {
        visitingService.getVisitingsByDoctorId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
        animalService.getAll()
            .then(res => res.json())
            .then(result => this.setState({animals : result}))
    }
    render() {
        document.getElementById('owners').className = 'active'
        const items = this.state.items;
        const animals = this.state.animals;
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
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}
                            <br></br>
                            <select id="animalId" name="theAnimalId" type="text" onChange={this.handleAnimalIdChange} value={ this.state.animalId }>
                                {
                                    animals.map(item =>(
                                        <option key={item.id} value={item.id}>{' ' + item.id + ' ' + item.name}</option>
                                    ))
                                }
                            </select>
                        </th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                    </tr>

                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id} </td>
                            <td><Link to={`/animal/${item.animalId}`}>{item.animalId}</Link> </td>
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
        window.location.reload();
    }
}

export { VisitingPage };