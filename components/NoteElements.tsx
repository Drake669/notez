"use client";

import { Loader2, MoreHorizontal, NotebookPen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import NoteDropdown from "./NoteDropdown";
import Link from "next/link";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Note } from "@prisma/client";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import truncate from "@/lib/truncate";
import { Context } from "./context/NoteContext";
import { ScrollArea } from "./ui/scroll-area";

const NoteElements = () => {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState("");

  const { notes, setNotes } = useContext(Context);

  const pathname = usePathname();
  const noteId = pathname.split("/").pop();
  useEffect(() => {
    const getAllNotes = async () => {
      try {
        setLoading("notes");
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
      } finally {
        setLoading("");
      }
    };
    getAllNotes();
    return () => {
      setSuccess(false);
    };
  }, [setNotes]);

  const handleDelete = async (noteId: string) => {
    try {
      setId(noteId);
      setLoading("delete");
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
      setLoading("");
    }
  };

  if (loading === "notes")
    return (
      <div className=" flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin transition" />
      </div>
    );
  if (notes.length === 0)
    return (
      <div className=" text-slate-500 text-sm text-center">Empty Notebook</div>
    );
  return (
    <ScrollArea className="h-[75vh] w-full rounded-md">
      {notes.map((note) => (
        <Link href={`/${note.id}`} key={note.id}>
          <Button
            variant={"ghost"}
            className={cn(
              "flex items-center justify-between w-full my-2 text-slate-500 text-sm",
              noteId === note.id && "bg-slate-100 text-black"
            )}
          >
            <div className="text-md flex items-center">
              <NotebookPen className="h-4 w-4 mr-2" />
              <p>{truncate(note.title)}</p>
            </div>
            <NoteDropdown
              onDelete={() => {
                handleDelete(note.id);
              }}
            >
              {loading === "delete" && id === note.id ? (
                <Loader2 className="w-4 h-4 animate-spin transition" />
              ) : (
                <MoreHorizontal className="w-4 h-4" />
              )}
            </NoteDropdown>
          </Button>
        </Link>
      ))}
    </ScrollArea>
  );
};

export default NoteElements;
