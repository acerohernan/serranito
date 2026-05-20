import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Proveedor, proveedoresService } from "../../services/entities";

const Proveedores = () => {
  const queryClient = useQueryClient();
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Proveedor, "id_proveedor">>({
    defaultValues: {
      ruc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    },
  });

  const { data: proveedores = [], isLoading } = useQuery({
    queryKey: ["proveedores"],
    queryFn: proveedoresService.list,
  });

  const createMutation = useMutation({
    mutationFn: proveedoresService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Proveedor, "id_proveedor">;
    }) => proveedoresService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
      setSelectedProveedor(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: proveedoresService.remove,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["proveedores"] }),
  });

  useEffect(() => {
    if (selectedProveedor) {
      reset({
        ruc: selectedProveedor.ruc,
        nombre: selectedProveedor.nombre,
        telefono: selectedProveedor.telefono || "",
        direccion: selectedProveedor.direccion || "",
        razonSocial: selectedProveedor.razonSocial || "",
      });
    }
  }, [selectedProveedor, reset]);

  const onSubmit = (data: Omit<Proveedor, "id_proveedor">) => {
    if (selectedProveedor) {
      updateMutation.mutate({
        id: selectedProveedor.idProveedor,
        payload: data,
      });
      return;
    }
    createMutation.mutate(data);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>Proveedores</h3>
          <p className="text-muted mb-0">
            Gestiona tus proveedores y sus datos de contacto.
          </p>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-5">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>
                {selectedProveedor ? "Editar proveedor" : "Nuevo proveedor"}
              </h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">RUC</label>
                  <input
                    className="form-control"
                    {...register("ruc", { required: "RUC es obligatorio" })}
                  />
                  {errors.ruc && (
                    <div className="text-danger mt-1">{errors.ruc.message}</div>
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
                  {selectedProveedor
                    ? "Actualizar proveedor"
                    : "Crear proveedor"}
                </button>
                {selectedProveedor && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => {
                      setSelectedProveedor(null);
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
              <h5>Lista de proveedores</h5>
              {isLoading ? (
                <p>Cargando proveedores...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>RUC</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proveedores.map((proveedor) => (
                        <tr key={proveedor.idProveedor}>
                          <td>{proveedor.idProveedor}</td>
                          <td>{proveedor.ruc}</td>
                          <td>{proveedor.nombre}</td>
                          <td>{proveedor.telefono || "-"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => setSelectedProveedor(proveedor)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteMutation.mutate(proveedor.idProveedor)
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

export default Proveedores;
