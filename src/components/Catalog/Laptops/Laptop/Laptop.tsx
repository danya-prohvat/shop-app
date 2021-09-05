import React from 'react';
import styles from "./Laptop.module.scss";
import classNames from 'classnames';
import {ILaptopProps} from "../../../../types/catalogTypes";
import trolleyChecked from "../../../../assets/imgs/trolleyChecked.png"
import trolleyUnchecked from "../../../../assets/imgs/trolleyUnchecked.png"


const Laptop: React.FC<ILaptopProps> = ({title, price, img}) => {

    return (<div className={classNames(styles.laptop)}>
        <div className={classNames(styles.laptop__img)}>
            <img src={'laptopsImages/' + img} alt=""/>
        </div>
        <div className={classNames(styles.laptop__title)}>
            <span>{title}</span>
        </div>
        <div className={classNames(styles.laptop__buy)}>
            <span className={classNames(styles.laptop__price)}>{price}</span>
            <img src={trolleyUnchecked} alt=""/>
        </div>

    </div>);
}

export default Laptop;
