import { siteConfig } from "@/configs/site";
import { useHandleRouter } from "@/hooks/utils";
import { Button } from "@nextui-org/react";

export default function HomePage() {
    const { navigate } = useHandleRouter()


    return (
        <div className="flex flex-col gap-y-5 px-4 justify-center items-center h-full pt-10">
            <Button
                type="button"
                variant="solid"
                color="primary"
                size="lg"
                onClick={() => navigate(siteConfig.paths.findMatch())}
                className="w-[300px] mt-10"
            >
                GO TO FIND MATCH
            </Button>

        </div>
    )
}
