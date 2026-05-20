import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Venta,
  ventasService,
  clientesService,
} from "../../services/entities";

const Ventas = () => {
  const queryClient = useQueryClient();
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Venta, "id_venta">>({
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
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Venta, "id_venta">;
    }) => ventasService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      setSelectedVenta(null);
      reset();
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
        fecha: selectedVenta.fecha ? selectedVenta.fecha.split("T")[0] : "",
        total: selectedVenta.total || 0,
      });
    }
  }, [selectedVenta, reset]);

  const onSubmit = (data: Omit<Venta, "id_venta">) => {
    if (selectedVenta) {
      updateMutation.mutate({ id: selectedVenta.idVenta, payload: data });
      return;
    }
    createMutation.mutate(data);
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

      <div className="row gy-4">
        <div className="col-lg-5">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>{selectedVenta ? "Editar venta" : "Nueva venta"}</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Cliente</label>
                  <select
                    className="form-select"
                    {...register("idCliente", {
                      valueAsNumber: true,
                      required: "Cliente es obligatorio",
                    })}
                  >
                    <option value="">Selecciona un cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.idCliente && (
                    <div className="text-danger mt-1">
                      {errors.idCliente.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("fecha")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Total</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    {...register("total", { valueAsNumber: true })}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {selectedVenta ? "Actualizar venta" : "Crear venta"}
                </button>
                {selectedVenta && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => {
                      setSelectedVenta(null);
                      reset();
                    }}
                  >
                    Cancelar edición
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
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
                        <tr key={venta.idVenta}>
                          <td>{venta.idVenta}</td>
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
                              onClick={() => setSelectedVenta(venta)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteMutation.mutate(venta.idVenta)
                              }
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
    </div>
  );
};

export default Ventas;
