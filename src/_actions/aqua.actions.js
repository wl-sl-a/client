import {ownerService, userService} from '../_services';
import {userConstants} from "../_constants";

export const aquaActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());
        ownerService.getAll()
            .then(
                aquariums => dispatch(success(aquariums)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(aquariums) { return { type: userConstants.GETALL_SUCCESS, aquariums } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}