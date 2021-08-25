import React, {useState} from 'react';
import styles from "./Authorization.module.scss";
import classNames from 'classnames';
import {Formik} from 'formik';
import SingIn from "./SingIn/SingIn";
import SingUp from "./SingUp/SingUp";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";


const Authorization: React.FC = () => {
    const [authorizationMethod, setAuthorizationMethod] = useState<boolean>(true)
    const {authorized} = useTypedSelector(state => state.customerReducerPage)

    if (authorized) return <Redirect to="/"/>

    const authorizationMethodOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget.id === 'Sign in') setAuthorizationMethod(true);
        else setAuthorizationMethod(false);
    }

    return (<div className={classNames(styles.authorization)}>
        <div className={classNames(styles.authorization__wrapper)}>
            <div className={classNames(styles.authorization__form)}>
                <div className={classNames(styles.authorization__chooseMethod)}>
                    <div id="Sign in" onClick={authorizationMethodOnClick}
                         className={classNames(styles.authorization__method, {[styles.authorization__method_active]: authorizationMethod}, styles.authorization__signIn)}>
                        <span>Sign in</span>
                    </div>

                    <div id="Sign up" onClick={authorizationMethodOnClick}
                         className={classNames(styles.authorization__method, {[styles.authorization__method_active]: !authorizationMethod}, styles.authorization__signIn)}>
                        <span>Sign up</span>
                    </div>
                </div>
                {authorizationMethod ? <SingIn/> : <SingUp/>}
            </div>
        </div>
    </div>);
}


export default Authorization;
