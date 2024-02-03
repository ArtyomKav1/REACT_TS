import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Input } from "../../Common/FormsControl/formsControl"

import s from '../../Common/FormsControl/FormsControls.module.css';

const DataForm = (props) => {
    return <>

        {props.isOwner && <div><button onClick={props.setEditMode}>back</button></div>}
        <form onSubmit={props.handleSubmit}>
            {props.isOwner && <div><button >save</button></div>}
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>
            }

            <div>
                <div><span>fullName:</span><Field placeholder={'fullName'} name={'fullName'} component={Input} /></div>
                <div><span>lookingForAJob:</span> <Field type="checkbox" name={'lookingForAJob'} component={Input} /></div>
                <div><span>lookingForAJobDescription:</span><Field placeholder={'lookingForAJobDescription'} name={'lookingForAJobDescription'} component={Input} /></div>
                <div><span>AboutMe:</span><Field placeholder={'AboutMe'} name={'AboutMe'} component={Input} /></div>
                <div>
                    <div>contacts:</div> {Object.keys(props.profile.contacts).map(key => { return <div key={key}><Field placeholder={key} name={'contacts.' + key} component={Input} /></div> })}
                </div>
            </div>

        </form>
    </>
}


const ProfileDataForm = reduxForm({ form: 'ProfileDataForm' })(DataForm)
export default ProfileDataForm;