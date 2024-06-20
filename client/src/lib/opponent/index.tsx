import { User, ScrollShadow } from "@nextui-org/react";

export default function OpponentList() {
    return (
        <ScrollShadow hideScrollBar className='flex flex-col gap-y-5 py-4 h-[600px]'>
            {Array(50).fill(1).map((_user, index) => (<User
                key={index}
                className='justify-start'
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                }}
            />))}
        </ScrollShadow>
    )
}
