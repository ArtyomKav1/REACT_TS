import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from 'redux-form'
import { requiredField, maxlengthCreator } from '../../utils/VALIDATORS/validators'
import {Textarea} from "../../components/Common/FormsControl/formsControl"






const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} />);
    // let newMessageBody = props.dialogsPage.newMessageBody;


    // let onSendMessageClick = () => {
    //     props.SendMessageClick();
    // }

    // let onNewMessageChange = (e) => {
    //     let body = e.target.value;
    //     props.NewMessageChange(body);
    // }


    const onSubmit = (formData) => {
        props.addNewMassages(formData.textMessages)

    }




    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <DialogsReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}

const DialogsForm = (props) => {
    const maxlength100 = maxlengthCreator(100)
    return (
        <>

            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea} name={'textMessages'} validate={[requiredField, maxlength100]} placeholder='Enter your message' />
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>

        </>


    )
}
const DialogsReduxForm = reduxForm({ form: 'dialogForm' })(DialogsForm)

export default Dialogs;