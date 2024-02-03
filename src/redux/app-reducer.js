import { authAPI } from "../api/api"
import { stopSubmit } from "redux-form"
import { meThunkCreator } from "./auth-reducer"


// const SET_USER_DATA = 'SET_USER_DATA';
const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';






let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        // case SET_USER_DATA: {
        //     return {
        //         ...state,
        //         ...action.payload,
        //         isAuth: action.payload.isAuth
        //     }
        // }
        case SET_INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state;
    }


}


export const initializedSuccess = () => ({ type: SET_INITIALIZED_SUCCESS })

export const initializedApp = () => (dispatch) => {
    let promise = dispatch(meThunkCreator());


    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })

}


export default appReducer;





