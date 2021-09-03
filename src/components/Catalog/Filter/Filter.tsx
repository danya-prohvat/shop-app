import React from 'react';
import styles from "./Filter.module.scss";
import classNames from 'classnames';
import {Field, Form, Formik} from "formik";
import {IFilterFormValues} from "../../../types/catalogTypes";
import {useDispatch} from "react-redux";
import {getLaptops} from "../../../store/laptops-reducer";
import {FilterFormValidation} from "../../../utils/formValidation";

const Filter: React.FC = () => {
    const dispatch = useDispatch();

    const initialValues: IFilterFormValues = {
        title: '',
        minPrice: '',
        maxPrice: '',
    };

    const formSubmit = (value: IFilterFormValues): void => {
        dispatch(getLaptops({...value, fromForm: true}));
    };
    const formReset = (): void => {
        dispatch(getLaptops({fromForm: true}));
    };


    return (<div className={classNames(styles.filter)}>
        <Formik className={classNames(styles.filter__wrapper)}
            initialValues={initialValues}
            validate={FilterFormValidation}
            onSubmit={formSubmit}
            onReset={formReset}>
            <Form className={classNames(styles.filter__form)}>
                <div className={classNames(styles.filter__filed)}>
                    <label className={classNames(styles.filter__label)} htmlFor="title">Title :</label>
                    <Field className={classNames(styles.filter__input, styles.filter__title)} id="title" name="title"
                           type="text"
                           placeholder="by title..."/>
                </div>

                <div className={classNames(styles.filter__filed)}>
                    <label className={classNames(styles.filter__label)} htmlFor="">Price($) :</label>
                    <Field className={classNames(styles.filter__input, styles.filter__price)} id="minPrice"
                           name="minPrice"
                           type="number" placeholder="from"/>
                    <Field className={classNames(styles.filter__input, styles.filter__price)} id="maxPrice"
                           name="maxPrice"
                           type="number" placeholder="to"/>
                </div>
                <div className={classNames(styles.filter__buttons)}>
                    <button className={classNames(styles.filter__submit)} type="submit">Search</button>
                    <button type='reset' className={classNames(styles.filter__reset)}></button>
                </div>

            </Form>
        </Formik>
    </div>);
}

export default Filter;
