import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Clear the token cookie
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // Set expiration to the past to clear the cookie
        });
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}