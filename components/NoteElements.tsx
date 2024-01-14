"use client";

import { Loader2, MoreHorizontal, NotebookPen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import NoteDropdown from "./NoteDropdown";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "@prisma/client";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NoteElements = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState("");
  const [notes, setNotes] = useState<Note[] | []>([]);

  const pathname = usePathname();
  const noteId = pathname.split("/").pop();
  console.log(noteId);
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
    return () => {
      setSuccess(false);
    };
  }, [success]);

  const handleDelete = async (noteId: string) => {
    try {
      setId(noteId);
      setLoading(true);
      await axios.delete(`/api/notes/${noteId}`);
      setSuccess(true);
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
          className={cn(
            "flex items-center justify-between w-full my-2 text-slate-500 ",
            noteId === note.id && "bg-slate-100"
          )}
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
            {loading && id === note.id ? (
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
