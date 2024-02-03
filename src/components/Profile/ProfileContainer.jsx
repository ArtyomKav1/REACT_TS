import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { compose } from "redux"
import { getUserProfileThunkCreator, updateUserStatusThunkCreator, saveProfileThunkCreator, getUserStatusThunkCreator, setEditMode, savePhotoThunkCreator } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

// костыль
export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}
class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizerUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        // if (!this.props.isAuth) return <Navigate to='/login' />
        return (
            <Profile {...this.props} isOwner={!this.props.match.params.userId} />

        )
    }

}

let mapStateToProps = (state) => ({
    editMode: state.profilePage.editMode,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizerUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default
    compose(
        connect(mapStateToProps, {

            getUserProfile: getUserProfileThunkCreator,
            updateUserStatus: updateUserStatusThunkCreator,
            getUserStatus: getUserStatusThunkCreator,
            savePhoto: savePhotoThunkCreator,
            saveProfile: saveProfileThunkCreator,
            setEditMode: setEditMode
        }),
        withRouter,
        withAuthRedirect
    )(ProfileContainer)







// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, { getUserProfile: getUserProfileThunkCreator })(WithUrlDataContainerComponent);