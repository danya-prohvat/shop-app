import React, {useState} from 'react';
import styles from "./NavMenu.module.scss";
import classNames from 'classnames';
import shop_logo from '../../assets/imgs/shop_logo.svg';
import person from '../../assets/imgs/person.svg';
import trolley from '../../assets/imgs/trolley.svg';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NavLink, useHistory} from "react-router-dom";
import TrolleyPopUp from "../TrolleyPopUp/TrolleyPopUp";
import {ISingInFormValues} from "../../types/authorizationTypes";
import {signInThunk} from "../../store/customer-reducer";


const NavMenu: React.FC = () => {
    const {customerData, authorized} = useTypedSelector(state => state.customerReducerPage)
    let history = useHistory();
    const [popupSeen, setPopupSeen] = useState(false);


    const showPopUp = (): void => {
        setPopupSeen(true);
        document.body.style.overflow = "hidden"
    };

    const closePopUp = (event:any): void => {
        if (event.target.id === 'close' || event.target.id === 'popup') {
            setPopupSeen(false);
            document.body.style.overflow = ""
        }
    };

    return (<div className={classNames(styles.navMenu)}>
        <div className={classNames(styles.navMenu__wrapper)}>
            <div className={classNames(styles.navMenu__logo)}>
                <img className={classNames(styles.logo__img)} src={shop_logo} alt=""/>
                <span className={classNames(styles.logo__text)} onClick={() => history.push("/")}>Shop App</span>
            </div>
            <div className={classNames(styles.navMenu__customer)}>
                <div className={classNames(styles.customer__person)}>
                    <img src={person} alt=""/>
                    <span className={classNames(styles.customer__name)}>
                        {authorized ? customerData.name : <NavLink to="/authorization">Sign in</NavLink>}
                    </span>
                </div>
                <div onClick={showPopUp} className={classNames(styles.customer__trolley)}>
                    <span className={classNames(styles.customer__itemsInCartCount)}>0</span>
                    <img src={trolley} alt=""/>
                </div>
            </div>
        </div>
        {popupSeen && <TrolleyPopUp closePopUp={closePopUp}/>}
    </div>);
}

export default NavMenu;
