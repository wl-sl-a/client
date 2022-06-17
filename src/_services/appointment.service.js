import { authHeader, config } from '../_helpers';

export const appointmentService = {
    getAll,
    getById,
    deleteAppointment,
    createAppointment,
    editAppointment,
    getAppointmentsByAnimalId,
    getAppointmentsByDoctorId,
    getAppointmentsByDate,
    getWorkloadByDate
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Appointment', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Appointment/' + id, requestOptions);
}

function deleteAppointment(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Appointment/' + id, requestOptions);
}
function createAppointment(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Appointment', requestOptions);
}

function editAppointment(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Appointment/' + id, requestOptions);
}

function getAppointmentsByDoctorId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Appointment/doctor/' + id, requestOptions);
}

function getAppointmentsByAnimalId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Appointment/animal/' + id, requestOptions);
}

function getAppointmentsByDate(doctor_id, date) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(date)
    };

    return fetch(config.apiUrl + '/api/Appointment/app_dates/' + doctor_id, requestOptions);
}

function getWorkloadByDate(doctor_id, date) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(date)
    };

    return fetch(config.apiUrl + '/api/Appointment/workload/' + doctor_id, requestOptions);
}