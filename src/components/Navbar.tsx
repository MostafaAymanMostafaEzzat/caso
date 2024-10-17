import Link from "next/link";
import MaxWidthWithWrapper from "./MaxwidthWithWrapper";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import { ArrowRight } from "lucide-react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

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
                <Link
                  className={cn(buttonVariants({ variant: "ghost" }))}
                  href="/api/auth/logout"
                >
                  Sign out
                </Link>
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
                <RegisterLink>register</RegisterLink>

                <LoginLink>login</LoginLink>
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
