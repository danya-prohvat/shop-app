import React, {useState} from 'react';
import styles from "./NavMenu.module.scss";
import classNames from 'classnames';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NavLink, useHistory} from "react-router-dom";
import TrolleyPopUp from "../TrolleyPopUp/TrolleyPopUp";
import shop_logo from '../../assets/imgs/shop_logo.svg';
import person from '../../assets/imgs/person.svg';
import trolley from '../../assets/imgs/trolley.svg';


const NavMenu: React.FC = () => {
    const {customerData, authorized} = useTypedSelector(state => state.customerReducerPage)
    let history = useHistory();
    const [popupSeen, setPopupSeen] = useState<boolean>(false);

    const showPopUp = (): void => {
        if (!authorized)
            history.push('/authorization');
        else {
            setPopupSeen(true);
            document.body.style.overflow = "hidden"
        }
    };

    const closePopUp = (event: any): void => {
        if (event.target.id === 'close' || event.target.id === 'popup') {
            setPopupSeen(false);
            document.body.style.overflow = ""
        }
    };

    return (<div className={classNames(styles.navMenu)}>
        <div className={classNames(styles.navMenu__wrapper)}>
            <div className={classNames(styles.navMenu__logo)}>
                <img className={classNames(styles.logo__img)} src={shop_logo} alt=""/>
                <span className={classNames(styles.logo__text)} onClick={() => history.push("/")}>React shop</span>
            </div>
            <div className={classNames(styles.navMenu__customer)}>
                <div className={classNames(styles.customer__person)}>
                    <img src={person} alt=""/>
                    <span className={classNames(styles.customer__name)}>
                        {authorized ? customerData.name : <NavLink to="/authorization">Sign in</NavLink>}
                    </span>
                </div>
                <div onClick={showPopUp} className={classNames(styles.customer__trolley, {[styles.customer__trolley_clickable]:authorized})}>
                    {authorized && <span className={classNames(styles.customer__itemsInCartCount)}>{customerData.inBasket.length}</span>}
                    <img src={trolley} alt=""/>
                </div>
            </div>
        </div>
        {popupSeen && <TrolleyPopUp closePopUp={closePopUp}/>}
    </div>);
}

export default NavMenu;
