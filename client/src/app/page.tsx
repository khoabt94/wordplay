import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import LoginModal from "@/components/modal/login";
import SignupModal from "@/components/modal/signup";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <Image src='/logo.webp' alt="Logo" width={360} height={360} quality={90} />
      <div className="flex gap-x-10 w-[300px] justify-center">
        <Link href={'/solo'} className="flex-1">
          <Button variant="solid" color="primary" className="w-full" radius="sm" size="lg">Solo</Button>
        </Link>
        <Link href={'/friend'} className="flex-1">
          <Button variant="solid" color="primary" className="w-full" radius="sm" size="lg">Friends</Button>
        </Link>
        <LoginModal />
        <SignupModal />
      </div>
    </div >
  );
}
