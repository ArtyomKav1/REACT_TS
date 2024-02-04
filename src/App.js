import './App.css';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer'
import {HashRouter, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import { initializedApp } from "./redux/app-reducer.ts"
import { compose } from "redux"
import { connect } from "react-redux";
import Preloader from './components/Preloader/Preloader';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/redux-store";
import { Suspense } from 'react';
import { withRouter } from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer, { withRouter } from './components/Profile/ProfileContainer';




class App extends React.Component {
  componentDidMount() {
    this.props.initializedApp();
  }


  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }


    return (
      <div className='app-wrapper'>
        {/* {console.log(props.state)} */}
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs' element={
              <Suspense fallback={"Loading"}>
                <DialogsContainer />
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={"Loading"}>
                <ProfileContainer />
              </Suspense>
            }>
              <Route path=":userId" element={
                <Suspense fallback={"Loading"}>
                  <ProfileContainer />
                </Suspense>} />
            </Route>
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </div>
      </div >
    )
  }

}


const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


let AppContainer = compose(
  connect(mapStateToProps, { initializedApp }),
  withRouter
)(App)

let MainAPP = (props) => {
  return <React.StrictMode>
    <HashRouter >
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>;
  </React.StrictMode>
}
//
export default MainAPP