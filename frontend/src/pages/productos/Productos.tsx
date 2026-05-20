import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Producto,
  productosService,
  proveedoresService,
  type Proveedor,
} from "../../services/entities";

const Productos = () => {
  const queryClient = useQueryClient();
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Producto, "id_producto">>({
    defaultValues: {
      codigo: "",
      descripcion: "",
      stock: 0,
      precio: 0,
      idProveedor: undefined,
    },
  });

  const { data: productos = [], isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: productosService.list,
  });
  const { data: proveedores = [] } = useQuery<Proveedor[]>({
    queryKey: ["proveedores"],
    queryFn: proveedoresService.list,
  });

  const createMutation = useMutation({
    mutationFn: productosService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Producto, "id_producto">;
    }) => productosService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setSelectedProducto(null);
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productosService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["productos"] }),
  });

  useEffect(() => {
    if (selectedProducto) {
      reset({
        codigo: selectedProducto.codigo || "",
        descripcion: selectedProducto.descripcion || "",
        stock: selectedProducto.stock || 0,
        precio: selectedProducto.precio || 0,
        idProveedor: selectedProducto.idProveedor,
      });
    }
  }, [selectedProducto, reset]);

  const onSubmit = (data: Omit<Producto, "id_producto">) => {
    if (selectedProducto) {
      updateMutation.mutate({
        id: selectedProducto.idProducto,
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
          <h3>Productos</h3>
          <p className="text-muted mb-0">
            Administra tu catálogo y relaciona productos con proveedores.
          </p>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-5">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>{selectedProducto ? "Editar producto" : "Nuevo producto"}</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Código</label>
                  <input className="form-control" {...register("codigo")} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    className="form-control"
                    {...register("descripcion")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("stock", { valueAsNumber: true })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    {...register("precio", { valueAsNumber: true })}
                  />
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
                      <option
                        key={proveedor.idProveedor}
                        value={proveedor.idProveedor}
                      >
                        {proveedor.nombre}
                      </option>
                    ))}
                  </select>
                  {errors.idProveedor && (
                    <div className="text-danger mt-1">
                      {errors.idProveedor.message}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  {selectedProducto ? "Actualizar producto" : "Crear producto"}
                </button>
                {selectedProducto && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => {
                      setSelectedProducto(null);
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
              <h5>Lista de productos</h5>
              {isLoading ? (
                <p>Cargando productos...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Proveedor</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((producto) => (
                        <tr key={producto.idProducto}>
                          <td>{producto.idProducto}</td>
                          <td>{producto.codigo || "-"}</td>
                          <td>{producto.descripcion || "-"}</td>
                          <td>{producto.stock ?? "-"}</td>
                          <td>{producto.precio?.toFixed(2) ?? "-"}</td>
                          <td>
                            {proveedores.find(
                              (item) =>
                                item.idProveedor === producto.idProveedor,
                            )?.nombre || "-"}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => setSelectedProducto(producto)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deleteMutation.mutate(producto.idProducto)
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

export default Productos;
