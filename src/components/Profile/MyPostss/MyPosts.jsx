
import React from 'react';
import { memo } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form'
import { requiredField, maxlengthCreator } from '../../../utils/VALIDATORS/validators'
import { Textarea } from "../../Common/FormsControl/formsControl"



const MyPosts = memo( (props) => {

    let postsElements = props.posts.map(p => <Post
        message={p.message} likesCount={p.likesCount} />);
    const onSubmit = (formData) => {
        props.addNewPost(formData.textPost)
    }


    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <MyPostsReduForm onSubmit={onSubmit} />
            <div className={s.posts}>
                {postsElements}
            </div>


        </div>
    )
});


const MyPostsForm = (props) => {

    const maxlength10 = maxlengthCreator(10)
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Textarea} name={'textPost'}
                        validate={[requiredField, maxlength10]} placeholder="Post Messange" />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </>
    )
}




const MyPostsReduForm = reduxForm({ form: 'post' })(MyPostsForm)

export default MyPosts;





















































// let newPostElement = React.createRef();
// let addPost = () => {
//     props.addNewPost();
// }
// let onPostChange = () => {
//     let text = newPostElement.current.value;
//     props.updateNewPostText(text);
// }