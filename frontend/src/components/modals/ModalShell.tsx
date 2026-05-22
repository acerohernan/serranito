import type { ReactNode } from "react";

type ModalShellProps = {
  show: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  centered?: boolean;
};

const ModalShell = ({
  show,
  title,
  onClose,
  children,
  centered,
}: ModalShellProps) => {
  if (!show) return null;

  return (
    <>
      <div className="custom-modal-backdrop" onClick={onClose} />
      <div className={`custom-modal${centered ? " text-center" : ""}`}>
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </>
  );
};

export default ModalShell;
