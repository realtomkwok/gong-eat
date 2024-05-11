import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl}}) {
            const isLoggedIn = !!auth?.user
            const isAtHome = nextUrl.pathname === "/"
            if (isAtHome) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl))
            }
            return true
        },
    },
    providers: [],
} satisfies NextAuthConfig