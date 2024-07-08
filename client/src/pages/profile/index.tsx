import BannerProfile from "@/components/common/banner-profile";
import LayoutProfile from "@/lib/profile";

export default function PlayerProfilePage() {

    if (!user) return <></>

    return (
        <LayoutProfile isOwnProfile={false} user={user}>
            <BannerProfile
                user={user}
                isOwnProfile={false}
            />
        </LayoutProfile>

    )
}
