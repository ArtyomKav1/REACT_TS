const ADD_NEW_MESSAGES = 'ADD_NEW_MESSAGES';


let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ],
}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_MESSAGES: {
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.body }]
            }
        }
        default:
            return state;
    }
}


export const addNewMassages = (body) => ({ type: ADD_NEW_MESSAGES, body })

export default dialogsReducer;





// case UPDATE_NEW_MESSAGE_BODY: {
//     return{
//         ...state,
//         newMessageBody: action.body
//     }
// let stateCopy = { ...state }
// stateCopy.newMessageBody = action.body;
// return stateCopy;
// }
// case SEND_MESSAGE: {
//     let body = state.newMessageBody;
//     return{
//         ...state,
//         newMessageBody: '',
//         messages: [...state.messages, { id: 6, message: body }]
//     }

// let stateCopy = { ...state }
// stateCopy.newMessageBody = '';
// stateCopy.messages = [...state.messages, { id: 6, message: body }]
// return stateCopy;
// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
// const SEND_MESSAGE = 'SEND_MESSAGE';

// export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
// export const updateNewMessageBodyCreator = (body) =>
//     ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })
