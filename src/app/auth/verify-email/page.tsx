import axios from "axios";
import { error } from "console";
import Link from "next/link";
import { Suspense } from "react";

export default async function ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-email`,searchParams
    );
    return (
      <div className="mx-auto mt-20 bg-green-400/70 font-semibold text-xl">
        Account Confirmed
        <Link href="/auth/Login" className="cursor-pointer ">Please login</Link>
      </div>
    );
  } catch (error : any) {
    return <div className="mx-auto mt-20 bg-green-950  font-semibold text-xl">{error.response?.data?.message || "something went wrong"}</div>;
  }
}
