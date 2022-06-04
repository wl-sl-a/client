import React from 'react';
import { ownerService } from '../_services';
import { Link } from 'react-router-dom';

class OwnerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        ownerService.getAll()
            .then(res => res.json())
            .then(result => this.setState({items : result}))
    }
    render() {
        document.getElementById('owners').className = 'active'
        const items = this.state.items;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Клієнти': 'Clients'}</h1></div>
                <br></br>
                <br></br>
                <Link to="/create_owner" className='option'>{localStorage.getItem('language') == 'uk'? 'Зареєструвати нового клієнта': 'Register new client'}</Link>
                <br></br>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style={{ width: '10%' }}>Id</th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Прізвище': 'Surname'}</th>
                        <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Телефон': 'Phone'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Електронна пошта': 'Email'}</th>
                        <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Логін': 'Username'}</th>
                    </tr>

                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id} </td>
                            <td>{item.surname}</td>
                            <td>{item.name}</td>
                            <td>{item.phone} </td>
                            <td>{item.email}</td>
                            <td>{item.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/owner/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'ДЕТАЛІ': 'DETAILS'}</Link>
                                <button onClick={(e)=>deleteOwner(item.id, e)} className="option">
                                    {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                </button>
                                <Link to={`/edit_owner/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
function deleteOwner(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете видалити дані про клієнта номер ':
        'Are you sure that you want delete client number '}${id}?`)){
        ownerService.deleteOwner(id).then(() => this.setState({items: this.state.items.filter(x=>x.id !== id)}))
            .then(()=>window.location.reload());
        window.location.reload();
    }
}

export { OwnerPage };