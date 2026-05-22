import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Venta,
  ventasService,
  clientesService,
} from "../../services/entities";
import VentaFormModal from "./VentaFormModal";
import VentaDeleteModal from "./VentaDeleteModal";

const Ventas = () => {
  const queryClient = useQueryClient();
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Venta, "id">>({
    defaultValues: {
      idCliente: undefined,
      fecha: "",
      total: 0,
    },
  });

  const { data: ventas = [], isLoading } = useQuery({
    queryKey: ["ventas"],
    queryFn: ventasService.list,
  });
  const { data: clientes = [] } = useQuery({
    queryKey: ["clientes"],
    queryFn: clientesService.list,
  });

  const createMutation = useMutation({
    mutationFn: ventasService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      reset({
        idCliente: undefined,
        fecha: "",
        total: 0,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Omit<Venta, "id"> }) =>
      ventasService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      setSelectedVenta(null);
      reset({
        idCliente: undefined,
        fecha: "",
        total: 0,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ventasService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ventas"] }),
  });
  useEffect(() => {
    if (selectedVenta) {
      reset({
        idCliente: selectedVenta.idCliente,
        fecha: selectedVenta.fecha ?? "",
        total: selectedVenta.total || 0,
      });
    }
  }, [selectedVenta, reset]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState<Venta | null>(null);

  const onSubmit = (data: Omit<Venta, "id">) => {
    if (selectedVenta) {
      updateMutation.mutate({ id: selectedVenta.id, payload: data });
      return;
    }
    createMutation.mutate(data);
  };

  const openCreate = () => {
    setSelectedVenta(null);
    reset({ idCliente: undefined, fecha: "", total: 0 });
    setShowModal(true);
  };

  const openEdit = (venta: Venta) => {
    setSelectedVenta(venta);
    setShowModal(true);
  };

  const confirmDelete = (venta: Venta) => {
    setToDelete(venta);
    setShowDeleteModal(true);
  };

  const doDelete = () => {
    if (toDelete) {
      deleteMutation.mutate(toDelete.id);
    }
    setShowDeleteModal(false);
    setToDelete(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>Ventas</h3>
          <p className="text-muted mb-0">
            Gestiona las ventas registradas y asigna clientes.
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-black" onClick={openCreate}>
          + Nueva Venta
        </button>
      </div>

      <div className="row gy-4">
        <div className="col-12">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>Lista de ventas</h5>
              {isLoading ? (
                <p>Cargando ventas...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas.map((venta) => (
                        <tr key={venta.id}>
                          <td>{venta.id}</td>
                          <td>
                            {clientes.find(
                              (item) => item.id === venta.idCliente,
                            )?.nombre || "-"}
                          </td>
                          <td>
                            {venta.fecha
                              ? new Date(venta.fecha).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>{venta.total?.toFixed(2) ?? "-"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openEdit(venta)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmDelete(venta)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <VentaFormModal
        show={showModal}
        selectedVenta={selectedVenta}
        onClose={() => {
          setShowModal(false);
          setSelectedVenta(null);
          reset({ idCliente: undefined, fecha: "", total: 0 });
        }}
        onSubmit={(data) => {
          onSubmit(data);
          setShowModal(false);
        }}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        clientes={clientes}
      />

      <VentaDeleteModal
        show={showDeleteModal}
        venta={toDelete}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={doDelete}
      />
    </div>
  );
};

export default Ventas;
