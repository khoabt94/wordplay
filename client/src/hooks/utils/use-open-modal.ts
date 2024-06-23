import { Common } from "@/interfaces";
import { useModalStore } from "@/stores";
import { ElementType } from "react";

export function useOpenModal() {
  const { openModal, removeAll } = useModalStore();

  const open = (element: ElementType, props: Common.ModalProps) => {
    openModal(element, {
      ...props,
      onSubmit: (data?: any) => {
        props.onSubmit?.(data);
        removeAll();
      },
      onClose: () => {
        props.onClose?.();
        removeAll();
      },
    })
  };

  const closeAll = () => {
    removeAll();
  };

  return { open, closeAll };
}
