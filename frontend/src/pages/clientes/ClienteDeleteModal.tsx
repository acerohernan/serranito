import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import type { Cliente } from "../../services/entities";

type ClienteDeleteModalProps = {
  show: boolean;
  cliente: Cliente | null;
  onClose: () => void;
  onConfirm: () => void;
};

const ClienteDeleteModal = ({
  show,
  cliente,
  onClose,
  onConfirm,
}: ClienteDeleteModalProps) => {
  return (
    <ConfirmDeleteModal
      show={show}
      message={
        cliente
          ? `Esta acción no se puede deshacer. El cliente ${cliente.nombre} será eliminado permanentemente.`
          : "Esta acción no se puede deshacer. El cliente será eliminado permanentemente."
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default ClienteDeleteModal;
