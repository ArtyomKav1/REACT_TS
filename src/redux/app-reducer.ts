import { authAPI } from "../api/api"
import { stopSubmit } from "redux-form"
import { meThunkCreator } from "./auth-reducer.ts"
const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';



export type InitialStateType = {
    initialized: boolean,
}
let initialState: InitialStateType = {
    initialized: false,
}
const appReducer = (state = initialState, action): InitialStateType => {
    switch (action.type) {
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

type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: SET_INITIALIZED_SUCCESS })

export const initializedApp = () => (dispatch) => {
    let promise = dispatch(meThunkCreator());


    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    })

}


export default appReducer;




// case SET_USER_DATA: {
//     return {
//         ...state,
//         ...action.payload,
//         isAuth: action.payload.isAuth
//     }
// }





