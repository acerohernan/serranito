import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import type { Proveedor } from "../../services/entities";

type ProveedorDeleteModalProps = {
  show: boolean;
  proveedor: Proveedor | null;
  onClose: () => void;
  onConfirm: () => void;
};

const ProveedorDeleteModal = ({
  show,
  proveedor,
  onClose,
  onConfirm,
}: ProveedorDeleteModalProps) => {
  return (
    <ConfirmDeleteModal
      show={show}
      message={
        proveedor
          ? `Esta acción no se puede deshacer. El proveedor ${proveedor.nombre} será eliminado permanentemente.`
          : "Esta acción no se puede deshacer. El proveedor será eliminado permanentemente."
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default ProveedorDeleteModal;
