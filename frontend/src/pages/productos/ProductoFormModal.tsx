import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ModalShell from "../../components/modals/ModalShell";
import type { Producto, Proveedor } from "../../services/entities";

type ProductoFormModalProps = {
  show: boolean;
  selectedProducto: Producto | null;
  onClose: () => void;
  onSubmit: (data: Omit<Producto, "id">) => void;
  handleSubmit: UseFormHandleSubmit<Omit<Producto, "id">>;
  register: UseFormRegister<Omit<Producto, "id">>;
  errors: FieldErrors<Omit<Producto, "id">>;
  proveedores: Proveedor[];
};

const ProductoFormModal = ({
  show,
  selectedProducto,
  onClose,
  onSubmit,
  handleSubmit,
  register,
  errors,
  proveedores,
}: ProductoFormModalProps) => {
  return (
    <ModalShell
      show={show}
      title={selectedProducto ? "Editar Producto" : "Crear Nuevo Producto"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Código</label>
          <input className="form-control" {...register("codigo")} />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input className="form-control" {...register("descripcion")} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              {...register("stock", { valueAsNumber: true })}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              {...register("precio", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Proveedor</label>
          <select
            className="form-select"
            {...register("idProveedor", {
              valueAsNumber: true,
              required: "Proveedor es obligatorio",
            })}
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
              </option>
            ))}
          </select>
          {errors.idProveedor && (
            <div className="text-danger mt-1">{errors.idProveedor.message}</div>
          )}
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
            {selectedProducto ? "Guardar cambios" : "Guardar Producto"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default ProductoFormModal;
