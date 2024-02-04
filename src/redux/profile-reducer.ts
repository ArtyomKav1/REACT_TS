import { userAPI, profileAPI } from "../api/api"
import { stopSubmit } from "redux-form"


const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_PHOTO = 'SET_PHOTO'
const SET_EDIT_MODE = "SET_EDIT_MODE"
const DELETE_POST = "DELETE_POST"
type PostsType = {
    id: number
    message: string
    likesCount: number
}


type PhotosType = {
    small: string | null
    large: string | null
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}



let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Its my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ] as Array<PostsType>,

    profile: null as ProfileType | null,
    status: '' as string,
    editMode: false as boolean,
}


export type InitialStateType = typeof initialState



const profileReducer = (state = initialState, action): InitialStateType => {
    switch (action.type) {
        case ADD_NEW_POST: {
            let newPost = {
                id: 5,
                message: action.textPost,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],

            }
        }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_STATUS: {
            return { ...state, status: action.status }
        }
        case SET_PHOTO: {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        case SET_EDIT_MODE: {
            return { ...state, editMode: action.result }
        }

        default:
            return state;
    }
}


type AddNewPostActionType = {
    type: typeof ADD_NEW_POST
    textPost: string
}
export const addNewPost = (textPost: string): AddNewPostActionType => ({ type: ADD_NEW_POST, textPost })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status })



type SetPhotoActionType = {
    type: typeof SET_PHOTO
    photos: PhotosType
}
export const setPhoto = (photos: PhotosType): SetPhotoActionType => ({ type: SET_PHOTO, photos })

type SetEditModeActionType = {
    type: typeof SET_EDIT_MODE
    result: boolean
}
export const setEditMode = (result: boolean): SetEditModeActionType => ({ type: SET_EDIT_MODE, result })



type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId })








type GetUserProfileThunkCreatorType = {

}

export const getUserProfileThunkCreator = (userId: number) => async (dispatch) => {
    let response = await userAPI.getProfileAPI(userId)
    dispatch(setUserProfile(response.data));
}

type GetUserStatusThunkCreatorType = {

}
export const getUserStatusThunkCreator = (userId: number) => async (dispatch) => {
    let response = await profileAPI.getStatusAPI(userId)
    dispatch(setUserStatus(response.data));
}

type UpdateUserStatusThunkCreatorType = {

}
export const updateUserStatusThunkCreator = (status: string) => async (dispatch) => {
    let response = await profileAPI.updateStatusAPI(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}








type SavePhotoThunkCreatorType = {

}
export const savePhotoThunkCreator = (file: any) => async (dispatch) => {
    let response = await profileAPI.savePhotoAPI(file)
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos));
    }
}




type SaveProfileThunkCreatorType = {

}
export const saveProfileThunkCreator = (profileData: ProfileType) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.updateProfileAPI(profileData)
    if (response.data.resultCode === 0) {
        dispatch(setEditMode(false))
        dispatch(getUserProfileThunkCreator(userId))
    } else {
        // dispatch(stopSubmit("ProfileDataForm", { "contacts": { "facebook": response.data.messages[0] } }))
        dispatch(stopSubmit("ProfileDataForm", { _error: response.data.messages[0] }));
    }
}
export default profileReducer;






// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// export const addPostActionCreator = () => ({ type: ADD_POST })
// export const updateNewPostTextActionCreator = (text) =>
//     ({ type: UPDATE_NEW_POST_TEXT, newText: text })

// case ADD_POST: {
//     let newPost = {
//         id: 5,
//         message: state.newPostText,
//         likesCount: 0
//     };
//     return {
//         ...state,
//         posts: [...state.posts, newPost],
//         newPostText: '',
//     }
// let stateCopy = { ...state }
// stateCopy.posts = [...state.posts]
// stateCopy.posts.push(newPost);
// stateCopy.newPostText = '';
// return stateCopy;
// }
// case UPDATE_NEW_POST_TEXT: {
//     return {
//         ...state,
//         newPostText: action.newText,
//     }
// let stateCopy = { ...state }
// stateCopy.newPostText = action.newText;
// return stateCopy;
// }