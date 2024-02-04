import { userAPI } from "../api/api"

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

type PhotosType = {
    small: string | null
    large: string | null
}

type UsersType = {
    name: string,
    id: number,
    photos: PhotosType
    status: string,
    followed: boolean
}
type FollowingInProgressType = {
    id: number
}

type InitialStateType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<FollowingInProgressType>,
}




let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    followingInProgress: [],
};








const usersReducer = (state = initialState, action): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}







type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId })


type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): UnfollowActionType => ({ type: UNFOLLOW, userId })


type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users })


type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })


type SetUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountActionType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })















export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch) => {

    dispatch(toggleIsFetching(true));
    let response = await userAPI.getUsersAPI(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setUsersTotalCount(response.data.totalCount));

}

export const onPageChangedThunkCreator = (pageNumber: number, pageSize: number) => async (dispatch) => {

    dispatch(setCurrentPage(pageNumber));
    dispatch(toggleIsFetching(true))
    let response = await userAPI.retGetUsersAPI(pageNumber, pageSize);
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items));

}

export const followThunkCreator = (userId: number) => async (dispatch) => {

    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await userAPI.followAPI(userId)
    if (response.data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));

}

export const unfollowThunkCreator = (userId: number) => async (dispatch) => {

    dispatch(toggleIsFollowingProgress(true, userId));

    let response = await userAPI.unfollowAPI(userId);
    if (response.data.resultCode === 0) {
        dispatch(unfollow(userId));
    }

    dispatch(toggleIsFollowingProgress(false, userId));
}

export default usersReducer;