import React from 'react';
import styles from "./SignUp.module.scss";
import classNames from 'classnames';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {ISingUpFormValues} from "../../../types/authorizationTypes";
import {signUpFormValidation} from "../../../utils/formValidation";
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

    return (<div className={classNames(styles.signUp)}>
        <div className={classNames(styles.signUp__wrapper)}>
            <Formik
                initialValues={initialValues}
                validate={signUpFormValidation}
                onSubmit={formSubmit}>
                <Form className={classNames(styles.signUp__form)}>
                    <div className={classNames(styles.signUp__filed)}>
                        <label className={classNames(styles.signUp__label)} htmlFor="name">Your name: </label>
                        <Field className={classNames(styles.signUp__input)} id="name" name="name" type="text"
                               placeholder="Name"/>
                        <ErrorMessage className={classNames(styles.signUp__error)} component="div" name="name"/>
                    </div>

                    <div className={classNames(styles.signUp__filed)}>
                        <label className={classNames(styles.signUp__label)} htmlFor="email">Your email: </label>
                        <Field className={classNames(styles.signUp__input)} id="email" name="email" type="email"
                               placeholder="Email"/>
                        <ErrorMessage className={classNames(styles.signUp__error)} component="div" name="email"/>
                    </div>

                    <div className={classNames(styles.signUp__filed)}>
                        <label className={classNames(styles.signUp__label)} htmlFor="password">Your password: </label>
                        <Field className={classNames(styles.signUp__input)} id="password" name="password"
                               type="password" placeholder="Password"/>
                        <ErrorMessage className={classNames(styles.signUp__error)} component="div" name="password"/>
                    </div>

                    <div className={classNames(styles.signUp__filed)}>
                        <label className={classNames(styles.signUp__label)} htmlFor="repeatPassword">Repeat your password: </label>
                        <Field className={classNames(styles.signUp__input)} id="repeatPassword" name="repeatPassword"
                               type="password" placeholder="Password"/>
                        <ErrorMessage className={classNames(styles.signUp__error)} component="div" name="password"/>
                    </div>

                    <div className={classNames(styles.signUp__submit)}>
                        <button className={classNames(styles.signUp__btn)} type="submit">Sign up</button>
                        <div className={classNames(styles.signUp__status)}>
                            {formData.fetching ? <img src={formPreloader} alt=""/> : <span>{formData.error}</span>}
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>);
}


export default SignUp;
