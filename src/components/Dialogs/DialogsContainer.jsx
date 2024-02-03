import React from 'react';
import s from './Dialogs.module.css';
import Dialogs from "./Dialogs";
import {
    // sendMessageCreator
    // , updateNewMessageBodyCreator,
    addNewMassages
} from "../../redux/dialogs-reducer";
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux"

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,


    }
};
// let mapDispatchToProps = (dispatch) => {
//     return {
//         SendMessageClick: () => {
//             dispatch(sendMessageCreator());
//         },
//         NewMessageChange: (e) => {
//             dispatch(updateNewMessageBodyCreator(e));
//         }
//     }
// };


export default
    compose(
        connect(mapStateToProps, {
            addNewMassages
        }),
        withAuthRedirect
    )(Dialogs);













// const DialogsContainer = (props) => {

//     let SendMessageClick = () => {
//         props.store.dispatch(sendMessageCreator());
//     }

//     let NewMessageChange = (e) => {
//         props.store.dispatch(updateNewMessageBodyCreator(e));
//     }

//     return (<Dialogs state={props.store.getState().dialogsPage} SendMessageClick={SendMessageClick} NewMessageChange={NewMessageChange} />)
// }
