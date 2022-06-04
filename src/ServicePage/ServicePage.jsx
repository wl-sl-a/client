import React from 'react';
import { servService } from '../_services';
import { Link } from 'react-router-dom';


class ServicePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        servService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }
    render() {

        document.getElementById('services').className = 'active'
        const items = this.state.items;
        console.log(items);
        return (
            <div>
                <h1>{localStorage.getItem('language') == 'uk'? 'Реєстр послуг': 'Services'}</h1>
                <Link to="/create_service">{localStorage.getItem('language') == 'uk'? 'Додати нову послугу': 'Add new service'}</Link>
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
                                <Link to={`/service/${item.id}`} className="btn btn-sm btn-primary mr-1">{localStorage.getItem('language') == 'uk'? 'ДЕТАЛІ': 'DETAILS'}</Link>
                                <button onClick={(e)=>deleteService(item.id, e)} className="btn btn-sm btn-danger btn-delete-user">
                                    {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                </button>
                                <Link to={`/edit_service/${item.id}`} className="btn btn-sm btn-primary mr-1">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
function deleteService(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете видалити дані про послуги номер ':
        'Are you sure that you want delete service number '}${id}?`)){
        servService.deleteService(id).then(() => this.setState({items: this.state.items.filter(x=>x.id !== id)}))
            .then(()=>window.location.reload());
        window.location.reload();
    }
}

export { ServicePage };