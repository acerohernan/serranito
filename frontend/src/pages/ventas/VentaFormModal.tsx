import React, { useEffect, useState } from "react";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ModalShell from "../../components/modals/ModalShell";
import type { Venta, Producto } from "../../services/entities";
import { productosService } from "../../services/entities";

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

type SelectedProduct = {
  productId?: number;
  cantidad: number;
  precio?: number;
  descripcion?: string;
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
  const [availableProducts, setAvailableProducts] = useState<Producto[]>([]);
  const [items, setItems] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productosService.list();
        setAvailableProducts(data);
      } catch (e) {
        setAvailableProducts([]);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (selectedVenta) {
      // If editing existing venta, we keep items empty (backend doesn't return details here).
      // Could be extended to load sale details if endpoint provides them.
    } else {
      setItems([]);
    }
  }, [selectedVenta]);

  const addItem = () => {
    setItems((s) => [...s, { cantidad: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems((s) => s.filter((_, i) => i !== index));
  };

  const setItemProduct = (index: number, productId?: number) => {
    const prod = availableProducts.find((p) => p.id === productId);
    setItems((s) =>
      s.map((it, i) =>
        i === index
          ? {
              ...it,
              productId,
              precio: prod?.precio ?? 0,
              descripcion: prod?.descripcion ?? "",
            }
          : it,
      ),
    );
  };

  const setItemCantidad = (index: number, cantidad: number) => {
    setItems((s) => s.map((it, i) => (i === index ? { ...it, cantidad } : it)));
  };

  const subtotal = items.reduce(
    (acc, it) => acc + (it.precio ?? 0) * (it.cantidad ?? 0),
    0,
  );
  const iva = +(subtotal * 0.15);
  const totalCalculated = +(subtotal + iva);
  return (
    <ModalShell
      show={show}
      title={selectedVenta ? "Editar Venta" : "Crear Nueva Venta"}
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit((data) => {
          data.total = Number(totalCalculated.toFixed(2));
          onSubmit(data);
        })}
      >
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
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="m-0">Detalle de Productos</h6>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={addItem}
            >
              + Agregar Producto
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>PRODUCTO</th>
                  <th style={{ width: 80 }}>CANT.</th>
                  <th style={{ width: 120 }}>SUBTOTAL</th>
                  <th style={{ width: 40 }} />
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <select
                        className="form-select"
                        value={item.productId ?? ""}
                        onChange={(e) =>
                          setItemProduct(
                            idx,
                            Number(e.target.value) || undefined,
                          )
                        }
                      >
                        <option value="">Seleccione un producto...</option>
                        {availableProducts.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.descripcion}{" "}
                            {p.precio ? ` - $${p.precio.toFixed(2)}` : ""}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        value={item.cantidad}
                        onChange={(e) =>
                          setItemCantidad(
                            idx,
                            Math.max(1, Number(e.target.value) || 1),
                          )
                        }
                      />
                    </td>
                    <td>
                      ${((item.precio ?? 0) * (item.cantidad ?? 0)).toFixed(2)}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-link text-danger p-0"
                        onClick={() => removeItem(idx)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">
                      No hay productos agregados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end flex-column align-items-end gap-1">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>IVA (15%): ${iva.toFixed(2)}</div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
              TOTAL: ${totalCalculated.toFixed(2)}
            </div>
          </div>
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
