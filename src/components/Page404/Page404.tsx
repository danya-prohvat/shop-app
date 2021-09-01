import React from 'react';
import styles from "./Page404.module.scss";
import classNames from 'classnames';
import {useHistory} from "react-router-dom";


const Page404: React.FC = () => {
    let history = useHistory();


    return (<div className={classNames(styles.page404)}>
            <span className={classNames(styles.page404__message)}>Page not found <br/> <span className={classNames(styles.page404__link)}>back to <a href='' onClick={() => history.push("/")}>catalog</a></span></span>
    </div>);
}

export default Page404;


