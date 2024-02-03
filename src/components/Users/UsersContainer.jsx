import React from 'react';
import { connect } from "react-redux";
import {
    getUsersThunkCreator, onPageChangedThunkCreator,
    unfollowThunkCreator,
    followThunkCreator
} from "../../redux/users-reducer";
import { compose } from "redux"
import Users from './Users'
import Preloader from '../Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUser, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/users-selectors"



class UsersContainer extends React.Component {

    componentDidMount() {
        let { currentPage, pageSizepageSize } = this.props
        this.props.getUsers(currentPage, pageSizepageSize);
    }
    onPageChanged = (pageNumber) => {
        let { pageSize } = this.props
        this.props.onPageChanged(pageNumber, pageSize);
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users {...this.props} onPageChanged={this.onPageChanged}
            />
        </>
    }

}


let mapStateToProps = (state) => {
    return {
        users: getUser(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth,
    }
}


export default compose(
    connect(mapStateToProps,
        {
            getUsers: getUsersThunkCreator,
            onPageChanged: onPageChangedThunkCreator,
            follow: followThunkCreator,
            unfollow: unfollowThunkCreator,
        }),

    // withAuthRedirect
)(UsersContainer)




// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }
