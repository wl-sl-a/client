import React from 'react';
import {doctorService} from '../_services';
import { Link } from 'react-router-dom';

class DoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            param: ''
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
    }
    render() {
        document.getElementById('doctors').className = 'active'
        const items = this.state.items;
        console.log(items);
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Лікарі': 'Doctors'}</h1></div>
                <div className="Search">
                    <span className="SearchSpan"><div className='fa fa-search'></div></span>
                    <input
                        className="SearchInput"
                        type="text"
                        onChange={this.handleSearchChange}
                    />
                </div>
                <br></br>
                <br></br>
                <Link to="/create_doctor" className="option">{localStorage.getItem('language') == 'uk'? 'Зареєструвати нового лікаря': 'Register new doctor'}</Link>
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
                                <Link to={`/doctor/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'ДЕТАЛІ': 'DETAILS'}</Link>
                                <button onClick={(e)=>deleteDoctor(item.id, e)} className="option">
                                    {localStorage.getItem('language') == 'uk'? 'ВИДАЛИТИ': 'DELETE'}
                                </button>
                                <Link to={`/edit_doctor/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'РЕДАГУВАТИ': 'EDIT'}</Link>
                                <Link to={`/visitings/${item.id}`} className="option">{localStorage.getItem('language') == 'uk'? 'ПОКАЗАТИ ПРИЙОМИ': 'SHOW VISITING'}</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
function deleteDoctor(id, e) {
    if(window.confirm(`${localStorage.getItem('language') == 'uk'? 'Ви впевнені, що хочете видалити дані про лікаря номер ':
        'Are you sure that you want delete doctor number '}${id}?`)){
        doctorService.deleteDoctor(id).then(() => this.setState({items: this.state.items.filter(x=>x.id !== id)}));
        alert("Data is deleted successfully")
        window.location.reload();
    }
}

export { DoctorPage };