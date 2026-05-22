import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ModalShell from "../../components/modals/ModalShell";
import type { Cliente } from "../../services/entities";

type ClienteFormModalProps = {
  show: boolean;
  selectedCliente: Cliente | null;
  onClose: () => void;
  onSubmit: (data: Omit<Cliente, "id">) => void;
  handleSubmit: UseFormHandleSubmit<Omit<Cliente, "id">>;
  register: UseFormRegister<Omit<Cliente, "id">>;
  errors: FieldErrors<Omit<Cliente, "id">>;
};

const ClienteFormModal = ({
  show,
  selectedCliente,
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
}: ClienteFormModalProps) => {
  return (
    <ModalShell
      show={show}
      title={selectedCliente ? "Editar Cliente" : "Crear Nuevo Cliente"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">DNI / CUIL</label>
            <input
              className="form-control"
              {...register("dniRuc", {
                required: "DNI/RUC es obligatorio",
              })}
            />
            {errors.dniRuc && (
              <div className="text-danger mt-1">{errors.dniRuc.message}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre Completo</label>
            <input
              className="form-control"
              {...register("nombre", {
                required: "Nombre es obligatorio",
              })}
            />
            {errors.nombre && (
              <div className="text-danger mt-1">{errors.nombre.message}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Teléfono</label>
            <input className="form-control" {...register("telefono")} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Razón Social</label>
            <input className="form-control" {...register("razonSocial")} />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input className="form-control" {...register("direccion")} />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-black">
            {selectedCliente ? "Guardar cambios" : "Guardar Cliente"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default ClienteFormModal;
