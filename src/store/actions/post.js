import { DATA } from "../../data"
import { LOAD_POSTS } from "../reducers/types"


export const loadPosts = () => {
    return {
        type: LOAD_POSTS ,
        payload: DATA
    }
}