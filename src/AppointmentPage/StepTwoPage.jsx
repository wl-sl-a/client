import React from 'react';
import { Link } from 'react-router-dom';
import {servService} from "../_services";

class StepTwoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animal_id: this.props.match.params.aid,
            doctor_id: this.props.match.params.did,
        };
    }

    componentDidMount() {
        servService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    render() {
        document.getElementById('doctors').className = 'active'
        const items = this.state.items;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Крок 2. Оберіть послугу': 'Step 2. Choose a service'}</h1></div>
                <br></br>
                <h3>{localStorage.getItem('language') == 'uk'? 'Тварина № ': 'Animal # '} {this.state.animal_id}</h3>
                <h3>{localStorage.getItem('language') == 'uk'? 'Лікар № ': 'Doctor # '} {this.state.doctor_id}</h3>
                <br></br>
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