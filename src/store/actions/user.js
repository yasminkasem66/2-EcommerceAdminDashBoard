
import { axiosInstance } from "../../network";
import { userConstants } from "../types"

export const signUp = (userx) => async (dispatch) => {
    let res;
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST })
        res = await axiosInstance.post('/admin/signup', { ...userx })
        // console.log("res", res);
        const { msg } = res.data;
        // console.log("msg", msg);
        dispatch({
            type: userConstants.USER_REGISTER_SUCCESS,
            payload: { msg}
        })
    } catch (err) {
        dispatch({
            type: userConstants.USER_REGISTER_FAILURE,
            payload: { error: res.data.error }

            // payload: { err }
        })
    }
}