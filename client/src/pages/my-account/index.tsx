import UserAvatar from "@/components/common/user-avatar";
import UserElo from "@/components/common/user-elo";
import { useAuthStore } from "@/stores";

export default function MyAccountPage() {
    const { user } = useAuthStore()
    if (!user) return <></>


    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-5">
            <div
                className='h-[200px] rounded-lg w-full flex items-center justify-center relative'
                style={{
                    backgroundImage: "url(" + user?.banner + ")",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}

            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute top-1/2 -translate-y-1/2 md:left-5 md:translate-x-0 left-1/2 -translate-x-1/2 z-10 flex flex-col md:flex-row gap-x-4 gap-y-2 items-center">
                    <UserAvatar user={user} className=" w-[100px] h-[100px]" />
                    <div className="flex flex-col gap-y-1 justify-center md:justify-start">
                        <p className="text-black font-bold text-xl md:text-2xl text-center md:text-left block w-full">{user.name}</p>
                        <UserElo
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
