import { productConstants } from "../types";

const initialState = {
    err: null,
    products: [ ],
    loading: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCT_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            return state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
        case productConstants.GET_ALL_PRODUCT_FAILURE:
            return state = {
                ...initialState
            }

        default:
            return state;
    }
}