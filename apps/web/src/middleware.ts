import { auth } from "@buildit/auth";

import {
  apiAuthPrefix,
  authRoutes,
  onboardingRoutes,
  publicRoutes,
} from "@/routes";
import { getUser } from "./lib/data/user/get-user";
import { getWorkspaceSlug } from "./lib/data/workspace/get-workspace-slug";

export default auth(async (req): Promise<any> => {
  const { nextUrl } = req;
  const isLoggedIn = Boolean(req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = onboardingRoutes.includes(nextUrl.pathname);

  const session = req.auth?.user;

  const user = await getUser();

  let isOnboarded = false;
  if (session) {
    isOnboarded = user?.onboarding ?? false;
  }

  if (isApiAuthRoute) {
    return null;
  }
  const workspaceSlug = await getWorkspaceSlug();

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (!isOnboarded) {
        return Response.redirect(new URL("/getting-started", nextUrl));
      }
      return Response.redirect(new URL(`/${workspaceSlug}/my-issues`, nextUrl));
    }
    return null;
  }

  if (isOnboardingRoute) {
    if (isLoggedIn && isOnboarded) {
      return Response.redirect(new URL(`/${workspaceSlug}/my-issues`, nextUrl));
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
