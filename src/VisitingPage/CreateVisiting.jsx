import React from 'react';
import {animalService, visitingService} from "../_services";
import {Link} from "react-router-dom";

export class CreateVisiting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            animalId: '',
            date: '',
            time: '',
            diagnosis: '',
            analyzes: '',
            examination: '',
            medicines: '',
            items: [],
            animals: [],
            visitings: []
        };
        this.handleDoctorIdChange = this.handleDoctorIdChange.bind(this);
        this.handleAnimalIdChange = this.handleAnimalIdChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDiagnosisChange = this.handleDiagnosisChange.bind(this);
        this.handleAnalyzesChange = this.handleAnalyzesChange.bind(this);
        this.handleExaminationChange = this.handleExaminationChange.bind(this);
        this.handleMedicinesChange = this.handleMedicinesChange.bind(this);
        this.state.doctorId = this.props.match.params.id;
    }

    handleDoctorIdChange(event){
        this.setState({ doctorId: event.target.value });

    }

    handleAnimalIdChange(event){
        this.setState({ animalId: event.target.value });
        visitingService.getVisitingsByAnimalId(event.target.value)
            .then(res => res.json())
            .then(result => this.setState({visitings : result}))
    }

    handleDateChange(event){
        this.setState({ date: event.target.value });
    }

    handleTimeChange(event){
        this.setState({ time: event.target.value });
    }

    handleDiagnosisChange(event){
        this.setState({ diagnosis: event.target.value });
    }

    handleAnalyzesChange(event){
        this.setState({ analyzes: event.target.value });
    }

    handleExaminationChange(event){
        this.setState({ examination: event.target.value });
    }

    handleMedicinesChange(event){
        this.setState({ medicines: event.target.value });
    }

    componentDidMount() {
        animalService.getAll()
            .then(res => res.json())
            .then(result => this.setState({animals : result}))
    }

    render() {
        document.getElementById('menu').hidden = false
        const animals = this.state.animals;
        const visitings = this.state.visitings;
        return (
            <div className="flex-container3">
                <div className="flex-item1">
                    <div className="comment1">
                        <form onSubmit={ this.onFormSubmit }>
                            <table width="100%" cellSpacing="0" cellPadding="4">
                                <div className="form-row">
                                    <tr>
                                        <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}</td>
                                        <select id="animalId" name="theAnimalId" type="text" onChange={this.handleAnimalIdChange} value={ this.state.animalId }>
                                            <option key='0' value=''> </option>
                                            {
                                                animals.map(item =>(
                                                    <option key={item.id} value={item.id}>{' ' + item.id + ' ' + item.name}</option>
                                                ))
                                            }
                                        </select>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</td>
                                        <input id="doctorId" name="theDoctorId" type="text" value={ this.state.doctorId } readOnly={true}/>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</td>
                                        <input id="date" name="theDate" type="date" onChange={this.handleDateChange} value={ this.state.date }/>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</td>
                                        <input id="time" name="theTime" type="time" onChange={this.handleTimeChange} value={ this.state.time }/>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Діагноз': 'Diagnosis'}</td>
                                        <textarea id="diagnosis" name="theDiagnosis" onChange={this.handleDiagnosisChange} value={ this.state.diagnosis }/>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Аналізи': 'Analyzes'}</td>
                                        <textarea id="analyzes" name="theAnalyzes"  onChange={this.handleAnalyzesChange} value={ this.state.analyzes }/>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Обстеження': 'Examination'}</td>
                                        <textarea id="examination" name="theExamination"  onChange={this.handleExaminationChange} value={ this.state.examination }/>
                                    </tr>
                                    <tr><td></td></tr>
                                    <tr>
                                        <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Медикаменти': 'Medicines'}</td>
                                        <textarea id="medicines" name="theMedicines" onChange={this.handleMedicinesChange} value={ this.state.medicines }/>
                                    </tr>
                                    <tr><td height="20"></td></tr>
                                    <tr>
                                        <td align="center" height="35"><button type="submit" className='option'>{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                                        <td><Link to={`/visitings/${this.state.doctorId}`} className='option'>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                                    </tr>
                                </div>
                            </table>
                        </form>
                    </div>
                    <div className="comment2">
                        <div>
                            <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Прийоми тварини': 'Visitings of animals'}</h1></div>
                            <br></br>
                            <br></br>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>Id</th>
                                    <th style={{ width: '25%' }}>{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}</th>
                                    <th style={{ width: '25%' }}>{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</th>
                                    <th style={{ width: '30%' }}>{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</th>
                                    <th style={{ width: '10%' }}>{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</th>
                                </tr>

                                </thead>
                                <tbody>
                                {visitings.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id} </td>
                                        <td>{item.animalId}</td>
                                        <td>{item.doctorId}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time} </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    onFormSubmit(event) {
        const doctorId = event.target.doctorId.value;
        const animalId = event.target.animalId.value;
        const date = event.target.date.value;
        const time = event.target.time.value;
        const diagnosis = event.target.diagnosis.value;
        const analyzes = event.target.analyzes.value;
        const examination = event.target.examination.value;
        const medicines = event.target.medicines.value;
        let data = {
            doctorId: doctorId,
            animalId: animalId,
            date: date,
            time: time,
            diagnosis: diagnosis,
            analyzes: analyzes,
            examination: examination,
            medicines: medicines
        }

        visitingService.createVisiting(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
    };
}