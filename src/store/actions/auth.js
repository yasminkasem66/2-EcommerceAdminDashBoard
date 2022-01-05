import { axiosInstance } from "../../network";
import { authConstants } from "../types"



export const login = (userx) => async (dispatch) => {
    let res;
    try {
        dispatch({ type: authConstants.LOGIN_REQUEST })
 res = await axiosInstance.post('/admin/signin', { ...userx })
        console.log("res", res);
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
                token,
                user
            }
        })
    } catch (err) {
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: {err}
        })
    }
}



export const signOut = () => async (dispatch) => {
    let res
    try {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        res = await axiosInstance.post('/admin/signout')
        console.log("res", res);
        localStorage.clear()
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: authConstants.LOGOUT_FAILURE,
            payload: {err :res.data.error}
        })
    }
}



export const isUserLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token,
                    user
                }
            })
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { err:"failed to  login"}
            })
        }

    }
}







// export const login = (user) => {
//     console.log("user", user);
//     return async (dispatch) => {
//         dispatch({
//             type: authConstants.LOGIN_REQUEST,
//             payload: {
//               ...user
//             }
//         })
//    }
// }



// export const login = (user) => async (dispatch) => {
//     try {
//         dispatch({ type: authConstants.LOGIN_REQUEST })
//         const res = await axiosInstance.post('/admin/signin', { ...user })
//         console.log("res", res);
//         if (res.status === 200) {
//             const { token, user } = res.data;
//             localStorage.setItem('token', token);
//             localStorage.setItem('user', JSON.stringify(user));
//             dispatch({
//                 type: authConstants.LOGIN_SUCCESS,
//                 payload: {
//                     token,
//                     user
//                 }
//             })
//         } else {
//             dispatch({
//                 type: authConstants.LOGIN_FAILURE,
//                 payload: { err: res.data.error }
//             })
//         }
//     } catch (err) {
//         console.log(err);
//     }

// }