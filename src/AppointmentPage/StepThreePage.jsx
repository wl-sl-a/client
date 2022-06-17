import React from 'react';
import { Link } from 'react-router-dom';
import {appointmentService, ownerService, scheduleService} from "../_services";

class StepThreePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            times: [],
            animal_id: this.props.match.params.aid,
            doctor_id: this.props.match.params.did,
            service_id: this.props.match.params.sid,
            date: '',
            time: ''
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    handleDateChange(event){
        this.setState({ date: event.target.value });
        scheduleService.getTimes(this.state.doctor_id, event.target.value)
            .then(res => res.json())
            .then(result => this.setState({times : result}))
        scheduleService.getTimes(this.state.doctor_id, event.target.value)
            .then(res => res.json())
            .then(result => this.setState({times : result}))
    }

    handleTimeChange(event){
        this.setState({ time: event.target.value });
    }

    componentDidMount() {
        scheduleService.getDates(this.state.doctor_id)
            .then(res => res.json())
            .then(result => this.setState({dates : result}))
    }

    render() {
        document.getElementById('doctors').className = 'active'
        const dates = this.state.dates;
        const times = this.state.times;
        return (
            <div>
                <div className="zag"><h1>{localStorage.getItem('language') == 'uk'? 'Крок 3. Оберіть дату та час': 'Step 3. Choose date and time'}</h1></div>
                <br></br>
                <h3>{localStorage.getItem('language') == 'uk'? 'Тварина № ': 'Animal # '} {this.state.animal_id}</h3>
                <h3>{localStorage.getItem('language') == 'uk'? 'Лікар № ': 'Doctor # '} {this.state.doctor_id}</h3>
                <h3>{localStorage.getItem('language') == 'uk'? 'Послуга № ': 'Service # '} {this.state.service_id}</h3>
                <br></br>
                <form onSubmit={ this.onFormSubmit } >
                    <h2>{localStorage.getItem('language') == 'uk'? 'Оберіть дату: ': 'Choose date: '}</h2>
                    <input id="aid" name="theAnimal" type="text" value={ this.state.animal_id } hidden={true}/>
                    <input id="did" name="theDoctor" type="text" value={ this.state.doctor_id } hidden={true}/>
                    <input id="sid" name="theService" type="text" value={ this.state.service_id } hidden={true} />
                    <select id="date" name="theDate" type="text" onChange={this.handleDateChange} value={ this.state.date }>
                        {
                            dates.map(item =>(
                                <option key={item} value={item}>{item}</option>
                            ))
                        }
                    </select>
                    <br></br>
                    <br></br>
                    <h2>{localStorage.getItem('language') == 'uk'? 'Оберіть час: ': 'Choose time: '}</h2>
                    <select id="time" name="theTime" type="text" onChange={this.handleTimeChange} value={ this.state.time }>
                        {
                            times.map(item =>(
                                <option key={item} value={item}>{item}</option>
                            ))
                        }
                    </select>
                    <br></br>
                    <br></br>
                    <button type="submit" className='option'>{localStorage.getItem('language') == 'uk'? 'Записатися': 'Name appointment'}</button>
                </form>
            </div>
        )
    }
    onFormSubmit(event) {
        const animalId = event.target.aid.value;
        const doctorId = event.target.did.value;
        const date = event.target.date.value;
        const time = event.target.time.value;
        const serviceId = event.target.sid.value;
        let data = {
            "animalId": Number(animalId),
            "doctorId": Number(doctorId),
            "date": date,
            "time": time,
            "serviceId": Number(serviceId),
            "status": "confirmed"
        }

        appointmentService.createAppointment(data)
            .then(res => res.json())
            .then(result => data = result)
            .catch((error) => console.log( error.response.request._response ) );
    };
}

export { StepThreePage };