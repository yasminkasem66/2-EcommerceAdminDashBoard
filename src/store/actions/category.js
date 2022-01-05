import { axiosInstance } from "../../network"
import { categoryConstants } from "../types";

export const getAllCategories = () => async (dispatch) => {
    let res;
    try {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST})
         res = await axiosInstance.get('/category')
        console.log(res.data.categoryList);
        const { categoryList} =res.data
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
            payload: {
               categories: categoryList
            }
        })
    } catch (err){
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
            payload: {
                err
            }
        })
    }
}
export const CreateCategories = (cat) => async (dispatch) => {
    let res;
    try {
        dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST})
        res = await axiosInstance.post('/category', cat)
        console.log("res", res)
        const { category } = res.data;
        console.log("category", category)
        dispatch({
            type: categoryConstants.CREATE_CATEGORY_SUCCESS,
            payload: {
              category
            }
        })
    } catch (err){
        dispatch({
            type: categoryConstants.CREATE_CATEGORY_FAILURE,
            payload: {
                err
            }
        })
    }
}




