import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Proveedor, proveedoresService } from "../../services/entities";
import ProveedorFormModal from "./ProveedorFormModal";
import ProveedorDeleteModal from "./ProveedorDeleteModal";

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
  } = useForm<Omit<Proveedor, "id">>({
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
      reset({
        ruc: "",
        nombre: "",
        telefono: "",
        direccion: "",
        razonSocial: "",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Proveedor, "id">;
    }) => proveedoresService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
      setSelectedProveedor(null);
      reset({
        ruc: "",
        nombre: "",
        telefono: "",
        direccion: "",
        razonSocial: "",
      });
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

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState<Proveedor | null>(null);

  const onSubmit = (data: Omit<Proveedor, "id">) => {
    if (selectedProveedor) {
      updateMutation.mutate({
        id: selectedProveedor.id,
        payload: data,
      });
      return;
    }
    createMutation.mutate(data);
  };

  const openCreate = () => {
    setSelectedProveedor(null);
    reset({
      ruc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    });
    setShowModal(true);
  };

  const openEdit = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor);
    setShowModal(true);
  };

  const confirmDelete = (proveedor: Proveedor) => {
    setToDelete(proveedor);
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
          <h3>Proveedores</h3>
          <p className="text-muted mb-0">
            Gestiona tus proveedores y sus datos de contacto.
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-black" onClick={openCreate}>
          + Nuevo Proveedor
        </button>
      </div>

      <div className="row gy-4">
        <div className="col-12">
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
                        <tr key={proveedor.id}>
                          <td>{proveedor.id}</td>
                          <td>{proveedor.ruc}</td>
                          <td>{proveedor.nombre}</td>
                          <td>{proveedor.telefono || "-"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openEdit(proveedor)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmDelete(proveedor)}
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

      <ProveedorFormModal
        show={showModal}
        selectedProveedor={selectedProveedor}
        onClose={() => {
          setShowModal(false);
          setSelectedProveedor(null);
          reset({
            ruc: "",
            nombre: "",
            telefono: "",
            direccion: "",
            razonSocial: "",
          });
        }}
        onSubmit={(data) => {
          onSubmit(data);
          setShowModal(false);
        }}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />

      <ProveedorDeleteModal
        show={showDeleteModal}
        proveedor={toDelete}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={doDelete}
      />
    </div>
  );
};

export default Proveedores;
