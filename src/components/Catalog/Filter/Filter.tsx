import React from 'react';
import styles from "./Filter.module.scss";
import classNames from 'classnames';
import {ISingInFormValues} from "../../../types/authoriationTypes";
import {Field, Form, Formik} from "formik";
import formPreloader from "../../../assets/imgs/formPreloader.gif";
import {IFormValues} from "../../../types/catalogTypes";
import {useDispatch} from "react-redux";
import {getLaptops} from "../../../store/laptops-reducer";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const Filter: React.FC = () => {
    const dispatch = useDispatch();
    let {activePage} = useTypedSelector(state => state.laptopsReducerPage);


    const initialValues: IFormValues = {
        title: '',
        minPrice: '',
        maxPrice: '',
    };

    const formSubmit = (value: IFormValues): void => {
        dispatch(getLaptops({page: activePage, ...value}));
    };

    return (<div className={classNames(styles.filter)}>
        <Formik
            initialValues={initialValues}
            // validate={}
            // validate={values => {
            //     if (values.minPrice) {
            //         values.minPrice = values.minPrice.trim();
            //     }
            //     if (values.maxPrice) {
            //         values.maxPrice = values.maxPrice.trim();
            //     }
            // }}
            onSubmit={formSubmit}>
            <Form className={classNames(styles.filter__form)}>
                <div className={classNames(styles.filter__filed)}>
                    <label className={classNames(styles.filter__label)} htmlFor="title">Title: </label>
                    <Field className={classNames(styles.filter__input, styles.filter__title)} id="title" name="title"
                           type="text"
                           placeholder="by title..."/>
                </div>

                <div className={classNames(styles.filter__filed)}>
                    <label className={classNames(styles.filter__label)} htmlFor="">Price: </label>
                    <Field className={classNames(styles.filter__input, styles.filter__price)} id="minPrice"
                           name="minPrice"
                           type="text" placeholder="from"/>
                    <Field className={classNames(styles.filter__input, styles.filter__price)} id="maxPrice"
                           name="maxPrice"
                           type="text" placeholder="to"/>
                </div>

                <button className={classNames(styles.filter__btn)} type="submit">Search</button>
            </Form>
        </Formik>
    </div>);
}

export default Filter;
