import { authConstants } from "../types";

const initialState = {
    token: null,
    user: {
      firstName:'',  
      lastName:'',  
      email:'',  
      picture:'',  
    },
    authenticate:false,
    authenticating: false,
    loading: false,
    err: null,
    msg:''
}
export default (state = initialState, action) => {
    console.log("action", action);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
           return state = {
                ...state,
               authenticating: true,
            }
        case authConstants.LOGIN_SUCCESS:
           return state = {
               ...state,
               user:action.payload.user,
               token:action.payload.token,
               authenticate: true,
               authenticating: false,
            }
        case authConstants.LOGOUT_REQUEST:
           return state = {
               ...state,
               loading: true
            }
        case authConstants.LOGOUT_SUCCESS:
           return state = {
               ...initialState
            }
        case authConstants.LOGOUT_FAILURE:
           return state = {
               ...state,
               err: action.payload.err,
               loading: false
            }
        
        default:
            return state;
    }
}