"use client";
import React, { useEffect, useState, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { InputMask } from 'primereact/inputmask';

const Page = () => {
  let emptyplan = {
    id: null,
    plan_id: null,
    name: '',
    email: null,
    phone: '',
    status: 'in progress'
  };

  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(emptyplan);
  const [loading, setLoading] = useState(false);
  const [hasCombo] = useState(['sim', 'não']);
  const toast = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch("/api/plans", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      setPlans(result.data);
      setLoading(false);
    }

    getData();
  }, []);

  const getIconHasCombo = (value) => {
    switch (value) {
      case 'sim':
        return 'pi pi-check';
      default:
        return 'pi pi-times';
    }
  };

  const onRowEditComplete = async (e) => {
    setLoading(true);
    let _plans = [...plans];
    let { newData, index } = e;

    await fetch(`/api/plans/${newData.id}`, {
      method: 'PUT',
      params: {
        id: newData.id
      },
      body: JSON.stringify({
        price: newData.price,
        wifi: newData.wifi,
        games: newData.games,
        movies: newData.movies,
        best: newData.best,
        giga: newData.giga,
        speed: newData.speed
      }),
    }).then(response => {
      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o plano.', life: 3000 });
      } else {
        _plans[index] = newData;
        console.log(newData)
        setPlans(_plans);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Plano alterado com sucesso.', life: 3000 });
      }
    }).catch(error => {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o plano.', life: 3000 });
    });

    setLoading(false);
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={hasCombo}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione"
        itemTemplate={(option) => {
          return option;
        }}
      />
    );
  };

  const comboWifiBodyTemplate = (rowData) => {
    return <i className={getIconHasCombo(rowData.wifi)} style={{ fontSize: '1rem' }}></i>;
  };

  const comboGamesBodyTemplate = (rowData) => {
    return <i className={getIconHasCombo(rowData.games)} style={{ fontSize: '1rem' }}></i>;
  };

  const comboMoviesBodyTemplate = (rowData) => {
    return <i className={getIconHasCombo(rowData.movies)} style={{ fontSize: '1rem' }}></i>;
  };

  const comboBestBodyTemplate = (rowData) => {
    return <i className={getIconHasCombo(rowData.best)} style={{ fontSize: '1rem' }}></i>;
  };

  const comboGigaBodyTemplate = (rowData) => {
    return <i className={getIconHasCombo(rowData.giga)} style={{ fontSize: '1rem' }}></i>;
  };

  const deleteplan = async (row) => {
    setLoading(true);

    await fetch(`/api/plans/${row.id}`, {
      method: 'DELETE',
      params: {
        id: row.id,
      },
    }).then(response => {
      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível remover o pedido.', life: 3000 });
      } else {
        setPlan(row);
        let _plans = plans.filter((val) => val.id !== row.id);

        setPlans(_plans);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    }).catch(error => {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível remover o pedido.', life: 3000 });
    });

    setLoading(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-trash" rounded severity="danger" onClick={() => deleteplan(rowData)} />
      </React.Fragment>
    );
  };

  const priceEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="BRL" locale="pt-BR" />;
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rowData.price);
  };

  const speedEditor = (options) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} />;
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rowData.price);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <Toast ref={toast} />
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              Pedidos
            </h2>
          </div>
          <div>
            <DataTable value={plans} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} loading={loading}>
              <Column field="id" header="ID" style={{ width: '20%' }}></Column>
              <Column field="speed" header="Velocidade" body={priceBodyTemplate} editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="price" header="Valor" body={priceBodyTemplate} editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="wifi" header="Wifi" body={comboWifiBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="games" header="Games" body={comboGamesBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="movies" header="Filmes" body={comboMoviesBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="best" header="Melhor Plano?" body={comboBestBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="giga" header="Giga?" body={comboGigaBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
              <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page;
