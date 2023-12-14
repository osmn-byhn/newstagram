import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: '',
            clientSecret: ''
        }),
    ],
    secret: process.env.NEXTAUTH_URL,
    
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
