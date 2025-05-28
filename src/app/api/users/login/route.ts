import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log("User found:");

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // Return success response with user data (excluding password)
        const { password: _, ...userData } = user.toObject();
        return NextResponse.json({ message: "Login successful", user: userData }, { status: 200 });

        //create token data
        const tokenData = {
            userId: user._id,
            email: user.email,
            username: user.username,
        };

        // Generate JWT token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

        // Return success response with token
        const response = NextResponse.json({ message: "Login successful", success: true, token }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
           
        });
        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}