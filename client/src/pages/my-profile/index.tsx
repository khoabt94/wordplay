import { useAuthStore } from "@/stores";
import BannerProfile from "@/components/common/banner-profile";
import { useGetMyMatches, useUpdateMyProfile } from "@/hooks/queries";
import { useToast } from "@/hooks/utils";
import { useMemo } from "react";
import { ScrollShadow } from "@nextui-org/react";
import Match from "./components/match";

export default function MyProfilePage() {
    const { user } = useAuthStore()
    const { toastError, toastSuccess } = useToast()
    const { mutateAsync: updateMyProfile } = useUpdateMyProfile()
    const { data: dataMatches } = useGetMyMatches()
    const matches = useMemo(() => dataMatches?.matches || [], [dataMatches])
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
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-5">
            <BannerProfile
                user={user}
                isOwnProfile
                onChangeAvatar={onChangeAvatar}
                onChangeBanner={onChangeBanner}
                onChangeName={onChangeName}
            />

            <div className="relative w-full flex items-center justify-between">
                <h3 className="bg-gray-900 block z-10 px-2">Your recent matches</h3>
                <div className="absolute h-[0.5px] w-full bg-gray-500 top-1/2 translate-y-1/2" />
            </div>
            <ScrollShadow size={0} hideScrollBar className="mt-2 h-[500px] w-full overflow-x-hidden">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {matches.map((match) => (
                        <Match key={match.match_id} match={match} />
                    ))}
                </div>

            </ScrollShadow>
        </div>
    )
}
