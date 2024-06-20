import { useRouter } from "next/navigation"

export const useHandleRouter = () => {
  const router = useRouter()

  const pushRouter = (url: string) => router.push(url)

  return {
    pushRouter
  }
}