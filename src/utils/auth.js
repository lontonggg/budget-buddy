import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 3 * 60 * 60
    },
    pages: {
        signIn: "/login",
        signOut: "/login"
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
            name: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if(!credentials?.name || !credentials?.password){
                    return null;
                }

                const existingUser = await prisma.user.findFirst({
                    where: {name: credentials?.name}
                });

                if(!existingUser){
                    return null;
                }

                console.log(existingUser)

                const passwordMatch = await compare(credentials.password, existingUser.password);
                if(!passwordMatch){
                    return null;
                }
    
                return {
                    id: `${existingUser.id}`,
                    name: existingUser.name,
                    balance: existingUser.balance,
                    expense: existingUser.expense,
                    income: existingUser.income
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                return{
                    ...token,
                    name: user.name,
                    id: user.id,
                    balance: user.balance,
                    expense: user.expense,
                    income: user.income,

                }
            }
            return token
        },
        async session({session, token}){
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name,
                    id: token.id,
                    balance: token.balance,
                    income: token.income
                }
            }
        }
       
    }
}