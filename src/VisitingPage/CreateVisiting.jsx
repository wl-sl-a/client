import React from 'react';
import {visitingService} from "../_services";
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
            items: []
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

    render() {
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Тварина': 'Animal Id'}</td>
                            <input id="animalId" name="theAnimalId" type="text" onChange={this.handleAnimalIdChange} value={ this.state.animalId }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35" width="120">{localStorage.getItem('language') == 'uk'? 'Лікар': 'Doctor Id'}</td>
                            <input id="doctorId" name="theDoctorId" type="text" value={ this.state.doctorId } readOnly={true}/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Дата': 'Date'}</td>
                            <input id="date" name="theDate" type="text" onChange={this.handleDateChange} value={ this.state.date }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Час': 'Time'}</td>
                            <input id="time" name="theTime" type="text" onChange={this.handleTimeChange} value={ this.state.time }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Діагноз': 'Diagnosis'}</td>
                            <input id="diagnosis" name="theDiagnosis" type="text" onChange={this.handleDiagnosisChange} value={ this.state.diagnosis }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Аналізи': 'Analyzes'}</td>
                            <input id="analyzes" name="theAnalyzes" type="text" onChange={this.handleAnalyzesChange} value={ this.state.analyzes }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Обстеження': 'Examination'}</td>
                            <input id="examination" name="theExamination" type="text" onChange={this.handleExaminationChange} value={ this.state.examination }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Медикаменти': 'Medicines'}</td>
                            <input id="medicines" name="theMedicines" type="text" onChange={this.handleMedicinesChange} value={ this.state.medicines }/>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to={`/visitings/${this.state.doctorId}`}>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
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