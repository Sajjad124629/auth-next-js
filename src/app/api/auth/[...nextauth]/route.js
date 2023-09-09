import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'
export const authOptions = {
    pages:{
        signIn:"/pages/login",
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.JWT_KEY,
    providers:[
        // GithubProvider({
        //     clientId:"7a5fdbcbb9b0f2d5ab79",
        //     clientSecret: "7047289d5ea8bdac115adb15afe32197d47ed2aa",
        //   }),
          CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                let email = credentials.email;
                let password = credentials.password;
                const cookieStore = cookies()

                let token = cookieStore.get('token');
                const queryString = new URLSearchParams(token.value);
               
                if(email == queryString.get("email") && password == queryString.get("password")){
                    const user = { id: "1", name: "Sajjad Hossain", email: "sh8170468@gmail.com" }
                    return user;
                }
               
                return null;
                
                
            }
          })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};