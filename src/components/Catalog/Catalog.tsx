import React from 'react';
import styles from "./Catalog.module.scss";
import classNames from 'classnames';
import shop_logo from "../../assets/imgs/shop_logo.svg";
import person from "../../assets/imgs/person.svg";
import trolley from "../../assets/imgs/trolley.svg";

const Catalog: React.FC = () => {
    return (<div className={classNames(styles.catalog)}>
        <div className={classNames(styles.catalog__wrapper)}>
            catalog
        </div>
    </div>);
}

export default Catalog;
