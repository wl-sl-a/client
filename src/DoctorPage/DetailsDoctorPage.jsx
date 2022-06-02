import React from 'react';
import {doctorService} from "../_services";
import {Link} from "react-router-dom";
import {changeMenu} from "../_helpers/localization";

export class DetailsDoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        doctorService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    render() {
        changeMenu()
        document.getElementById('menu').hidden = false
        const items = this.state.items;
        console.log(items);
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
            </div>
        )
    }
}