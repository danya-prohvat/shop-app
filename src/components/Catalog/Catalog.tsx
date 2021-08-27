import React from 'react';
import styles from "./Catalog.module.scss";
import classNames from 'classnames';
import Filter from "./Filter/Filter";
import Pagination from "./Pagination/Pagination";
import Laptops from "./Laptops/Laptops";

const Catalog: React.FC = () => {
    return (<div className={classNames(styles.catalog)}>
        <div className={classNames(styles.catalog__wrapper)}>
            <Filter />
            <Laptops />
            <Pagination />
        </div>
    </div>);
}

export default Catalog;
