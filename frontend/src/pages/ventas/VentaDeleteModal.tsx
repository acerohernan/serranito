import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import type { Venta } from "../../services/entities";

type VentaDeleteModalProps = {
  show: boolean;
  venta: Venta | null;
  onClose: () => void;
  onConfirm: () => void;
};

const VentaDeleteModal = ({
  show,
  venta,
  onClose,
  onConfirm,
}: VentaDeleteModalProps) => {
  return (
    <ConfirmDeleteModal
      show={show}
      message={
        venta
          ? `Esta acción no se puede deshacer. La venta #${venta.id} será eliminada permanentemente.`
          : "Esta acción no se puede deshacer. La venta será eliminada permanentemente."
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default VentaDeleteModal;
