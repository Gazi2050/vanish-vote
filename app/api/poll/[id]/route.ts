
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
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


export const PUT = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');  // Can still use searchParams to retrieve the ID
    const update = await req.json();
    const db = await connectDB();
    const pollCollection = db.collection("polls");

    if (!update) {
        return NextResponse.json({ message: "nothing to update" });
    }

    if (id) {
        const updatedDoc = {
            $set: {
                ...update,
            },
            $inc: {}
        };

        const optionId = update.selectedOption;
        updatedDoc.$inc[`options.${optionId}.votes`] = 1;

        const query = { _id: new ObjectId(id) };
        const result = await pollCollection.updateOne(query, updatedDoc);

        if (result.modifiedCount === 1) {
            return NextResponse.json({ message: "Poll updated successfully" });
        } else {
            return NextResponse.json({ message: "No changes made" });
        }
    }
    return NextResponse.json({ message: "Poll ID not found" });
};