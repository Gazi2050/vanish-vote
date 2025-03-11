import { RouteParams } from "@/constants/type";
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: RouteParams) => {
    try {
        const db = await connectDB();
        const pollCollection = db.collection("polls");
        const query = { _id: new ObjectId(params.id) };
        const result = await pollCollection.findOne(query);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};