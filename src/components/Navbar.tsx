
import Link from "next/link";
import MaxWidthWithWrapper from "./MaxwidthWithWrapper";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./button";
import { ArrowRight } from "lucide-react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { authenticateUser } from "@/middleware/authenticateUser";
import { db } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "./logout/client";


export default async function Navbar() {
  const user =await authenticateUser()
  const isAdmin = user?.role

  return (
    <div className="sticky top-0 inset-x-0 w-full bg-slate-100/30 border-b border-zinc-950/20 border-solid py-5 backdrop-blur-lg z-[9999999999999999]">
      <MaxWidthWithWrapper>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl text-zinc-950/85">
            case
            <span className="text-green-600">cobra</span>
          </h1>

          <div className="flex gap-5 items-center">
            {user ? (
              <div className="flex items-center gap-2">
              <LogoutButton user={user}/>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {" "}
                <Link
                    href="/auth/Register"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Register 
                  </Link>

                  <Link
                    href="/auth/Login"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Login 
                  </Link>
              </div>
            )}
            <div className="text-center  relative ml-4">
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "mx-auto  ",
                })}
                href="/configure/upload"
              >
                Create case <ArrowRight className="h-4 w-4 ml-1.5 " />
              </Link>
              <span className="absolute inset-y-0 w-[1px] bg-zinc-200 -left-6 hidden sm:block" />
            </div>
          </div>
        </div>
      </MaxWidthWithWrapper>
    </div>
  );
}
