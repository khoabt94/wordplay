import { useToast as useToastContext } from "@/components/toast/use-toast"

export function useToast() {
  const { toast } = useToastContext()

  const toastSuccess = (message: string) => {
    toast({
      title: message,
      variant: "default"
    })
  }

  const toastError = (message: string) => {
    toast({
      title: message,
      variant: "destructive"
    })
  }

  return { toastSuccess, toastError }
}