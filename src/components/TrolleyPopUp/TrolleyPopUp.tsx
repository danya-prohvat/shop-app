import React, {useEffect} from 'react';
import styles from "./TrolleyPopUp.module.scss";
import classNames from 'classnames';
import PopUpLaptop from "./PopUpLaptop/PopUpLaptop";
import closeIcon from "../../assets/imgs/closeIcon.png"
import {ITrolleyPopUpProps} from "../../types/popUpTypes";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {getLaptopsInBasket} from "../../store/customer-reducer";
import {useDispatch} from "react-redux";


const TrolleyPopUp: React.FC<ITrolleyPopUpProps> = ({closePopUp}) => {
    const {basket, inBasket} = useTypedSelector(state => state.customerReducerPage.customerData)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaptopsInBasket());
    }, [inBasket])


    return (<div onClick={closePopUp} id="popup" className={classNames(styles.popUp)}>
        <div className={classNames(styles.popUp__content)}>
            <img id="close" className={classNames(styles.popUp__close)} src={closeIcon} alt=""/>
            <span className={classNames(styles.popUp__title)}>Basket</span>
            <div className={classNames(styles.popUp__laptops)}>
                {inBasket.length > 0 ? basket.map(laptop => <PopUpLaptop key={laptop.id} id={laptop.id}
                                                                         title={laptop.title} price={laptop.price}
                                                                         img={laptop.img}/>)
                :<span className={classNames(styles.popUp__emptyBasket)}>Basket is empty</span>}
            </div>
        </div>
    </div>);
}

export default TrolleyPopUp;


