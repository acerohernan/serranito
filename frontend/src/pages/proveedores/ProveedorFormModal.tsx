import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ModalShell from "../../components/modals/ModalShell";
import type { Proveedor } from "../../services/entities";

type ProveedorFormModalProps = {
  show: boolean;
  selectedProveedor: Proveedor | null;
  onClose: () => void;
  onSubmit: (data: Omit<Proveedor, "id">) => void;
  handleSubmit: UseFormHandleSubmit<Omit<Proveedor, "id">>;
  register: UseFormRegister<Omit<Proveedor, "id">>;
  errors: FieldErrors<Omit<Proveedor, "id">>;
};

const ProveedorFormModal = ({
  show,
  selectedProveedor,
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
}: ProveedorFormModalProps) => {
  return (
    <ModalShell
      show={show}
      title={selectedProveedor ? "Editar Proveedor" : "Crear Nuevo Proveedor"}
      onClose={onClose}
    >
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
            {...register("nombre", { required: "Nombre es obligatorio" })}
          />
          {errors.nombre && (
            <div className="text-danger mt-1">{errors.nombre.message}</div>
          )}
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
            {selectedProveedor ? "Guardar cambios" : "Guardar Proveedor"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default ProveedorFormModal;
