import { Common } from "@/interfaces";
import { useModalStore } from "@/stores";
import { ElementType } from "react";

export function useOpenModal() {
  const { openModal, removeAll } = useModalStore();

  const open = (element: ElementType, props: Common.ModalProps) => {
    openModal(element, {
      ...props,
      onSubmit: () => {
        props.onSubmit?.();
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
