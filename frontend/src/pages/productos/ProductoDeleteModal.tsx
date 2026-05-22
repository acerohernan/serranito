import ConfirmDeleteModal from "../../components/modals/ConfirmDeleteModal";
import type { Producto } from "../../services/entities";

type ProductoDeleteModalProps = {
  show: boolean;
  producto: Producto | null;
  onClose: () => void;
  onConfirm: () => void;
};

const ProductoDeleteModal = ({
  show,
  producto,
  onClose,
  onConfirm,
}: ProductoDeleteModalProps) => {
  return (
    <ConfirmDeleteModal
      show={show}
      message={
        producto
          ? `Esta acción no se puede deshacer. El producto ${producto.descripcion || producto.codigo} será eliminado permanentemente.`
          : "Esta acción no se puede deshacer. El producto será eliminado permanentemente."
      }
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default ProductoDeleteModal;
