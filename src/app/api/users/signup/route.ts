import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextResponse,NextRequest } from "next/server";
import bcrypt from "bcryptjs";


export  async function POST(req: NextRequest){
   try{
    await connect();
    const reqBody = await req.json();
    const {username, email, password} = reqBody;
    // Check if user already exists
    const user = await User.findOne({ email: email });
    if(user){
        return NextResponse.json({message:"User already exists"}, {status:400});
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    await newUser.save();
    return NextResponse.json({message:"User created successfully"}, {status:201});
   }
   catch(err){
       console.log(err);
       return NextResponse.json({message:"Internal Server Error"}, {status:500});
   }
}