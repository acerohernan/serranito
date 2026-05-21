import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Empresa, empresaService } from "../../services/entities";

const Configuracion = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Empresa, "id">>({
    defaultValues: {
      ruc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    },
  });

  const { data: empresa, isLoading } = useQuery({
    queryKey: ["empresa"],
    queryFn: empresaService.getConfig,
  });

  const saveMutation = useMutation({
    mutationFn: (payload: Omit<Empresa, "id">) =>
      empresaService.saveConfig(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["empresa"] });
    },
  });

  useEffect(() => {
    if (empresa) {
      reset({
        ruc: empresa.ruc || "",
        nombre: empresa.nombre || "",
        telefono: empresa.telefono || "",
        direccion: empresa.direccion || "",
        razonSocial: empresa.razonSocial || "",
      });
    }
  }, [empresa, reset]);

  const onSubmit = (data: Omit<Empresa, "id">) => {
    saveMutation.mutate(data);
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
              <h5>Editar empresa</h5>
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
                  Guardar cambios
                </button>
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
              ) : empresa ? (
                <div className="row gy-2">
                  <div className="col-12">
                    <strong>Nombre:</strong> {empresa.nombre || "-"}
                  </div>
                  <div className="col-12">
                    <strong>RUC:</strong> {empresa.ruc || "-"}
                  </div>
                  <div className="col-12">
                    <strong>Teléfono:</strong> {empresa.telefono || "-"}
                  </div>
                  <div className="col-12">
                    <strong>Dirección:</strong> {empresa.direccion || "-"}
                  </div>
                  <div className="col-12">
                    <strong>Razón Social:</strong> {empresa.razonSocial || "-"}
                  </div>
                </div>
              ) : (
                <p>No hay configuración de empresa disponible.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
