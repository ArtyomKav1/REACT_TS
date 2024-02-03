import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Input } from "../../components/Common/FormsControl/formsControl"
import { requiredField, maxlengthCreator } from '../../utils/VALIDATORS/validators'
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { loginThunkCreator, logoutThunkCreator } from '../../redux/auth-reducer';
import s from '../Common/FormsControl/FormsControls.module.css';
const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Navigate to='/profile' />
    }
    return <>
        <h1>login</h1>
        <LoginRedxuForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </>
}



const LoginForm = (props) => {
    const maxlength30 = maxlengthCreator(30)


    return <>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input} validate={[requiredField, maxlength30]} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} type={"password"} component={Input} validate={[requiredField, maxlength30]} />
            </div>
            <div>
                <Field type="checkbox" name={'rememberMe'} component={Input} /> remember me
            </div>


            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}

        
            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl && <Field
                placeholder={'captcha'}
                name={'captcha'}
                component={Input}
                validate={[requiredField,
                    maxlength30]} />
            }


            <button>Login</button>
        </form >
    </>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,

})
const LoginRedxuForm = reduxForm({ form: 'login' })(LoginForm)
export default connect(mapStateToProps, { login: loginThunkCreator, logout: logoutThunkCreator })(Login);