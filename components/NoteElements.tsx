"use client";

import { MoreHorizontal, NotebookPen } from "lucide-react";
import { Button } from "./ui/button";
import NoteDropdown from "./NoteDropdown";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import toast from "react-hot-toast";

const NoteElements = () => {
  const [notes, setNotes] = useState<Note[] | []>([]);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const response = await axios.get("/api/notes");
        setNotes(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data || "An error occurred";
          toast.error(errorMessage);
        } else {
          const errorMessage = (error as Error).message || "An error occurred";
          toast.error(errorMessage);
        }
      }
    };
    getAllNotes();
  }, []);

  if (notes.length === 0) return null;
  return (
    <>
      {notes.map((note) => (
        <Button
          key={note.id}
          variant={"ghost"}
          className="flex items-center justify-between w-full text-slate-500 "
        >
          <Link href={`/${note.id}`}>
            <div className="text-md flex items-center">
              <NotebookPen className="h-4 w-4 mr-2" />
              {note.title}
            </div>
          </Link>
          <NoteDropdown noteId={note.id}>
            <MoreHorizontal className="w-4 h-4" />
          </NoteDropdown>
        </Button>
      ))}
    </>
  );
};

export default NoteElements;
