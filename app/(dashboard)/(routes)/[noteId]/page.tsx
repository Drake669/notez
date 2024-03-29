"use client";

import Editor from "@/components/Editor";
import TitleEditForm from "@/components/TitleEditForm";
import { Note } from "@prisma/client";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { Context } from "@/components/context/NoteContext";
import { useRouter } from "next/navigation";

const NotePage = ({ params }: { params: { noteId: string } }) => {
  const router = useRouter();
  const { currentNote, setCurrentNote } = useContext(Context);
  const [titleEdit, setTitleEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
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
        router.push("/");
        setCurrentNote(null);
      } finally {
        setLoading(false);
      }
    };
    getNote();
  }, [params.noteId, router, setCurrentNote]);

  const handleChange = async (body: string) => {
    try {
      setEditLoading(true);
      const response = await axios.patch(`/api/notes/${params.noteId}`, {
        body,
      });
      router.refresh();
      setCurrentNote(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "An error occured");
      } else {
        toast.error("An error occured");
      }
    } finally {
      setEditLoading(false);
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

  if (!currentNote) null;
  return (
    <div className="p-6">
      <div className="flex flex-col justify-end items-end">
        <div className="text-slate-500 text-sm">
          Date created: {formatDateTime(currentNote?.createdAt)}
        </div>
        <div className="text-slate-500 text-sm flex items-center">
          Date modified:{" "}
          {editLoading ? (
            <Loader2 className="w-4 h-4 animate-spin transition" />
          ) : (
            formatDateTime(currentNote?.updatedAt)
          )}
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

export default NotePage;
