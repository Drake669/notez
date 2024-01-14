import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try {  
        const { title } = await req.json()
        const existingNote = await db.note.findUnique({
            where: {
                title
            }
        })

        if(existingNote) return new NextResponse("Note with this title already exist", {status: 400})
        const newNote = await db.note.create({
            data: {
                title
            }
        })
        return NextResponse.json(newNote)
    } catch (error) {
        console.log("NOTE CREATION ERROR", error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
  
}

export async function GET(req:Request) {
    try {
        const notes = await db.note.findMany()
        return NextResponse.json(notes)
    } catch (error) {
        console.log("GET NOTES ERROR", error)
        return new NextResponse("Internal Server Error", {status:500})
    }
}