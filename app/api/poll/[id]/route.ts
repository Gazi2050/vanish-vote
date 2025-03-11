
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const db = await connectDB();
        const { id } = await params
        const pollCollection = db.collection("polls");
        const query = { _id: new ObjectId(id) };
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


export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const update = await req.json();
    const db = await connectDB();
    const pollCollection = db.collection("polls");
    // console.log(update, id)
    const query = { _id: new ObjectId(id) }
    const updatedDoc = {
        $set: {
            ...update,
        }
    }
    const result = await pollCollection.updateOne(query, updatedDoc)
    console.log(result)
    return NextResponse.json(result)

};