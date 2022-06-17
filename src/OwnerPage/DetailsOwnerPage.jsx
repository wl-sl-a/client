import React from 'react';
import {ownerService, animalService} from "../_services";
import {Link} from "react-router-dom";

export class DetailsOwnerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animals: []
        };
    }

    componentDidMount() {
        ownerService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))

        animalService.getAnimalsByOwnerId(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({animals : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        const items = this.state.items;
        const animals = this.state.animals;
        console.log(items);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}: {items.surname}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}: {items.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}: {items.phone}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Електронна пошта': 'Email'}: {items.email}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Логін': 'Username'}: {items.username}</li>
                </ul>
                    <Link to={`/owners`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
                <br></br><br></br><br></br>
                <div>
                    <h1>{localStorage.getItem('language') == 'uk'? 'Тварини': 'Animals'}</h1>
                    <Link to={`/create_animal/${items.id}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Додати тварину': 'Register new animal'}</Link>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Id</th>
                            <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Кличка': 'Name'}</th>
                            <th style={{ width: '40%' }}>{localStorage.getItem('language') == 'uk'? 'Власник': 'Owner Id'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Вік': 'Age'}</th>
                            <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Вид': 'Kind'}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {animals.map(item => (
                            <tr key={item.id}>
                                <td>{item.id} </td>
                                <td>{item.name}</td>
                                <td>{item.ownerId} </td>
                                <td>{item.age}</td>
                                <td>{item.kind}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`/animal/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'ДЕТАЛІ': 'DETAILS'}</Link>
                                    <button onClick={(e)=>deleteAnimal(item.id, e)} className="option">
                                        {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                    </button>
                                    <Link to={`/edit_animal/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
                                    <Link to={`/step_one/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'ЗАПИСАТИ НА ПРИЙОМ': 'MAKE APPOINTMENT'}</Link>
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

function deleteAnimal(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете видалити дані про тварину номер ':
        'Are you sure that you want delete animal number '}${id}?`)){
        animalService.deleteAnimal(id).then(() => this.setState({animals: this.state.animals.filter(x=>x.id !== id)}))
            .then(()=>window.location.reload());
        window.location.reload();
    }
}
