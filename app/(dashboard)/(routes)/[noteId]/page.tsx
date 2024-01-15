"use client";

import Editor from "@/components/Editor";
import TitleEditForm from "@/components/TitleEditForm";
import { Note } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";

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

  const handleChange = async (body: string) => {
    try {
      await axios.patch(`/api/notes/${params.noteId}`, { body });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "An error occured");
      } else {
        toast.error("An error occured");
      }
    }
  };

  const formatDateTime = (date: Date | undefined) => {
    return moment(date).format("Do MMMM YYYY, [at] h:mma");
  };

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
      <div className="flex flex-col justify-end items-end">
        <div className="text-slate-500 text-sm">
          Date created: {formatDateTime(currentNote?.createdAt)}
        </div>
        <div className="text-slate-500 text-sm">
          Date modified: {formatDateTime(currentNote?.updatedAt)}
        </div>
      </div>
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

      <div className="mt-8">
        <Editor
          initialContent={currentNote?.body || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Note;
