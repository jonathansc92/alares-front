"use client";
import React, { useEffect, useState, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';

const Page = () => {
  let emptyPlan = {
    id: null,
    speed: null,
    price: null,
    wifi: 'sim',
    games: 'não',
    movies: 'não',
    best: 'não',
    giga: 'não',
  };

  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(emptyPlan);
  const [loading, setLoading] = useState(false);
  const [hasCombo] = useState(['sim', 'não']);
  const toast = useRef(null);
  const [planDialog, setPlanDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checkedWifi, setCheckedWifi] = useState(false);
  const [checkedGames, setCheckedGames] = useState(false);
  const [checkedMovies, setCheckedMovies] = useState(false);
  const [checkedBest, setCheckedBest] = useState(false);
  const [checkedGiga, setCheckedGiga] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch("/api/plans", {
        method: 'GET',
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

  const speedBodyTemplate = (rowData) => {
    return rowData.speed;
  };

  const addPlan = () => {
    setSubmitted(false);
    setPlanDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPlanDialog(false);
  };

  const getEnumCombo = (isChecked) => {
    if (isChecked) {
      return 'sim';
    } else {
      return 'não';
    }
  }

  const savePlan = async () => {

    if (plan.price != null && plan.speed != null) {

      setPlanDialog(false);
      setLoading(true);
      setSubmitted(true);

      let _plans = [...plans];
      let _plan = { ...plan };

      const response = await fetch(`/api/plans`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          speed: _plan.speed,
          price: _plan.price,
          wifi: getEnumCombo(checkedWifi),
          movies: getEnumCombo(checkedMovies),
          games: getEnumCombo(checkedGames),
          best: getEnumCombo(checkedBest),
          giga: getEnumCombo(checkedGiga)
        }),
      });

      const returnal = await response.json();

      setPlans(_plans);
      setPlan(emptyPlan);
      _plans.push(returnal?.data.data);
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Plano alterado com sucesso.', life: 3000 });

      setLoading(false);
    } else {
      toast.current.show({ severity: 'warn', summary: 'Obrigatório', detail: 'Campos valor e velocidade, são obrigatórios.', life: 3000 });
    }
  };

  const plantDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Salvar" icon="pi pi-check" onClick={savePlan} />
    </React.Fragment>
  );

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _plan = { ...plan };

    _plan[`${name}`] = val;

    setPlan(_plan);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <Toast ref={toast} />
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              Cadastro de Planos
            </h2>
          </div>
          <div className="mb-8 lg:mb-12">
            <Button label="Adicionar Plano" icon="pi pi-plus" severity="success" onClick={addPlan} />
          </div>
          <div>
            <DataTable value={plans} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} loading={loading}>
              <Column field="id" sortable header="ID" style={{ width: '20%' }}></Column>
              <Column field="speed" sortable header="Velocidade" body={speedBodyTemplate} editor={(options) => speedEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="price" sortable header="Valor" body={priceBodyTemplate} editor={(options) => priceEditor(options)} style={{ width: '20%' }}></Column>
              <Column field="wifi" sortable header="Wifi" body={comboWifiBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="games" sortable header="Games" body={comboGamesBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="movies" sortable header="Filmes" body={comboMoviesBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="best" sortable header="Melhor Plano?" body={comboBestBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column field="giga" sortable header="Giga?" body={comboGigaBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
              <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
              <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
          </div>
          <Dialog visible={planDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Adicionar Plano" modal className="p-fluid" footer={plantDialogFooter} onHide={hideDialog}>
            <div className="mb-6">
              <label htmlFor="speed" className="font-bold">
                Velocidade
              </label>
              <InputNumber value={plan.speed} onChange={(e) => onInputNumberChange(e, 'speed')} className={plan.speed == null ? 'p-invalid' : ''} required rows={3} cols={20} placeholder="Preencha a velocidade" />
            </div>
            <div className="mb-6">
              <label htmlFor="price" className="font-bold">
                Valor
              </label>
              <InputNumber value={plan.price} onChange={(e) => onInputNumberChange(e, 'price')} className={plan.price == null ? 'p-invalid' : ''} required mode="currency" currency="BRL" locale="pt-BR" placeholder="Preencha o valor" />
            </div>
            <div className="mb-6">
              <Checkbox inputId="wifi" name="wifi" value="sim" onChange={e => setCheckedWifi(e.checked)} checked={checkedWifi} />
              <label htmlFor="wifi" className="ml-2">Wifi</label>
            </div>
            <div className="mb-6">
              <Checkbox inputId="games" name="games" value="sim" onChange={e => setCheckedGames(e.checked)} checked={checkedGames} />
              <label htmlFor="games" className="ml-2">Games</label>
            </div>
            <div className="mb-6">
              <Checkbox inputId="movies" name="movies" value="sim" onChange={e => setCheckedMovies(e.checked)} checked={checkedMovies} />
              <label htmlFor="movies" className="ml-2">Filmes</label>
            </div>
            <div className="mb-6">
              <Checkbox inputId="best" name="best" value="sim" onChange={e => setCheckedBest(e.checked)} checked={checkedBest} />
              <label htmlFor="best" className="ml-2">Melhor Plano?</label>
            </div>
            <div className="mb-6">
              <Checkbox inputId="giga" name="giga" value="sim" onChange={e => setCheckedGiga(e.checked)} checked={checkedGiga} />
              <label htmlFor="giga" className="ml-2">Velocidade em Giga?</label>
            </div>
          </Dialog>
        </div>
      </section>
    </main>
  )
}

export default Page;
