import React from 'react';
import { doctorService } from '../_services';
import { Link } from 'react-router-dom';

class StepOnePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            animal_id: this.props.match.params.aid
        };
    }

    componentDidMount() {
        doctorService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }
    render() {
        document.getElementById('doctors').className = 'active'
        const items = this.state.items;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Крок 1. Оберіть лікаря': 'Step 1. Choose a doctor'}</h1></div>
                <br></br>
                <h3>{localStorage.getItem('language') == 'uk'? 'Тварина № ': 'Animal # '} {this.state.animal_id}</h3>
                <br></br>
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