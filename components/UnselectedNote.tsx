"use client";
import { NotebookPen } from "lucide-react";
import { Button } from "./ui/button";
import NewNoteDialog from "./NewNoteDialog";
import { useContext } from "react";
import { Context } from "./context/NoteContext";

const UnselectedNote = () => {
  const { setOpen } = useContext(Context);
  return (
    <div className="absolute top-0 left-50 flex items-center justify-center h-full flex-col">
      <NotebookPen className="w-20 h-20 text-slate-500" />
      <div className="mt-5 font-semibold text-2xl text-slate-500">
        No note selected
      </div>
      <NewNoteDialog>
        <Button
          className="mt-5"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add a new Note
        </Button>
      </NewNoteDialog>
    </div>
  );
};

export default UnselectedNote;
