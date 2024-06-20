import { useModalStore } from "@/stores";

export function ModalProvider() {
  const { modals } = useModalStore();

  return (
    <>
      {modals.map(({ Component, modalProps }, index) => (
        <Component
          key={index}
          {...modalProps}
        />
      ))}
    </>
  );
}
