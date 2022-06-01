import React from 'react';
import {animalService} from "../_services";
import {Link} from "react-router-dom";
import { history } from '../_helpers';
import {changeMenu} from "../_helpers/localization";

export class EditAnimal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            ownerId: '',
            age: '',
            kind: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleOwnerIdChange = this.handleOwnerIdChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleKindChange = this.handleKindChange.bind(this);
    }

    componentDidMount() {
        if(this.state.id == ''){
            animalService.getById(this.props.match.params.id)
                .then(res => res.json())
                .then(result => this.setState({
                    id: result.id,
                    name: result.name,
                    ownerId: result.ownerId,
                    age: result.age,
                    kind: result.kind
                }))
        }else{
            history.push('/owners');
        }
    }

    handleIdChange(event){
        this.setState({ id: event.target.value });
    }

    handleNameChange(event){
        this.setState({ name: event.target.value });
    }

    handleOwnerIdChange(event){
        this.setState({ ownerId: event.target.value });
    }

    handleAgeChange(event){
        this.setState({ age: event.target.value });
    }

    handleKindChange(event){
        this.setState({ kind: event.target.value });
    }

    render() {
        changeMenu()
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35" width="120">Id</td>
                            <input id="id" name="theId" type="text" onChange={this.handleIdChange} value={ this.state.id }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Ім`я': 'Name'}</td>
                            <input id="name" name="theName" type="text" onChange={this.handleNameChange} value={ this.state.name }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Власник': 'OwnerId'}</td>
                            <input id="ownerId" name="theOwnerId" type="text" onChange={this.handleOwnerIdChange} value={ this.state.ownerId }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Вік': 'Age'}</td>
                            <input id="age" name="theAge" type="text" onChange={this.handleAgeChange} value={ this.state.age }/>
                        </tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Вид': 'Kind'}</td>
                            <input id="kind" name="theKind" type="text" onChange={this.handleKindChange} value={ this.state.kind }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to={`/owner/${this.state.ownerId}`}>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const id = Number(event.target.id.value);
        const name = event.target.name.value;
        const ownerId = event.target.ownerId.value;
        const age = event.target.age.value;
        const kind = event.target.kind.value;
        let data = {
            "name": name,
            "ownerId": ownerId,
            "age": age,
            "kind": kind
        }
        animalService.editAnimal(id, data)
            .then(res => {res.json(); history.push(`/owner/${ownerId}`);})
            .then(result => data = result)
            .catch((error) => alert( error.response.request._response ) );
        history.push(`/owner/${ownerId}`);
        history.push(`/owner/${ownerId}`);
    };
}