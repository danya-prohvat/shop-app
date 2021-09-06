import React, {useEffect} from 'react';
import styles from "./Laptops.module.scss";
import classNames from 'classnames';
import Laptop from "./Laptop/Laptop";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getLaptops} from "../../../store/laptops-reducer";
import formPreloader from '../../../assets/imgs/Preloader.gif';


const Laptops: React.FC = () => {
    const {laptops, fetching} = useTypedSelector(state => state.laptopsReducerPage)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaptops({}));
    }, []);

    if (fetching)
        return <div className={classNames(styles.laptops)}>
            <img className={classNames(styles.laptops__fetching)} src={formPreloader} alt=""/>
        </div>


    return (<div className={classNames(styles.laptops)}>
        {laptops.length > 0 ? laptops.map(laptop => <Laptop key={laptop.id} id={laptop.id} img={laptop.img} title={laptop.title} price={laptop.price}/>)
        : <span className={classNames(styles.laptops__errorMessage)}>no results for this search</span>}
    </div>);
}

export default Laptops;
