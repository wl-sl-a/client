import React from 'react';
import {animalService, doctorService} from '../_services';
import { Link } from 'react-router-dom';

class StepOnePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animal_id: this.props.match.params.aid,
            animal:[]
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event){
        this.setState({ param: event.target.value });
        if(event.target.value.length > 0){
            doctorService.searchDoctor(event.target.value)
                .then(res => res.json())
                .then(result => this.setState({items : result}))
        } else{
            doctorService.getAll()
                .then(res => res.json())
                .then(result => this.setState({items : result}))
        }
    }

    componentDidMount() {
        doctorService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))

        animalService.getById(this.props.match.params.aid)
            .then(res => res.json())
            .then(result => this.setState({animal : result}))
    }
    render() {
        document.getElementById('doctors').className = 'active'
        const items = this.state.items;
        const animal = this.state.animal;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Крок 1. Оберіть лікаря': 'Step 1. Choose a doctor'}</h1></div>
                <br></br>
                <h3>{localStorage.getItem('language') == 'uk'? 'Тварина № ': 'Animal # '} {this.state.animal_id} {animal.name}</h3>
                <br></br>
                <div className="Search">
                    <span className="SearchSpan"><div className='fa fa-search'></div></span>
                    <input
                        className="SearchInput"
                        type="text"
                        onChange={this.handleSearchChange}
                    />
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Id</th>
                        <th style={{ width: '25%' }}>{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}</th>
                        <th style={{ width: '25%' }}>{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}</th>
                        <th style={{ width: '20%' }}>{localStorage.getItem('language') == 'uk'? 'Спеціальність': 'Specialty'}</th>
                    </tr>

                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id} </td>
                            <td>{item.surname}</td>
                            <td>{item.name}</td>
                            <td>{item.phone} </td>
                            <td>{item.specialty}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/step_two/${this.state.animal_id}/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'НАСТУПНИЙ КРОК': 'NEXT STEP'}</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export { StepOnePage };