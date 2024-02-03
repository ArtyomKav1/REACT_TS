import React from 'react';
import { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import ProfileDataForm from "./ProfileDataForm"




const ProfileInfo = (props) => {


    if(!props.isOwner){
        props.setEditMode(false)
    }


    // let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader />
    }
    const onMainFhotoSelector = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        // props.saveProfile(formData).then(
        //     () => {
        //         setEditMode(false);
        //     }
        // );

        props.saveProfile(formData)

    }

    return (
        <div>
            <div>
                <div className={s.descriptionBlock}>
                    {
                        props.profile.photos.large
                            ? <img alt="profile" src={props.profile.photos.large} />
                            : <img src='https://sun9-72.userapi.com/impf/c840238/v840238583/52b6/kzTRJ0aSLtE.jpg?size=284x177&quality=96&sign=df6abc68d176ea2ef5a2c837df5a6e8d&c_uniq_tag=oPJlq0TKhhtcLx8kvT4-3yTePaM8iNwZKJMPONPUYcY&type=album' />
                    }
                    {props.isOwner && <input type={"file"} onChange={onMainFhotoSelector} />}
                    <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
                </div>
            </div>
            <div>
                {props.editMode
                    ? <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} isOwner={props.isOwner} setEditMode={() => { props.setEditMode(false) }} profile={props.profile} />
                    : <ProfileData isOwner={props.isOwner} setEditMode={() => { props.setEditMode(true) }} profile={props.profile} />}

            </div>
        </div>
    )
}





const Contacts = ({ contactTitle, contactValue }) => {
    return <div>{contactTitle}:{contactValue}</div>
}
const ProfileData = (props) => {
    return <>
        {props.isOwner && <div><button onClick={props.setEditMode}>edit</button></div>}
        <div>
            <div><span>lookingForAJob:</span>{props.profile.lookingForAJob ? "YES" : "NO"}</div>
            <div><span>lookingForAJobDescription:</span>{props.profile.lookingForAJobDescription}</div>
            <div><span>fullName:</span>{props.profile.fullName}</div>
            <div><span>AboutMe:</span>{props.profile.aboutMe}</div>
            <div>
                <div>contacts:</div> {Object.keys(props.profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                })}

            </div>


        </div>
    </>
}


export default ProfileInfo;