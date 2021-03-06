import React from 'react';
import styles from "./Pagination.module.scss";
import classNames from 'classnames';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getLaptops} from "../../../store/laptops-reducer";
import prevArrow from '../../../assets/imgs/prevArrow.svg';
import nextArrow from '../../../assets/imgs/nextArrow.svg';

const Pagination: React.FC = () => {
    let {activePage, pageSize, totalLaptopsCount} = useTypedSelector(state => state.laptopsReducerPage);
    const totalPages = Math.ceil(totalLaptopsCount / pageSize);
    const dispatch = useDispatch();

    const changePage = (page: number): void => {
        dispatch(getLaptops({page}));
        window.scrollTo(0, 0);
    }

    const paginationItemOnClick = (event: React.MouseEvent<HTMLLIElement>): void => {
        changePage(+event.currentTarget.textContent!);
    }

    const arrowOnClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.currentTarget.id === 'prevArrow') {
            changePage(--activePage);
        } else {
            changePage(++activePage);
        }
    }

    const pagination = calculatePagination();
    function calculatePagination () {
        let paginationItems = [];
        if (activePage < 7)
            for (let i = 1; i < activePage; i++) paginationItems.push(createLi(i));
        else {
            paginationItems.push(createLi(1));
            paginationItems.push(createLi(null, 'firstPoints'));
            for (let i = activePage - 3; i < activePage; i++) paginationItems.push(createLi(i));
        }

        for (let i = activePage; i < activePage + 5 && i <= totalPages; i++) paginationItems.push(createLi(i));

        if (totalPages - activePage > 4) {
            paginationItems[paginationItems.length - 1] = createLi(null, 'secondPoints');
            paginationItems.push(createLi(totalPages));
        }
        if (totalLaptopsCount === 0) paginationItems.push(createLi(1));
        return paginationItems;
    }


    function createLi(ind: number | null, pointsKey: string | undefined = undefined) {
        return ind ?
            <li key={ind}
                className={classNames(styles.pagination__li, {[styles.pagination__li_active]: activePage === ind})}
                onClick={paginationItemOnClick}>{ind}</li>
            :
            <li key={pointsKey} className={classNames(styles.pagination__li, styles.pagination__li_plug)}>...</li>;
    }


    return (<div className={classNames(styles.pagination)}>
        <div className={classNames(styles.pagination__wrapper)}>
            <div onClick={arrowOnClick} id='prevArrow'
                 className={classNames(styles.pagination__arrow, styles.pagination__prevArrow, {[styles.pagination__arrow_disabled]: !(activePage > 1)})}>
                <img src={prevArrow} alt=""/>
            </div>
            <ul className={classNames(styles.pagination__ul)}>
                {pagination}
            </ul>
            <div onClick={arrowOnClick} id='nextArrow'
                 className={classNames(styles.pagination__arrow, styles.pagination__nextArrow, {[styles.pagination__arrow_disabled]: !(activePage < totalPages)})}>
                <img src={nextArrow} alt=""/>
            </div>
        </div>
    </div>);
}

export default Pagination;
