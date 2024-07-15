import AppLoading from "@/components/common/app-loading";
import BannerProfile from "@/components/common/banner-profile";
import { siteConfig } from "@/configs/site";
import { useGetPlayerProfile } from "@/hooks/queries";
import { User } from "@/interfaces";
import LayoutProfile from "@/lib/profile";
import { useMemo } from "react";
import { redirect, useParams } from "react-router-dom";

export default function PlayerProfilePage() {
    const { profileId } = useParams()
    const { data: dataPlayerProfile, isLoading } = useGetPlayerProfile({ user_id: profileId as string })
    const playerProfile = useMemo(() => dataPlayerProfile?.user, [dataPlayerProfile])
    if (isLoading) {
        return <AppLoading className="h-screen" />
    }

    if (!isLoading && !playerProfile) {
        redirect(siteConfig.paths.notFound())
        return <></>
    }

    return (
        <LayoutProfile isOwnProfile={false} user={playerProfile}>
            <BannerProfile
                user={playerProfile as User.Detail}
                isOwnProfile={false}
            />
        </LayoutProfile>

    )
}
