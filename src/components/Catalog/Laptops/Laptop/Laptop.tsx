import React from 'react';
import styles from "./Laptop.module.scss";
import classNames from 'classnames';
import {ILaptopProps} from "../../../../types/catalogTypes";
import trolleyChecked from "../../../../assets/imgs/trolleyChecked.png"
import trolleyUnchecked from "../../../../assets/imgs/trolleyUnchecked.png"
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {editLaptopsInBasket} from "../../../../store/customer-reducer";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";


const Laptop: React.FC<ILaptopProps> = ({id, title, price, img}) => {
    const {customerData, authorized} = useTypedSelector(state => state.customerReducerPage)
    const history = useHistory()
    const dispatch = useDispatch();

    let laptopIsChecked: boolean = false;
    if (customerData.inBasket.length > 0) {
        laptopIsChecked = customerData.inBasket.includes(id.toString());
    }

    const trolleyIconOnClick = (): void => {
        if (!authorized) history.push('/authorization')
        else dispatch(editLaptopsInBasket(id));
    }

    return (<div className={classNames(styles.laptop)}>
        <div className={classNames(styles.laptop__img)}>
            <img src={'laptopsImages/' + img} alt=""/>
        </div>
        <div className={classNames(styles.laptop__title)}>
            <span>{title}</span>
        </div>
        <div className={classNames(styles.laptop__buy)}>
            <span className={classNames(styles.laptop__price)}>{price} <span className={classNames(styles.laptop__currency)}>$</span></span>
            <img onClick={trolleyIconOnClick} src={laptopIsChecked ? trolleyChecked : trolleyUnchecked} alt=""/>
        </div>

    </div>);
}

export default Laptop;
