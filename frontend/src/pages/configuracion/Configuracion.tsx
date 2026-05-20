import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Empresa, empresaService } from "../../services/entities";

const Configuracion = () => {
  const queryClient = useQueryClient();
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Empresa, "id_empresa">>({
    defaultValues: {
      ruc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    },
  });

  const { data: empresas = [], isLoading } = useQuery({
    queryKey: ["empresa"],
    queryFn: empresaService.list,
  });

  const createMutation = useMutation({
    mutationFn: empresaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresa"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Empresa, "id_empresa">;
    }) => empresaService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresa"] });
      setSelectedEmpresa(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: empresaService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["empresa"] }),
  });

  /* useEffect(() => {
    if (empresas.length > 0 && !selectedEmpresa) {
      setSelectedEmpresa(empresas[0]);
    }
  }, [empresas, selectedEmpresa]);
 */
  useEffect(() => {
    if (selectedEmpresa) {
      reset({
        ruc: selectedEmpresa.ruc || "",
        nombre: selectedEmpresa.nombre || "",
        telefono: selectedEmpresa.telefono || "",
        direccion: selectedEmpresa.direccion || "",
        razonSocial: selectedEmpresa.razonSocial || "",
      });
    }
  }, [selectedEmpresa, reset]);

  const onSubmit = (data: Omit<Empresa, "id_empresa">) => {
    if (selectedEmpresa) {
      updateMutation.mutate({ id: selectedEmpresa.idEmpresa, payload: data });
      return;
    }
    createMutation.mutate(data);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>Configuración</h3>
          <p className="text-muted mb-0">
            Gestiona la información de tu empresa.
          </p>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-6">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>{selectedEmpresa ? "Editar empresa" : "Nueva empresa"}</h5>
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
                  <label className="form-label">Razón Social</label>
                  <input
                    className="form-control"
                    {...register("razonSocial")}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {selectedEmpresa ? "Actualizar datos" : "Crear empresa"}
                </button>
                {selectedEmpresa && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => {
                      setSelectedEmpresa(null);
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

        <div className="col-lg-6">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>Detalles de empresa</h5>
              {isLoading ? (
                <p>Cargando datos...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>RUC</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empresas.map((empresa) => (
                        <tr key={empresa.idEmpresa}>
                          <td>{empresa.idEmpresa}</td>
                          <td>{empresa.nombre || "-"}</td>
                          <td>{empresa.ruc || "-"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => setSelectedEmpresa(empresa)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteMutation.mutate(empresa.idEmpresa)
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

export default Configuracion;
