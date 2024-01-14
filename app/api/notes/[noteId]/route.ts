import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, {params}: {params: {noteId: string}}) {
    try {
        const note = await db.note.findUnique({
            where: {
                id: params.noteId
            }
        })
        if(!note) return new NextResponse("Note not found", {status: 404})
        await db.note.delete({
    where: {
        id: note.id
    }})
    return new NextResponse("Note deleted successfully", {status: 200})
    } catch (error) {
        console.log("DELETE NOTE ERROR", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}