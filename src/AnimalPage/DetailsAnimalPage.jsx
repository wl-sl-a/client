import React from 'react';
import {animalService} from "../_services";
import {Link} from "react-router-dom";
import {changeMenu} from "../_helpers/localization";

export class DetailsAnimalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        animalService.getById(this.props.match.params.id)
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
                    <li>{localStorage.getItem('language') == 'uk'? 'Кличка': 'Name'}: {items.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Власник': 'OwnerId'}: {items.ownerId}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Вік': 'Age'}: {items.age}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Вид': 'Kind'}: {items.kind}</li>
                    <button>
                        <Link to={`/owner/${items.ownerId}`}>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
                    </button>
                </ul>
            </div>
        )
    }
}
