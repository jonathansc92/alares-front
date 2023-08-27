"use client";

import React, { useState } from "react";
import styles from '../../styles/components/Plan.module.scss';
import ComboComponent from './ComboComponent';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';

export default function PlanComponent({ speed, unit, price, best, wifi, games, movies }) {
    const [visible, setVisible] = useState(false);

    const combos = (
        <div class="flex justify-center">
            <ul role="list" className={`${styles.comboList} mb-8 space-y-4 text-left my-8`}>
                {wifi ?
                    <ComboComponent combo="Wifi" colorClass={`${best ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
                {games ?
                    <ComboComponent combo="Games" colorClass={`${best ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
                {movies ?
                    <ComboComponent combo="Canais de Filmes" colorClass={`${best ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
            </ul>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Name - Surname is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const bestPlan = (
        <div className={`${styles.best} flex flex-col mx-auto max-w-lg text-center bg-white rounded-lg border mb-8`}>
            <span class="">
                Melhor Plano
            </span>
        </div >
    );

    return (
        <div>
            <div className={`${styles.plan} ${best ? styles.bestPlan : ''} flex flex-col p-6 mx-auto max-w-lg text-center bg-white rounded-lg border xl:p-8`}>
                {best ? bestPlan : ''}
                <h3 className={`${styles.speed} ${best ? styles.bestColor : styles.defaultColor} mb-4 text-2xl font-semibold`}>
                    {speed}
                </h3>
                <p className={`${styles.unit} font-light sm:text-lg font-semibold`}>
                    {unit}
                </p>
                {combos}
                <div className={`flex justify-center items-baseline ${styles.price}`}>
                    <span className={`mr-2 text-5xl font-extrabold`}>R$ {price}</span>
                    <span>/mês</span>
                </div>
                <div className="flex justify-center">
                    <Button className={`${styles.btnContract} ${styles.started}`} label="Contrate Já" onClick={() => setVisible(true)} />
                </div>
            </div>
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <InputText
                    id="value"
                    name="value"
                    value={formik.values.value}
                    onChange={(e) => {
                        formik.setFieldValue('value', e.target.value);
                    }}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                />
            </Dialog>
        </div>
    )
}