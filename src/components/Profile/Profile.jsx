import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPostss/MyPostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = (props) => {

    return (
        <div>
            <ProfileInfo editMode={props.editMode} setEditMode={props.setEditMode} saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;