import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
export default async function middleware(req, res) {
    if(req.nextUrl.pathname.startsWith("/pages/dashboard")) {
        const session =  req.cookies.get('next-auth.session-token');
        // let token = cookieStore.get('token');
        if(session) {
            return NextResponse.next();
        }
        else{
            return NextResponse.redirect(new URL("/pages/login",req.url));
        }
    }
}