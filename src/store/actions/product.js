import { axiosInstance } from "../../network"
import { productConstants } from "../types";

// export const getAllCategories = () => async (dispatch) => {
//     let res;
//     try {
//         dispatch({ type: productConstants.GET_ALL_CATEGORY_REQUEST })
//         res = await axiosInstance.get('/category')
//         console.log(res.data.categoryList);
//         const { categoryList } = res.data
//         dispatch({
//             type: productConstants.GET_ALL_CATEGORY_SUCCESS,
//             payload: {
//                 categories: categoryList
//             }
//         })
//     } catch (err) {
//         dispatch({
//             type: productConstants.GET_ALL_CATEGORY_FAILURE,
//             payload: {
//                 err
//             }
//         })
//     }
// }
export const CreateProducts = (prd) => async (dispatch) => {
    let res;
    try {
        dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST })
        res = await axiosInstance.post('/product', prd)
        console.log("res", res)
        const { product } = res.data;
        console.log("product", product)
        dispatch({
            type: productConstants.CREATE_PRODUCT_SUCCESS,
            payload: {
                product
            }
        })
    } catch (err) {
        dispatch({
            type: productConstants.CREATE_PRODUCT_FAILURE,
            payload: {
                err
            }
        })
    }
}