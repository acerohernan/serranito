import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Cliente, clientesService } from "../../services/entities";

const Clientes = () => {
  const queryClient = useQueryClient();
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Cliente, "id">>({
    defaultValues: {
      dniRuc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    },
  });

  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: clientesService.list,
  });

  const createMutation = useMutation({
    mutationFn: clientesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Cliente, "id">;
    }) => clientesService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      reset({
        dniRuc: "",
        nombre: "",
        telefono: "",
        direccion: "",
        razonSocial: "",
      });
      setSelectedCliente(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: clientesService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
  });

  useEffect(() => {
    if (selectedCliente) {
      reset({
        dniRuc: selectedCliente.dniRuc,
        nombre: selectedCliente.nombre,
        telefono: selectedCliente.telefono || "",
        direccion: selectedCliente.direccion || "",
        razonSocial: selectedCliente.razonSocial || "",
      });
    }
  }, [selectedCliente, reset]);

  const onSubmit = (data: Omit<Cliente, "id">) => {
    if (selectedCliente) {
      updateMutation.mutate({ id: selectedCliente.id, payload: data });
      return;
    }
    createMutation.mutate(data);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>Clientes</h3>
          <p className="text-muted mb-0">
            Administra clientes y su información de contacto.
          </p>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-5">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>{selectedCliente ? "Editar cliente" : "Nuevo cliente"}</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">DNI / RUC</label>
                  <input
                    className="form-control"
                    {...register("dniRuc", {
                      required: "DNI/RUC es obligatorio",
                    })}
                  />
                  {errors.dniRuc && (
                    <div className="text-danger mt-1">
                      {errors.dniRuc.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    className="form-control"
                    {...register("nombre", {
                      required: "Nombre es obligatorio",
                    })}
                  />
                  {errors.nombre && (
                    <div className="text-danger mt-1">
                      {errors.nombre.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input className="form-control" {...register("telefono")} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input className="form-control" {...register("direccion")} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Razón social</label>
                  <input
                    className="form-control"
                    {...register("razonSocial")}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {selectedCliente ? "Actualizar cliente" : "Crear cliente"}
                </button>
                {selectedCliente && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => {
                      setSelectedCliente(null);
                      reset({
                        dniRuc: "",
                        nombre: "",
                        telefono: "",
                        direccion: "",
                        razonSocial: "",
                      });
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
              <h5>Lista de clientes</h5>
              {isLoading ? (
                <p>Cargando clientes...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>DNI/RUC</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                          <td>{cliente.id}</td>
                          <td>{cliente.dniRuc}</td>
                          <td>{cliente.nombre}</td>
                          <td>{cliente.telefono || "-"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => setSelectedCliente(cliente)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteMutation.mutate(cliente.id)}
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

export default Clientes;
