'use client'

import { Avatar } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function UserControl() {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" className="cursor-pointer" />
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
