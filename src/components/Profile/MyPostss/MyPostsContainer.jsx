import React from 'react';

import {
    // addPostActionCreator, updateNewPostTextActionCreator, 
    addNewPost
} from "../../../redux/profile-reducer";
import MyPosts from './MyPosts';
import { connect } from 'react-redux'


// const MyPostsContainer = (props) => {

//     let addPost = () => {
//         props.store.dispatch(addPostActionCreator());
//     }

//     let onPostChange = (text) => {
//         props.store.dispatch(updateNewPostTextActionCreator(text));
//     }


//     return (<MyPosts posts={props.store.getState().profilePage.posts} addPost = {addPost} updateNewPostText = {onPostChange} />)
// }




let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }

}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addNewPost: () => {
//             dispatch(addPostActionCreator());
//         },
//         updateNewPostText: (text) => {
//             dispatch(updateNewPostTextActionCreator(text));
//         }
//     }
// }



const MyPostsContainer = connect(mapStateToProps, {
    addNewPost
})(MyPosts);

export default MyPostsContainer;