import { authHeader, config } from '../_helpers';

export const servService = {
    getAll,
    getById,
    deleteService,
    createService,
    editService
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Service', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Service/' + id, requestOptions);
}

function deleteService(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Service/' + id, requestOptions);
}
function createService(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Service', requestOptions);
}

function editService(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Service/' + id, requestOptions);
}