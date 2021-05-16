import * as TYPES from "../types/index"

const initalState = {
    allPosts: [],
    searchByName: [],
    deletedPost: [],
    deleteStatus: false,
};

function rootReducer ( state = initalState, action) {

    switch (action.type) {

        case TYPES.GET_ALL_POSTS:
            return {
                ...state, 
                allPosts: action.payload
            }

        case TYPES.SEARCH_POST:
            return {
                ...state,
                searchByName: action.payload
            }
        
        case TYPES.DELETE_SEARCH_POST:
            let newSearchPosts = state.searchByName.filter(post => post.id !== action.payload)
            return {
                ...state,
                searchByName: newSearchPosts
            }

        case TYPES.ADD_POST:
            state.allPosts.push(action.payload)
            return state            

        case TYPES.DELETE_POST:
             return {
                ...state,
                deletedPost: action.payload,
                deleteStatus: true
            }
        
        case TYPES.RESET_SEARCH_POST:
            return {
                ...state,
                searchByName: action.payload
            }

        case TYPES.RESET_DELETED_POST:
            return {
                ...state,
                deletedPost: action.payload,
                deleteStatus: false,
            }

        default:
            return state;      
    }

}

export default rootReducer;