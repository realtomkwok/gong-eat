import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from "@auth/core/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            authorize: async (credentials) => {
                let user = null

                user = await getUserFromDb()
            }
            }
        ),
        GitHub
    ]
})

