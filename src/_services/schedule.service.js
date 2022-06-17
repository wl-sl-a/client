import { authHeader, config } from '../_helpers';

export const scheduleService = {
    getAll,
    getById,
    deleteSchedule,
    createSchedule,
    editSchedule,
    getSchedulesByDoctorId,
    getDates,
    getTimes
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Schedule', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Schedule/' + id, requestOptions);
}

function deleteSchedule(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Schedule/' + id, requestOptions);
}
function createSchedule(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Schedule', requestOptions);
}

function editSchedule(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Schedule/' + id, requestOptions);
}

function getSchedulesByDoctorId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Schedule/doctor/' + id, requestOptions);
}

function getDates(doctor_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Schedule/doctor_dates/' + doctor_id, requestOptions);
}

function getTimes(doctor_id, date) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(date)
    };

    return fetch(config.apiUrl + '/api/Schedule/doctor_times/' + doctor_id, requestOptions);
}