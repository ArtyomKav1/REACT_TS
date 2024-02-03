import React, { useState, useEffect } from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateMode = () => {
        setEditMode(true)
    }
    const detivateMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateMode}>{props.status || "-------"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} onBlur={detivateMode} autoFocus={true}
                        value={status} />
                </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;