import { db } from "@/db";
import { CustomError } from "@/errors";
import { attachCookiesToResponse, isTokenValid } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authenticateUser = async () => {
  const [refreshToken, accessToken] = cookies().getAll();
  if (!refreshToken || !accessToken) {
    return null;
  }
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken.value) as JwtPayload;

      return payload?.user;
    }
    const payload = isTokenValid(refreshToken.value) as JwtPayload;

    const existingToken = await db.token.findFirst({
      where: {
        user: payload?.user?.userId,
        refreshToken: payload?.refreshToken,
      },
    });

    if (!existingToken || !existingToken.isValid) {
      return null;
    }

    attachCookiesToResponse({
      user: payload.user,
      refreshToken: existingToken?.refreshToken,
    });

    return payload.user;
  } catch (error) {
    return null;
  }
};
