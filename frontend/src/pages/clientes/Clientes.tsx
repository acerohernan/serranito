import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Cliente, clientesService } from "../../services/entities";

const Clientes = () => {
  const queryClient = useQueryClient();
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Cliente, "id">>({
    defaultValues: {
      dniRuc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    },
  });

  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: clientesService.list,
  });

  const createMutation = useMutation({
    mutationFn: clientesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<Cliente, "id">;
    }) => clientesService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      reset({
        dniRuc: "",
        nombre: "",
        telefono: "",
        direccion: "",
        razonSocial: "",
      });
      setSelectedCliente(null);
    },
  });

  const onSubmit = (data: Omit<Cliente, "id">) => {
    if (selectedCliente) {
      updateMutation.mutate({ id: selectedCliente.id, payload: data });
      return;
    }
    createMutation.mutate(data);
  };

  const deleteMutation = useMutation({
    mutationFn: clientesService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clientes"] }),
  });

  useEffect(() => {
    if (selectedCliente) {
      reset({
        dniRuc: selectedCliente.dniRuc,
        nombre: selectedCliente.nombre,
        telefono: selectedCliente.telefono || "",
        direccion: selectedCliente.direccion || "",
      });
    }
  }, [selectedCliente, reset]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState<Cliente | null>(null);

  const openCreate = () => {
    setSelectedCliente(null);
    reset({
      dniRuc: "",
      nombre: "",
      telefono: "",
      direccion: "",
      razonSocial: "",
    });
    setShowModal(true);
  };

  const openEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const confirmDelete = (cliente: Cliente) => {
    setToDelete(cliente);
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
          <h3>Clients Database</h3>
          <p className="text-muted mb-0">
            Manage and organize your enterprise customer records with high
            precision.
          </p>
        </div>
        <div>
          <button className="btn btn-black" onClick={openCreate}>
            + Nuevo Cliente
          </button>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-12">
          <div className="card border-secondary shadow-sm">
            <div className="card-body">
              <h5>Lista de clientes</h5>
              {isLoading ? (
                <p>Cargando clientes...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>DNI/RUC</th>
                        <th>Nombre</th>
                        <th>R. Social</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                          <td>{cliente.id}</td>
                          <td>{cliente.dniRuc}</td>
                          <td>{cliente.nombre}</td>
                          <td>{cliente.razonSocial}</td>
                          <td>{cliente.telefono}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => openEdit(cliente)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => confirmDelete(cliente)}
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

      {/* Create / Edit modal */}
      {showModal && (
        <>
          <div
            className="custom-modal-backdrop"
            onClick={() => setShowModal(false)}
          />
          <div className="custom-modal">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedCliente ? "Editar Cliente" : "Crear Nuevo Cliente"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleSubmit((data) => {
                  onSubmit(data);
                  setShowModal(false);
                })}
              >
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
                      <div className="text-danger mt-1">
                        {errors.dniRuc.message}
                      </div>
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
                      <div className="text-danger mt-1">
                        {errors.nombre.message}
                      </div>
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
                    <input
                      className="form-control"
                      {...register("razonSocial")}
                    />
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
                    onClick={() => {
                      setShowModal(false);
                      setSelectedCliente(null);
                      reset();
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-black">
                    {selectedCliente ? "Guardar cambios" : "Guardar Cliente"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <>
          <div
            className="custom-modal-backdrop"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="custom-modal text-center">
            <div className="modal-body">
              <div className="d-flex justify-content-center mb-3">
                <div className="confirm-delete-icon">🗑️</div>
              </div>
              <h4>¿Confirmar eliminación?</h4>
              <p className="text-muted">
                Esta acción no se puede deshacer. Los datos del cliente se
                borrarán permanentemente del sistema.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  No, mantener
                </button>
                <button className="btn btn-danger" onClick={doDelete}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Clientes;
