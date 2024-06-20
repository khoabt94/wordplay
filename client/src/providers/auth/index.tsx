import AppLoading from "@/components/common/app-loading"
import { useAuthStore } from "@/stores"
import { ReactNode, useEffect } from "react"


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { isFetchingUser, refreshToken, setIsFetchingUser } = useAuthStore()
    const handleRefreshToken = async () => {
        try {
            await refreshToken()
        } catch (error) {
            console.error(error)
        } finally {
            setIsFetchingUser(false)
        }
    }



    useEffect(() => {
        handleRefreshToken()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isFetchingUser) return <AppLoading />

    return children
}
