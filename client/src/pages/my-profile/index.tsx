import BannerProfile from "@/components/common/banner-profile";
import { useUpdateMyProfile } from "@/hooks/queries";
import { useToast } from "@/hooks/utils";
import LayoutProfile from "@/lib/profile";
import { useAuthStore } from "@/stores";

export default function MyProfilePage() {
    const { user } = useAuthStore()
    const { toastError, toastSuccess } = useToast()
    const { mutateAsync: updateMyProfile } = useUpdateMyProfile()
    if (!user) return <></>

    const onChangeAvatar = async (avatar: string) => {
        try {
            await updateMyProfile({ avatar })
            toastSuccess('Avatar uploaded!')
        } catch (error: any) {
            toastError(`Avatar failed!: ${error.message}`)
        }
    }

    const onChangeBanner = async (banner: string) => {
        try {
            await updateMyProfile({ banner })
            toastSuccess('Banner uploaded!')
        } catch (error: any) {
            toastError(`Banner failed!: ${error.message}`)
        }
    }

    const onChangeName = async (name: string) => {
        try {
            await updateMyProfile({ name })
            toastSuccess('Name changed!')
        } catch (error: any) {
            toastError(`Change name failed!: ${error.message}`)
        }
    }

    return (
        <LayoutProfile isOwnProfile user={user}>
            <BannerProfile
                user={user}
                isOwnProfile
                onChangeAvatar={onChangeAvatar}
                onChangeBanner={onChangeBanner}
                onChangeName={onChangeName}
            />
        </LayoutProfile>
    )
}
