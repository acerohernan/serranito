import ModalShell from "./ModalShell";

type ConfirmDeleteModalProps = {
  show: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  show,
  title = "¿Confirmar eliminación?",
  message,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <ModalShell show={show} title={title} onClose={onClose} centered>
      <div className="d-flex justify-content-center mb-3">
        <div className="confirm-delete-icon">🗑️</div>
      </div>
      <p className="text-muted">{message}</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-outline-secondary" onClick={onClose}>
          No, mantener
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Sí, eliminar
        </button>
      </div>
    </ModalShell>
  );
};

export default ConfirmDeleteModal;
