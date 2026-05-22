import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type Producto,
  productosService,
  proveedoresService,
  type Proveedor,
} from "../../services/entities";
import ProductoFormModal from "./ProductoFormModal";
import ProductoDeleteModal from "./ProductoDeleteModal";

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
  } = useForm<Omit<Producto, "id">>({
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
      reset({
        codigo: "",
        descripcion: "",
        stock: 0,
        precio: 0,
        idProveedor: undefined,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Producto, "id">;
    }) => productosService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setSelectedProducto(null);
      reset({
        codigo: "",
        descripcion: "",
        stock: 0,
        precio: 0,
        idProveedor: undefined,
      });
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

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState<Producto | null>(null);

  const onSubmit = (data: Omit<Producto, "id">) => {
    if (selectedProducto) {
      updateMutation.mutate({
        id: selectedProducto.id,
        payload: data,
      });
      return;
    }
    createMutation.mutate(data);
  };

  const openCreate = () => {
    setSelectedProducto(null);
    reset({
      codigo: "",
      descripcion: "",
      stock: 0,
      precio: 0,
      idProveedor: undefined,
    });
    setShowModal(true);
  };

  const openEdit = (producto: Producto) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const confirmDelete = (producto: Producto) => {
    setToDelete(producto);
    setShowDeleteModal(true);
  };

  const doDelete = () => {
    if (toDelete) {
      deleteMutation.mutate(toDelete.id);
    }
    setShowDeleteModal(false);
    setToDelete(null);
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

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-black" onClick={openCreate}>
          + Nuevo Producto
        </button>
      </div>

      <div className="row gy-4">
        <div className="col-12">
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
                        <tr key={producto.id}>
                          <td>{producto.id}</td>
                          <td>{producto.codigo || "-"}</td>
                          <td>{producto.descripcion || "-"}</td>
                          <td>{producto.stock ?? "-"}</td>
                          <td>{producto.precio?.toFixed(2) ?? "-"}</td>
                          <td>
                            {proveedores.find(
                              (item) => item.id === producto.idProveedor,
                            )?.nombre || "-"}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openEdit(producto)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmDelete(producto)}
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

      <ProductoFormModal
        show={showModal}
        selectedProducto={selectedProducto}
        onClose={() => {
          setShowModal(false);
          setSelectedProducto(null);
          reset({
            codigo: "",
            descripcion: "",
            stock: 0,
            precio: 0,
            idProveedor: undefined,
          });
        }}
        onSubmit={(data) => {
          onSubmit(data);
          setShowModal(false);
        }}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        proveedores={proveedores}
      />

      <ProductoDeleteModal
        show={showDeleteModal}
        producto={toDelete}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={doDelete}
      />
    </div>
  );
};

export default Productos;
