import React, {useEffect} from 'react';
import styles from "./Laptops.module.scss";
import classNames from 'classnames';
import Laptop from "./Laptop/Laptop";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getLaptops} from "../../../store/laptops-reducer";

const Laptops: React.FC = () => {
    const {laptops} = useTypedSelector(state => state.laptopsReducerPage)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaptops());
    }, []);

    return (<div className={classNames(styles.laptops)}>
        {laptops.map(laptop => <Laptop key={laptop.id} img={laptop.img} title={laptop.title} price={laptop.price}/>)}
    </div>);
}

export default Laptops;
