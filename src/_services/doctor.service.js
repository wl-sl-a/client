import { authHeader, config } from '../_helpers';

export const doctorService = {
    getAll,
    getById,
    deleteDoctor,
    createDoctor,
    editDoctor,
    searchDoctor
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Doctor', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Doctor/' + id, requestOptions);
}

function deleteDoctor(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Doctor/' + id, requestOptions);
}
function createDoctor(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Doctor', requestOptions);
}

function editDoctor(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Doctor/' + id, requestOptions);
}

function searchDoctor(param) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Doctor/search/' + param, requestOptions);
}