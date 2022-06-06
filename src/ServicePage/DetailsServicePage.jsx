import React from 'react';
import {servService} from "../_services";
import {Link} from "react-router-dom";

export class DetailsServicePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        servService.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        const items = this.state.items;
        console.log(items);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>{localStorage.getItem('language') == 'uk'? 'Деталі': 'Details'}</h1>
                <ul className='push'>
                    <li>Id: {items.id}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Назва': 'Name'}: {items.name}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Ціна': 'Price'}: {items.price}</li>
                    <li>{localStorage.getItem('language') == 'uk'? 'Інформація': 'Info'}: {items.info}</li>
                </ul>
                <Link to={`/services`} className="option">{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link>
            </div>
        )
    }
}