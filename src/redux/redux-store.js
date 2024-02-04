
import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux";
import dialogsReducer from './dialogs-reducer.ts';
import sidebarReducer from './sidebar-reducer';
import profileReducer from './profile-reducer.ts';
import usersReducer from './users-reducer.ts';
import authReducer from './auth-reducer.ts';
import appReducer from './app-reducer.ts';
import { reducer as formReducer } from 'redux-form';
import { thunk as thunkMidleware } from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMidleware)));





window.store = store

export default store;