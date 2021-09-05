import React from 'react';
import styles from "./TrolleyPopUp.module.scss";
import classNames from 'classnames';
import PopUpLaptop from "./PopUpLaptop/PopUpLaptop";
import closeIcon from "../../assets/imgs/closeIcon.png"
import {ITrolleyPopUpProps} from "../../types/popUpTypes";


const TrolleyPopUp: React.FC<ITrolleyPopUpProps> = ({closePopUp}) => {

    return (<div onClick={closePopUp} id="popup" className={classNames(styles.popUp)}>
        <div className={classNames(styles.popUp__content)}>
            <img id="close" className={classNames(styles.popUp__close)} src={closeIcon} alt=""/>
            <span className={classNames(styles.popUp__title)}>Basket</span>
            <div className={classNames(styles.popUp__laptops)}>
                <PopUpLaptop title={'Asus TUF Gaming F15'} price={'950'} img={'https://content2.rozetka.com.ua/goods/images/base_action/153245733.jpg'}/>
                <PopUpLaptop title={'Asus TUF Gaming F15'} price={'950'} img={'https://content2.rozetka.com.ua/goods/images/base_action/153245733.jpg'}/>
                <PopUpLaptop title={'Asus TUF Gaming F15'} price={'950'} img={'https://content2.rozetka.com.ua/goods/images/base_action/153245733.jpg'}/>
                <PopUpLaptop title={'Asus TUF Gaming F15'} price={'950'} img={'https://content2.rozetka.com.ua/goods/images/base_action/153245733.jpg'}/>
                <PopUpLaptop title={'Asus TUF Gaming F15'} price={'950'} img={'https://content2.rozetka.com.ua/goods/images/base_action/153245733.jpg'}/>

            </div>
        </div>
    </div>);
}

export default TrolleyPopUp;


