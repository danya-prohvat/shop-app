import React, {useEffect} from 'react';
import styles from "./Laptops.module.scss";
import classNames from 'classnames';
import Laptop from "./Laptop/Laptop";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getLaptops, getLaptopsTotalCountItems} from "../../../store/laptops-reducer";

const Laptops: React.FC = () => {
    const {laptops} = useTypedSelector(state => state.laptopsReducerPage)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaptopsTotalCountItems());
        dispatch(getLaptops());
    }, []);

    return (<div className={classNames(styles.laptops)}>
        {laptops.map(laptop => <Laptop key={laptop.id} title={laptop.title} price={laptop.price}/>)}
    </div>);
}

export default Laptops;
