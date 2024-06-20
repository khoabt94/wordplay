/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Common {
  interface Option {
    value: string
    label: string
  }

  interface Pagination {
    page: number
    limit: number
    total: number
  }

  interface ModalBaseData {
    Component: ElementType
    modalProps: ModalProps
  }


  interface ModalProps {
    className?: string
    onOpenChange?: (_flag: boolean) => void;
    open?: boolean
    onClose?: () => void;
    onSubmit?: (data?: any) => void;
    onCancel?: () => void;
    [key: string]: any;
  }
}