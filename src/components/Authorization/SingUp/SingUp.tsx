import React from 'react';
import styles from "./SignUp.module.scss";
import classNames from 'classnames';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {ISingUpFormValues} from "../../../types/authoriationTypes";
import {signUpFormValidation} from "../formValidation";
import {useDispatch} from "react-redux";
import {
    signUpThunk,
} from './../../../store/customer-reducer';
import formPreloader from '../../../assets/imgs/formPreloader.gif';
import {useTypedSelector} from "../../../hooks/useTypedSelector";




const SignUp: React.FC = () => {
    const dispatch = useDispatch();
    const {formData} = useTypedSelector(state => state.customerReducerPage)


    const initialValues: ISingUpFormValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    const formSubmit = (value: ISingUpFormValues): void => {
        dispatch(signUpThunk(value));
    };

    return (<div className={classNames(styles.signIn)}>
        <div className={classNames(styles.signIn__wrapper)}>
            <Formik
                initialValues={initialValues}
                validate={signUpFormValidation}
                onSubmit={formSubmit}>
                <Form className={classNames(styles.signIn__form)}>
                    <div className={classNames(styles.signIn__filed)}>
                        <label className={classNames(styles.signIn__label)} htmlFor="name">Your email: </label>
                        <Field className={classNames(styles.signIn__input)} id="name" name="name" type="text"
                               placeholder="Name"/>
                        <ErrorMessage className={classNames(styles.signIn__error)} component="div" name="name"/>
                    </div>

                    <div className={classNames(styles.signIn__filed)}>
                        <label className={classNames(styles.signIn__label)} htmlFor="email">Your email: </label>
                        <Field className={classNames(styles.signIn__input)} id="email" name="email" type="email"
                               placeholder="Email"/>
                        <ErrorMessage className={classNames(styles.signIn__error)} component="div" name="email"/>
                    </div>

                    <div className={classNames(styles.signIn__filed)}>
                        <label className={classNames(styles.signIn__label)} htmlFor="password">Your password: </label>
                        <Field className={classNames(styles.signIn__input)} id="password" name="password"
                               type="password" placeholder="Password"/>
                        <ErrorMessage className={classNames(styles.signIn__error)} component="div" name="password"/>
                    </div>

                    <div className={classNames(styles.signIn__filed)}>
                        <label className={classNames(styles.signIn__label)} htmlFor="repeatPassword">Repeat your password: </label>
                        <Field className={classNames(styles.signIn__input)} id="repeatPassword" name="repeatPassword"
                               type="password" placeholder="Password"/>
                        <ErrorMessage className={classNames(styles.signIn__error)} component="div" name="password"/>
                    </div>

                    <div className={classNames(styles.signIn__submit)}>
                        <button className={classNames(styles.signIn__btn)} type="submit">Sign up</button>
                        <div className={classNames(styles.signIn__status)}>
                            {formData.fetching ? <img src={formPreloader} alt=""/> : <span>{formData.error}</span>}
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>);
}


export default SignUp;
