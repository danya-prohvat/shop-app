import React from 'react';
import styles from "./SignIn.module.scss";
import classNames from 'classnames';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {ISingInFormValues} from "../../../types/authoriationTypes";
import {signInFormValidation} from "../formValidation";
import {useDispatch} from "react-redux";
import {
    signInThunk,
} from './../../../store/customer-reducer';
import formPreloader from '../../../assets/imgs/formPreloader.gif';
import {useTypedSelector} from "../../../hooks/useTypedSelector";




const SingIn: React.FC = () => {
    const dispatch = useDispatch();
    const {formData} = useTypedSelector(state => state.customerReducerPage)


    const initialValues: ISingInFormValues = {
        email: '',
        password: ''
    };

    const formSubmit = (value: ISingInFormValues): void => {
        dispatch(signInThunk(value));
    };

    return (<div className={classNames(styles.signIn)}>
        <div className={classNames(styles.signIn__wrapper)}>
            <Formik
                initialValues={initialValues}
                validate={signInFormValidation}
                onSubmit={formSubmit}>
                <Form className={classNames(styles.signIn__form)}>
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

                    <div className={classNames(styles.signIn__submit)}>
                        <button className={classNames(styles.signIn__btn)} type="submit">Sign in</button>
                        <div className={classNames(styles.signIn__status)}>
                            {formData.fetching ? <img src={formPreloader} alt=""/> : <span>{formData.error}</span>}
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>);
}


export default SingIn;
