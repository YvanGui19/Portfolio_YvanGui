import { Modal, ModalButton } from "./Modal";
import { HiExclamation, HiTrash, HiCheck, HiInformationCircle } from "react-icons/hi";

const iconMap = {
  danger: HiTrash,
  warning: HiExclamation,
  success: HiCheck,
  info: HiInformationCircle,
  default: HiInformationCircle,
};

const iconColors = {
  danger: "text-red",
  warning: "text-orange",
  success: "text-lime",
  info: "text-violet",
  default: "text-cyan",
};

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "danger",
  loading = false,
}) {
  const IconComponent = iconMap[variant] || iconMap.default;
  const iconColor = iconColors[variant] || iconColors.default;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      tag="CONFIRM_ACTION"
      variant={variant}
      size="sm"
      actions={
        <>
          <ModalButton variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </ModalButton>
          <ModalButton variant={variant} onClick={handleConfirm} disabled={loading}>
            {loading ? "..." : confirmText}
          </ModalButton>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 border border-white/10 bg-black/30 flex items-center justify-center ${iconColor}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-off-white leading-relaxed">{message}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
