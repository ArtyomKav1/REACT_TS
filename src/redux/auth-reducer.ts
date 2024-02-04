import { authAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"


const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"








export type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null

}

const authReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                isAuth: action.payload.isAuth
            }
        }
        case SET_CAPTCHA_URL: {

            return {

                ...state,
                captchaUrl: action.captchaUrl
            }
        }

        default:
            return state;
    }


}








type payload = {
    userId: number | null, email: string | null, login: string | null, isAuth: boolean | null
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: payload

}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean ): SetAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })









export const meThunkCreator = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }

}
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(meThunkCreator());
    } else {
        if (response.data.resultCode === 10) {

            dispatch(getCaptchaThunkCreator());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }));
    };
}




type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string
}
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: SET_CAPTCHA_URL, captchaUrl })






export const getCaptchaThunkCreator = () => async (dispatch) => {

    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url

    dispatch(setCaptchaUrl(captchaUrl))

}
export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;