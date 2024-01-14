"use client";

import { Loader2, MoreHorizontal, NotebookPen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import NoteDropdown from "./NoteDropdown";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (noteId: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/notes/${noteId}`);
      toast.success("Note deleted successfully");
      setNotes(notes.filter((note) => note.id !== noteId));
      router.refresh();
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An error occured");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <NoteDropdown
            onDelete={() => {
              handleDelete(note.id);
            }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin transition" />
            ) : (
              <MoreHorizontal className="w-4 h-4" />
            )}
          </NoteDropdown>
        </Button>
      ))}
    </>
  );
};

export default NoteElements;
