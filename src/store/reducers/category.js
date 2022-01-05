import { categoryConstants } from "../types";

const initialState = {
    categories: [],
    loading: false,
    err: null
}
const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId == undefined) {
        return [
            ...categories, 
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []

            }
        ]
    }

    for (let cat of categories) {
        if (cat._id == parentId) {
            myCategories.push({
                ...cat, children: cat.children  ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            });
        } else {
            myCategories.push({ ...cat, children: cat.children ? buildNewCategories(parentId,cat.children, category) : [] })
            
        }
    }
    return myCategories

}
export default (state = initialState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            return state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            return state = {
                ...initialState
            }
        case categoryConstants.CREATE_CATEGORY_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case categoryConstants.CREATE_CATEGORY_SUCCESS:
            const category = action.payload.category;
            console.log("category1", category)
            const updatedcat = buildNewCategories(category.parentId ,state.categories, category)
            console.log("updatedcat", updatedcat);
            return state = {
                ...state,
                categories: updatedcat,
                loading: false
            }
        case categoryConstants.CREATE_CATEGORY_FAILURE:
            return state = {
                ...initialState
            }

        default:
            return state;
    }
}