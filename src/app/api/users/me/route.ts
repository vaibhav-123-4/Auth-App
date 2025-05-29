import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse , NextRequest } from "next/server";
import User from "@/models/usermodel";
import {connect} from "@/dbConfig/dbConfig";
connect();


export async function GET(request: NextRequest) {
 try{
    const userId = getDataFromToken(request);
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findOne({
        _id: userId._id

    });
    select : "-password " // Exclude password 
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
} catch (error) {
    return NextResponse.json({ error: "An error occurred while fetching user data." }, { status: 500 });
}
}
