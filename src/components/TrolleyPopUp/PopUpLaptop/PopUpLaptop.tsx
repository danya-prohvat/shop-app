import React from 'react';
import styles from "./PopUpLaptop.module.scss";
import classNames from 'classnames';
import deleteIcon from "../../../assets/imgs/delete.png"
import {IPopUpLaptopProps} from "../../../types/popUpTypes";
import {useDispatch} from "react-redux";
import {editLaptopsInBasket} from "../../../store/customer-reducer";


const PopUpLaptop: React.FC<IPopUpLaptopProps> = ({id, title, price, img}) => {
    const dispatch = useDispatch()

    const deleteIconOnClick = (): void => {
        dispatch(editLaptopsInBasket(id));
    }

    return (<div className={classNames(styles.laptop)}>
        <div className={classNames(styles.laptop__img)}>
            <img src={'laptopsImages/' + img} alt=""/>
        </div>
        <div className={classNames(styles.laptop__description)}>
            <div className={classNames(styles.laptop__text)}>
                <span className={classNames(styles.laptop__title)}>{title}</span>
                <span className={classNames(styles.laptop__price)}>{price} <span className={classNames(styles.laptop__currency)}>$</span></span>
            </div>
            <div className={classNames(styles.laptop__deleteIcon)}>
                <img onClick={deleteIconOnClick} className={classNames(styles.laptop__deleteIcon)} src={deleteIcon}
                     alt=""/>
            </div>
        </div>
    </div>);
}

export default PopUpLaptop;


