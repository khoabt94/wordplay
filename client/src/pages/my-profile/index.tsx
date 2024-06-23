import { useAuthStore } from "@/stores";
import BannerProfile from "@/components/common/banner-profile";
import { useUpdateInfoMe } from "@/hooks/queries";
import { useToast } from "@/hooks/utils";

export default function MyProfilePage() {
    const { user } = useAuthStore()
    const { toastError, toastSuccess } = useToast()
    const { mutateAsync: updateInfoMe } = useUpdateInfoMe()
    if (!user) return <></>

    const onChangeAvatar = async (avatar: string) => {
        try {
            await updateInfoMe({ avatar })
            toastSuccess('Avatar uploaded!')
        } catch (error: any) {
            toastError(`Avatar failed!: ${error.message}`)
        }
    }

    const onChangeBanner = async (banner: string) => {
        try {
            await updateInfoMe({ banner })
            toastSuccess('Banner uploaded!')
        } catch (error: any) {
            toastError(`Banner failed!: ${error.message}`)
        }
    }

    const onChangeName = async (name: string) => {
        try {
            await updateInfoMe({ name })
            toastSuccess('Name changed!')
        } catch (error: any) {
            toastError(`Change name failed!: ${error.message}`)
        }
    }

    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-5">
            <BannerProfile
                user={user}
                isOwnProfile
                onChangeAvatar={onChangeAvatar}
                onChangeBanner={onChangeBanner}
                onChangeName={onChangeName}
            />
        </div>
    )
}
