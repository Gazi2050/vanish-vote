/* eslint-disable */
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const poll = await req.json();
        const db = await connectDB();
        const pollCollection = await db.collection('polls');
        const result = await pollCollection.insertOne(poll);
        return NextResponse.json(result)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}