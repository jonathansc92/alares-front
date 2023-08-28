"use client";

import React, { useState, useRef } from "react";
import styles from '../../styles/components/Plan.module.scss';
import ComboComponent from './ComboComponent';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';

export default function PlanComponent({ planId, speed, unit, price, best, wifi, games, movies }) {
    let emptyOrder = {
        name: null,
        email: null,
        phone: null,
        plan_id: null,
    };

    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState(emptyOrder);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const combos = (
        <div className="flex justify-center">
            <ul role="list" className={`${styles.comboList} mb-8 space-y-4 text-left my-8`}>
                {wifi == 'sim' ?
                    <ComboComponent combo="Wifi" colorClass={`${best == "sim" ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
                {games == 'sim' ?
                    <ComboComponent combo="Games" colorClass={`${best == "sim" ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
                {movies == 'sim' ?
                    <ComboComponent combo="Canais de Filmes" colorClass={`${best == "sim" ? styles.bestColor : styles.defaultColor}`} />
                    : ''
                }
            </ul>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Confirmar contrato" icon="pi pi-check" onClick={() => saveContract()} autoFocus loading={loading} />
        </div>
    );

    const bestPlan = (
        <div className={`${styles.best} flex flex-col mx-auto max-w-lg text-center bg-white rounded-lg border mb-8`}>
            <span className="">
                Melhor Plano
            </span>
        </div >
    );

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _order = { ...order };

        _order[`${name}`] = val;

        setOrder(_order);
    };


    const saveContract = async () => {
        if (order.name != null && order.email != null && order.phone != null) {
            setLoading(true);
            let _order = { ...order };

            const response = await fetch(`/api/orders`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: _order.name,
                    email: _order.email,
                    phone: _order.phone,
                    plan_id: planId
                }),
            });

            setLoading(false);
            setVisible(false);

            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Aguarde a confirmação do contrato.', life: 3000 });
        }
        else {
            toast.current.show({ severity: 'warn', summary: 'Obrigatório', detail: 'Todos os campos são obrigatórios para o contrato', life: 3000 });
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className={`${styles.plan} ${best == 'sim' ? styles.bestPlan : ''} flex flex-col p-6 mx-auto max-w-lg text-center bg-white rounded-lg border xl:p-8`}>
                {best == 'sim' ? bestPlan : ''}
                <h3 className={`${styles.speed} ${best == 'sim' ? styles.bestColor : styles.defaultColor} mb-4 text-2xl font-semibold`}>
                    {speed}
                </h3>
                <p className={`${styles.unit} font-light sm:text-lg font-semibold`}>
                    {unit}
                </p>
                {combos}
                <div className={`flex justify-center items-baseline ${styles.price}`}>
                    <span className={`mr-2 text-5xl font-extrabold`}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</span>
                    <span>/mês</span>
                </div>
                <div className="flex justify-center">
                    <Button className={`${styles.btnContract} ${styles.started}`} label="Contrate Já" onClick={() => setVisible(true)} />
                </div>
            </div>
            <Dialog
                visible={visible} style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header={`Plano ${speed} ${unit} por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)} / mês`}
                onHide={() => setVisible(false)}
                footer={footerContent}
                className="p-fluid"
            >
                <div className="mb-6">
                    <label htmlFor="name" className="font-bold">
                        Nome
                    </label>
                    <InputText value={order.name} onChange={(e) => onInputChange(e, 'name')} className={order.name == null ? 'p-invalid' : ''} required rows={3} cols={20} placeholder="Digite seu nome" />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText value={order.email} onChange={(e) => onInputChange(e, 'email')} className={order.email == null ? 'p-invalid' : ''} required rows={3} cols={20} placeholder="Digite seu email" />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="font-bold">
                        Telefone
                    </label>
                    <InputMask id="phone" value={order.phone} onChange={(e) => onInputChange(e, 'phone')} className={order.phone == null ? 'p-invalid' : ''} mask="(99) 999999999" placeholder="(99) 999999999" unmask></InputMask>
                </div>
            </Dialog>
        </div>
    )
}