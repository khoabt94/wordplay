
import { siteConfig } from "@/configs/site";
import { useAuthActions, useOpenModal } from "@/hooks/utils";
import { useAuthStore } from "@/stores";
import { getUserLevel } from "@/utils/get-rank";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../modal/confirm-modal";

export default function UserControl() {
    const { user } = useAuthStore()
    const { logout } = useAuthActions()
    const { open } = useOpenModal()
    const rankUser = getUserLevel(user?.elo || 0)

    const handleClickLogout = () => {
        open(ConfirmModal, {
            text: 'Are you sure to logout?',
            onSubmit: logout
        })
    }

    if (!user) return null
    return (
        <Dropdown >
            <DropdownTrigger>
                <Avatar
                    name={user.name.slice(0, 2).toUpperCase()}
                    isBordered
                    src={user.avatar}
                    size="lg"
                    className="cursor-pointer"
                    color={rankUser.color}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="account">
                    <Link to={siteConfig.paths.myProfile()}>
                        My profile
                    </Link>
                </DropdownItem>
                <DropdownItem key="matches">
                    <Link to={siteConfig.paths.myMatches()}>
                        My matches
                    </Link>
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleClickLogout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}