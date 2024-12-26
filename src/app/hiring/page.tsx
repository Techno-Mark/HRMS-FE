"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Hiring = () => {
   const router = useRouter();

  const handleRedirect = () => {
    router.push("/applicant");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] gap-[20px]">
      <Image src="/images/joinourteam.jpg" alt="join-team" width={500} height={700}/>
      <div className="flex items-center gap-4">
        <Link href="/applicant">
          <Image src="/images/applicantqr.png" alt="QR" width={100} height={100}/>
        </Link>
        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Apply Here
        </Button>
      </div>
    </div>
  )
}

export default Hiring