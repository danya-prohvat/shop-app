import React from 'react';
import styles from "./NavMenu.module.scss";
import classNames from 'classnames';
import shop_logo from '../../assets/imgs/shop_logo.svg';
import person from '../../assets/imgs/person.svg';
import trolley from '../../assets/imgs/trolley.svg';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NavLink} from "react-router-dom";



const NavMenu: React.FC = () => {
    const {customerData, authorized} = useTypedSelector(state => state.customerReducerPage)

    return (<div className={classNames(styles.navMenu)}>
        <div className={classNames(styles.navMenu__wrapper)}>
            <div className={classNames(styles.navMenu__logo)}>
                <img className={classNames(styles.logo__img)} src={shop_logo} alt=""/>
                <span className={classNames(styles.logo__text)}>Shop App</span>
            </div>
            <div className={classNames(styles.navMenu__customer)} >
                <div className={classNames(styles.customer__person)}>
                    <img src={person} alt=""/>
                    <span className={classNames(styles.customer__name)}>
                        {authorized ? customerData.name : <NavLink to="/authorization">Sign in</NavLink> }
                    </span>
                </div>
                <img className={classNames(styles.customer__trolley)}  src={trolley} alt=""/>
            </div>
        </div>
    </div>);
}

export default NavMenu;
