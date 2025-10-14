"use client";

interface DeleteProductModalProps {
  productId: number;
  productName: string;
  onConfirm: () => void;
}

export function DeleteProductModal({
  productId,
  productName,
  onConfirm,
}: DeleteProductModalProps) {
  const closeModal = () => {
    const popover = document.getElementById(
      `delete-product-modal-${productId}`
    ) as HTMLElement & { hidePopover?: () => void };
    if (popover && popover.hidePopover) {
      popover.hidePopover();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div
      popover="auto"
      id={`delete-product-modal-${productId}`}
      className="popover bg-zinc-900 text-white m-auto rounded-lg shadow-xl max-w-md w-full backdrop:bg-black backdrop:bg-opacity-50 border border-zinc-800"
    >
      <div className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Confirmar eliminación</h2>
        <button
          onClick={closeModal}
          className="text-3xl font-bold leading-none transition-colors cursor-pointer hover:text-gray-400"
          aria-label="Cerrar modal"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-300">
          ¿Estás seguro de que deseas eliminar el producto?
        </p>
        <p className="text-sm text-gray-400">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
