import { axiosInstance } from "../../network"
import { initalDataConstants, categoryConstants, productConstants } from "../types";



export const getInitialData = () => async (dispatch) => {
    let res;
    try {
        res = await axiosInstance.post('/initaldata')
        console.log(res.data);
        const { categories, products } = res.data
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
            payload: {
                categories
            }
        })
        dispatch({
            type: productConstants.GET_ALL_PRODUCT_SUCCESS,
            payload: {
                products
            }
        })
    } catch (err) {

        console.log("error", err);
    }
}