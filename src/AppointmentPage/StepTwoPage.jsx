import React from 'react';
import { Link } from 'react-router-dom';
import {animalService, doctorService, servService} from "../_services";

class StepTwoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animal_id: this.props.match.params.aid,
            doctor_id: this.props.match.params.did,
            animal: [],
            doctor: []
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(event){
        this.setState({ param: event.target.value });
        if(event.target.value.length > 0){
            servService.searchService(event.target.value)
                .then(res => res.json())
                .then(result => this.setState({items : result}))
        } else{
            servService.getAll()
                .then(res => res.json())
                .then(result => this.setState({items : result}))
        }
    }

    componentDidMount() {
        servService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))
        animalService.getById(this.props.match.params.aid)
            .then(res => res.json())
            .then(result => this.setState({animal : result}))
        doctorService.getById(this.props.match.params.did)
            .then(res => res.json())
            .then(result => this.setState({doctor : result}))
    }

    render() {
        document.getElementById('doctors').className = 'active'
        const items = this.state.items;
        const animal = this.state.animal;
        const doctor = this.state.doctor;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Крок 2. Оберіть послугу': 'Step 2. Choose a service'}</h1></div>
                <br></br>
                <h3>{localStorage.getItem('language') == 'uk'? 'Тварина № ': 'Animal # '} {this.state.animal_id} {animal.name}</h3>
                <h3>{localStorage.getItem('language') == 'uk'? 'Лікар № ': 'Doctor # '} {this.state.doctor_id} {doctor.surname} {doctor.name}</h3>
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
                        <th style={{ width: '20%' }}>Id</th>
                        <th style={{ width: '50%' }}>{localStorage.getItem('language') == 'uk'? 'Назва': 'Name'}</th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Ціна': 'Price'}</th>
                    </tr>

                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id} </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/step_three/${this.state.animal_id}/${this.state.doctor_id}/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'НАСТУПНИЙ КРОК': 'NEXT STEP'}</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export { StepTwoPage };