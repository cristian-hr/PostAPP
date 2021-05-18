import axios from "axios";
import * as TYPES from "../types/index";
const { REACT_APP_BACK_URL } = process.env

export const getAllPosts = () => (

    async (dispatch) => {

        try {

            const resp = await axios.get(`${REACT_APP_BACK_URL}/post`)

            dispatch({
                type: TYPES.GET_ALL_POSTS,
                payload: resp.data
            })

        } 
        catch (error) {
            console.log(error)
        }
    }
)

export const filterPosts = (posts) => (    

    async (dispatch) => {

        try {

            dispatch({
                type: TYPES.SEARCH_POST,
                payload: posts
            })

        } 
        catch (error) {
            console.log(error)
        }
    }
)

export const addPost = (post) => (

    async (dispatch) => {

        try {

            const resp = await axios.post(`${REACT_APP_BACK_URL}/post`, post)

            dispatch({
                type: TYPES.ADD_POST,
                payload: resp.data
            })

        } 
        catch (error) {
            console.log(error)
        }
    }
)

export const deletePost = (postId) => (   

    async (dispatch) => {

        try {

            const resp = await axios.delete(`${REACT_APP_BACK_URL}/post`, {data: {id:postId}})             

            dispatch({
                type: TYPES.DELETE_POST,
                payload: resp.data
            });

            //dispatch para borrar el post en el estado de redux de allPosts
            dispatch({
                type: TYPES.DELETE_ALL_POSTS,
                payload: postId
            })

            //dispatch para borrar el post en el estado de redux de searchByName
            dispatch({
                type: TYPES.DELETE_SEARCH_POST,
                payload: postId
            })
            
        } 
        catch (error) {
            console.log(error)
        }
    }
)

export const emptyDeletedPost = () => (

    async (dispatch) => {

        try {

            dispatch({
                type: TYPES.RESET_DELETED_POST,
            })

        } 
        catch (error) {
            console.log(error)
        }
    }
)

export const orderByDate = (order) => (

    async (dispatch) => {

        try {

            dispatch({
                type: TYPES.ORDER_POST_BY_DATE,
                payload: order
            })

        } 
        catch (error) {
            console.log(error)
        }
    }
)
