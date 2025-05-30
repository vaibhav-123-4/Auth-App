import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
   

    try {
         const token = request.cookies.get("token")?.value;

    if (!token) {
        return null;
    }
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET_KEY! as string);
        return decoded; // Return the whole decoded object
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}