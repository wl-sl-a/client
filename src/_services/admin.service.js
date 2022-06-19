import { authHeader, config } from '../_helpers';

export const adminService = {
    getRole,
    getSsl,
    getBackup,
    getRestore
};

function getRole() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Admin/getRole', requestOptions);
}

function getSsl() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Admin/ssl', requestOptions);
}

function getBackup() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Admin/backup', requestOptions);
}

function getRestore(file) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/Admin/restore/'+file, requestOptions);
}