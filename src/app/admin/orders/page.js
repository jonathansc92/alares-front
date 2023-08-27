"use client";
import React, { useEffect, useState, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const Page = () => {
  let emptyOrder = {
    id: null,
    plan_id: null,
    name: '',
    email: null,
    phone: '',
    status: 'in progress'
  };

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(emptyOrder);
  const [loading, setLoading] = useState(false);
  const [statuses] = useState(['done', 'in progress']);
  const toast = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await fetch("/api/orders", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      setOrders(result.data);
      setLoading(false);
    }

    getData();
  }, []);

  const getSeverity = (value) => {
    switch (value) {
      case 'done':
        return 'success';

      default:
        return 'warning';
    }
  };

  const onRowEditComplete = async (e) => {
    setLoading(true);
    let _orders = [...orders];
    let { newData, index } = e;

    await fetch(`/api/orders/${newData.id}`, {
      method: 'PUT',
      params: {
        id: newData.id
      },
      body: JSON.stringify({ status: newData.status }),
    }).then(response => {
      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o pedido.', life: 3000 });
      } else {
        _orders[index] = newData;
        setOrders(_orders);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Status do pedido, alterado com sucesso.', life: 3000 });
      }
    }).catch(error => {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar o pedido.', life: 3000 });
    });

    setLoading(false);
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione um Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)}></Tag>;
  };

  const deleteOrder = async (row) => {
    setLoading(true);

    await fetch(`/api/orders/${row.id}`, {
      method: 'DELETE',
      params: {
        id: row.id,
      },
    }).then(response => {
      if (!response.ok) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível remover o pedido.', life: 3000 });
      } else {
        setOrder(row);
        let _orders = orders.filter((val) => val.id !== row.id);

        setOrders(_orders);

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
        <Button icon="pi pi-trash" rounded severity="danger" onClick={() => deleteOrder(rowData)} />
      </React.Fragment>
    );
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
            <DataTable value={orders} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} loading={loading}>
              <Column field="id" header="ID" style={{ width: '20%' }}></Column>
              <Column field="name" header="Nome" style={{ width: '20%' }}></Column>
              <Column field="email" header="Email" style={{ width: '20%' }}></Column>
              <Column field="phone" header="Telefone" style={{ width: '20%' }}></Column>
              <Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '30%' }}></Column>
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
