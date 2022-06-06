import React from 'react';
import {scheduleService} from "../_services";
import {Link} from "react-router-dom";
import {history} from "../_helpers";

export class CreateSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            weekday: '',
            startTime: '',
            endTime: '',
            items: []
        };
        this.handleWeekdayChange = this.handleWeekdayChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.state.doctorId = this.props.match.params.id;
    }

    handleWeekdayChange(event){
        this.setState({ weekday: event.target.value });
    }

    handleStartTimeChange(event){
        this.setState({ startTime: event.target.value });
    }

    handleEndTimeChange(event){
        this.setState({ endTime: event.target.value });
    }

    render() {
        document.getElementById('menu').hidden = false
        return (
            <form onSubmit={ this.onFormSubmit }>
                <table width="100%" cellSpacing="0" cellPadding="4">
                    <div className="form-row">
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Лікар': 'DoctorId'}</td>
                            <input id="doctorId" name="theDoctorId" type="text" value={ this.state.doctorId } readOnly={true}/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'День тиждня': 'Weekday'}</td>
                            <input id="weekday" name="theWeekday" type="text" onChange={this.handleWeekdayChange} value={ this.state.weekday }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Початок': 'Start Time'}</td>
                            <input id="startTime" name="theStartTime" type="text" onChange={this.handleStartTimeChange} value={ this.state.startTime }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr>
                            <td align="left" height="35">{localStorage.getItem('language') == 'uk'? 'Кінець': 'End Time'}</td>
                            <input id="endTime" name="theEndTime" type="text" onChange={this.handleEndTimeChange} value={ this.state.endTime }/>
                        </tr>
                        <tr><td></td></tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                            <td align="center" height="35"><button type="submit">{localStorage.getItem('language') == 'uk'? 'Зберегти': 'Save'}</button></td>
                            <td><Link to={`/doctor/${this.state.doctorId}`}>{localStorage.getItem('language') == 'uk'? 'Вийти': 'Exit'}</Link></td>
                        </tr>
                    </div>
                </table>
            </form>
        )
    }
    onFormSubmit(event) {
        const doctorId = event.target.doctorId.value;
        const weekday = event.target.weekday.value;
        const startTime = event.target.startTime.value;
        const endTime = event.target.endTime.value;
        let data = {
            "doctorId": doctorId,
            "weekday": weekday,
            "startTime": startTime,
            "endTime": endTime
        }

        scheduleService.createSchedule(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
    };
}