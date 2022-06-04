import { authHeader, config } from '../_helpers';

export const scheduleService = {
    getAll,
    getById,
    deleteSchedule,
    createSchedule,
    editSchedule,
    getSchedulesByDoctorId
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