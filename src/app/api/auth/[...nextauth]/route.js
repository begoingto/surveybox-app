import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import {getFullName} from "@/lib/siteConfig";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            profile: async (profile) => {
                const { email, family_name, given_name,picture, sub } = profile
                const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: process.env.NEXT_PUBLIC_SECRET_KEY,
                        user: {
                            firstName: family_name,
                            lastName: given_name,
                            email: email,
                            isActive: true,
                            isVerified: true,
                            avatar: picture,
                            providerAccountId: sub,
                            providerName: "google",
                        }
                    }),
                });
                const res = await resp.json();
                if (resp.ok && res) {
                    const data = {
                        ...res.data,
                        authMeDto: {
                            ...res.data.authMeDto,
                            firstName:  res.data.authMeDto.firstName ? res.data.authMeDto.firstName : profile.given_name,
                            lastName: res.data.authMeDto.lastName ? res.data.authMeDto.lastName : profile.family_name,
                            avatar: res.data.authMeDto.avatar ? res.data.authMeDto.avatar : profile.picture,
                        }
                    }
                    return  {
                        id: profile.sub,
                        name: profile.name,
                        email: profile.email,
                        image: JSON.stringify(data),
                    }
                }

                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
        CredentialsProvider({
            type: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const credentialDetails = {
                    email: credentials.email,
                    password: credentials.password,
                };
                const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentialDetails),
                });
                const res = await resp.json();

                if (resp.ok && res) {
                    const user = {
                        email: res.data.authMeDto.email,
                        name: getFullName(res.data.authMeDto),
                        image: JSON.stringify(res.data),
                    }
                    return  user
                }

                if (!res.ok) {
                    throw new Error(JSON.stringify(res));
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
