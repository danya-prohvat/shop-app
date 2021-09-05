import React from 'react';
import styles from "./PopUpLaptop.module.scss";
import classNames from 'classnames';
import deleteIcon from "../../../assets/imgs/delete.png"
import {IPopUpLaptopProps} from "../../../types/popUpTypes";


const PopUpLaptop: React.FC<IPopUpLaptopProps> = ({title, price, img}) => {


    return (<div className={classNames(styles.laptop)}>
        <div className={classNames(styles.laptop__img)}>
            <img src={img} alt=""/>
        </div>
        <div className={classNames(styles.laptop__description)}>
            <div className={classNames(styles.laptop__text)}>
                <span className={classNames(styles.laptop__title)}>{title}</span>
                <span className={classNames(styles.laptop__price)}>{price}</span>
            </div>
            <div className={classNames(styles.laptop__deleteIcon)}>
                <img className={classNames(styles.laptop__deleteIcon)} src={deleteIcon} alt=""/>
            </div>
        </div>
    </div>);
}

export default PopUpLaptop;


