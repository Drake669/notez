"use client";

import TitleEditForm from "@/components/TitleEditForm";
import { Note } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Note = ({ params }: { params: { noteId: string } }) => {
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [titleEdit, setTitleEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${params.noteId}`);
        setCurrentNote(res.data);
        setLoading(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data || "An error occured");
        } else {
          toast.error("An error occured");
        }
      } finally {
        setLoading(false);
      }
    };
    getNote();
  }, [params.noteId]);
  if (loading)
    return (
      <div className="relative flex items-center justify-center h-full">
        <div className="absolute top-0 left-50 flex items-center justify-center h-full">
          <Loader2 className="h-10 w-10 animate-spin transition" />
        </div>
      </div>
    );
  return (
    <div className="p-6">
      {titleEdit ? (
        <TitleEditForm note={currentNote} setTitleEdit={setTitleEdit} />
      ) : (
        <div className="flex items-center">
          <div className=" font-bold text-3xl">{currentNote?.title}</div>
          <Pencil
            className="ml-2 w-5 h-5 hover:cursor-pointer hover:opacity-75"
            onClick={() => {
              setTitleEdit(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Note;
