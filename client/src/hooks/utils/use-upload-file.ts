import { useState } from "react"
import { useToast } from "./use-toast"
import supabase from "@/lib/supabase"

export function useUploadFile() {
    const { toastError } = useToast()
    const [isUploading, setIsUploading] = useState(false)
    const uploadFile = async (file: File, onSuccess: (_imageUrl: string) => void) => {
        const randomName = `public/images-${Math.random()}.png`
        try {
            setIsUploading(true)
            const { data } = await supabase
                .storage
                .from('images')
                .upload(randomName, file, {
                    cacheControl: '3600',
                    upsert: false
                })
            if (!data) {
                throw new Error("Fail to upload image")
            }
            const baseUrl = import.meta.env.VITE_SUPABASE_URL as string
            const imageString = `${baseUrl}/storage/v1/object/public/images/${data.path}`
            onSuccess(imageString)
        } catch (error) {
            toastError("Fail to upload image")
        } finally {
            setIsUploading(false)
        }

    }

    return { uploadFile, isUploading }
}