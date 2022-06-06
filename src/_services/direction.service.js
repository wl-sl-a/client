import { authHeader, config } from '../_helpers';

export const directionService = {
    getAll,
    getById,
    deleteDirection,
    createDirection,
    editDirection,
    getDirectionsByAnimalId,
    getDirectionsByVisitingId
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Direction', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Direction/' + id, requestOptions);
}

function deleteDirection(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Direction/' + id, requestOptions);
}
function createDirection(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Direction', requestOptions);
}

function editDirection(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Direction/' + id, requestOptions);
}

function getDirectionsByAnimalId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Direction/animal/' + id, requestOptions);
}

function getDirectionsByVisitingId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Direction/visiting/' + id, requestOptions);
}