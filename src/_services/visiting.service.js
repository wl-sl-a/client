import { authHeader, config } from '../_helpers';

export const visitingService = {
    getAll,
    getById,
    deleteVisiting,
    createVisiting,
    editVisiting,
    getVisitingsByAnimalId,
    getVisitingsByDoctorId,
    printVisiting
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Visiting', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Visiting/' + id, requestOptions);
}

function deleteVisiting(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Visiting/' + id, requestOptions);
}
function createVisiting(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Visiting', requestOptions);
}

function editVisiting(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Visiting/' + id, requestOptions);
}

function getVisitingsByDoctorId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Visiting/doctor/' + id, requestOptions);
}

function getVisitingsByAnimalId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Visiting/animal/' + id, requestOptions);
}

function printVisiting(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Print/visiting/' + id, requestOptions);
}