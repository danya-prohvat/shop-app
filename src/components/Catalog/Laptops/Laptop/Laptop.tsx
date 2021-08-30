import React from 'react';
import styles from "./Laptop.module.scss";
import classNames from 'classnames';

interface ILaptopProps {
    title: string;
    price: number | null;
    img: string;
}

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
            <img
                src="data:image/jpeg;base64,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"
                alt=""/>
        </div>

    </div>);
}

export default Laptop;
