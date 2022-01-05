import { userConstants } from "../types";

const initialState = {
    err: null,
    msg: '',
    loading: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case userConstants.USER_REGISTER_SUCCESS:
            return state = {
                ...state,
                loading: false,
                msg:action.payload.msg
            }
        case userConstants.USER_REGISTER_FAILURE:
            return state = {
                ...state,
                loading: false,
                msg: action.payload.error
            }

        default:
            return state;
    }
}