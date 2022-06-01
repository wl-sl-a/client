import { authHeader, config } from '../_helpers';

export const animalService = {
    getAll,
    getById,
    deleteAnimal,
    createAnimal,
    editAnimal,
    getAnimalsByOwnerId
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Animal', requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Animal/' + id, requestOptions);
}

function deleteAnimal(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/Animal/' + id, requestOptions);
}
function createAnimal(body){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Animal', requestOptions);
}

function editAnimal(id,body){
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(config.apiUrl + '/api/Animal/' + id, requestOptions);
}

function getAnimalsByOwnerId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Animal/owner/' + id, requestOptions);
}