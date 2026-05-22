import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ModalShell from "../../components/modals/ModalShell";
import type { Venta } from "../../services/entities";

type VentaFormModalProps = {
  show: boolean;
  selectedVenta: Venta | null;
  onClose: () => void;
  onSubmit: (data: Omit<Venta, "id">) => void;
  handleSubmit: UseFormHandleSubmit<Omit<Venta, "id">>;
  register: UseFormRegister<Omit<Venta, "id">>;
  errors: FieldErrors<Omit<Venta, "id">>;
  clientes: Array<{ id: number; nombre: string }>;
};

const VentaFormModal = ({
  show,
  selectedVenta,
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
  clientes,
}: VentaFormModalProps) => {
  return (
    <ModalShell
      show={show}
      title={selectedVenta ? "Editar Venta" : "Crear Nueva Venta"}
      onClose={onClose}
    >
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
            <div className="text-danger mt-1">{errors.idCliente.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="datetime-local"
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
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-black">
            {selectedVenta ? "Guardar cambios" : "Guardar Venta"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default VentaFormModal;
