import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <Image src='/logo.webp' alt="Logo" width={360} height={360} quality={90} />
      <div className="flex gap-x-10 w-[300px]">
        <Link href={'/solo'} className="flex-1">
          <Button variant="solid" color="primary" className="w-full" radius="sm" size="lg">Solo</Button>
        </Link>
        <Link href={'/friend'} className="flex-1">
          <Button variant="solid" color="primary" className="w-full" radius="sm" size="lg">Friends</Button>
        </Link>
      </div>
    </div>
  );
}
