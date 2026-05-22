import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Cliente, clientesService } from "../../services/entities";
import ClienteFormModal from "./ClienteFormModal";
import ClienteDeleteModal from "./ClienteDeleteModal";

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
        razonSocial: selectedCliente.razonSocial || "",
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

      <ClienteFormModal
        show={showModal}
        selectedCliente={selectedCliente}
        onClose={() => {
          setShowModal(false);
          setSelectedCliente(null);
          reset({
            dniRuc: "",
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

      <ClienteDeleteModal
        show={showDeleteModal}
        cliente={toDelete}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={doDelete}
      />
    </div>
  );
};

export default Clientes;
