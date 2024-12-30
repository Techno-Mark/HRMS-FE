"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Hiring = () => {
   const router = useRouter();

  const handleRedirect = () => {
    router.push("/application");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-[20px]">
        <Link href="/application">
          <Image src="/images/qrcode.png" alt="QR" width={150} height={150}/>
        </Link>
        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Apply Here
        </Button>
    </div>
  )
}

export default Hiring