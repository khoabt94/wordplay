import { User } from "@/interfaces"
import UserAvatar from "../user-avatar"
import { Button, Input } from "@nextui-org/react"
import { Pencil } from "lucide-react"
import UserElo from "../user-elo"
import { ChangeEvent, useRef, useState } from "react"
import { useOpenModal, useUploadFile } from "@/hooks/utils"
import ChangeNameModal from "@/components/modal/change-name-modal"

type Props = {
    user: User.Detail
    isOwnProfile: boolean
    onChangeAvatar?: (_url: string) => void
    onChangeBanner?: (_url: string) => void
    onChangeName?: (_name: string) => void
}

export default function BannerProfile({ user, isOwnProfile, onChangeAvatar, onChangeBanner, onChangeName }: Props) {
    const avatarInputRef = useRef<HTMLInputElement>(null)
    const bannerInputRef = useRef<HTMLInputElement>(null)
    const { uploadFile } = useUploadFile()
    const { open } = useOpenModal()

    const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            await uploadFile(file, (imageUrl: string) => onChangeAvatar?.(imageUrl))
        }
    }

    const handleUploadBanner = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            await uploadFile(file, (imageUrl: string) => onChangeBanner?.(imageUrl))
        }
    }

    const handleOpenModalChangeName = () => {
        open(ChangeNameModal, {
            initialValue: user.name,
            onSubmit: (name) => onChangeName?.(name)
        })
    }

    return (
        <div
            className='h-[200px] rounded-lg w-full flex items-center justify-center relative'
            style={{
                backgroundImage: "url(" + user?.banner + ")",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}

        >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute top-1/2 -translate-y-1/2 md:left-5 md:translate-x-0 left-1/2 -translate-x-1/2 z-10 flex flex-col md:flex-row gap-x-4 gap-y-2 items-center">
                <div className="relative">
                    <UserAvatar user={user} className=" w-[100px] h-[100px]" />
                    {isOwnProfile ? (
                        <Button
                            className="absolute bottom-0 right-0 p-0 w-8 h-8 min-w-0 bg-gray-400 border-gray-500"
                            variant="ghost"
                            radius="full"
                            onPress={() => avatarInputRef?.current?.click()}
                        >
                            <Pencil size={16} />
                        </Button>
                    ) : null}

                </div>
                <div className="flex flex-col gap-y-1 justify-center md:justify-start">
                    <div className="flex gap-x-2 relative">
                        <p className="text-white font-bold text-xl md:text-2xl text-center md:text-left block w-full">{user.name}</p>

                        {(isOwnProfile) ? (
                            <Button
                                className="p-0 w-8 h-8 min-w-0 bg-transparent border-none absolute right-0 translate-x-full top-1/2 -translate-y-1/2"
                                variant="ghost"
                                radius="full"
                                onPress={handleOpenModalChangeName}
                            >
                                <Pencil size={16} />
                            </Button>
                        ) : null}
                    </div>
                    <UserElo
                        user={user}
                        className="mx-auto md:mx-0"
                    />
                </div>
            </div>
            {isOwnProfile ? (
                <Button
                    className="absolute top-3 right-3 p-0 w-8 h-8 min-w-0 bg-gray-400 border-gray-500"
                    variant="ghost"
                    radius="full"
                    onPress={() => bannerInputRef?.current?.click()}
                >
                    <Pencil size={16} />
                </Button>
            ) : null}
            <input type="file" id='change-avatar' className="hidden" ref={avatarInputRef} onChange={handleUploadAvatar} />
            <input type="file" id='change-banner' className="hidden" ref={bannerInputRef} onChange={handleUploadBanner} />
        </div>
    )
}
