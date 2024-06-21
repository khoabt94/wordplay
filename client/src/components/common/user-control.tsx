
import { useAuthStore } from "@/stores";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function UserControl() {
    const { user } = useAuthStore()
    if (!user) return null
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar
                    name={user.name.slice(0, 2).toUpperCase()}
                    isBordered
                    src={user.avatar}
                    size="lg"
                    className="cursor-pointer"
                    color="primary"
                />

            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">Your account</DropdownItem>
                <DropdownItem key="copy">Your games</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
