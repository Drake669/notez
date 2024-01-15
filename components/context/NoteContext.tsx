"use client";

import { Note } from "@prisma/client";
import React, { createContext, useState } from "react";

export const Context = createContext<{
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  currentNote: Note | null;
  setCurrentNote: React.Dispatch<React.SetStateAction<Note | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  notes: [],
  setNotes: () => {},
  currentNote: null,
  setCurrentNote: () => {},
  open: false,
  setOpen: () => {},
});
const NotesContext = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[] | []>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Context.Provider
      value={{ notes, setNotes, open, setOpen, currentNote, setCurrentNote }}
    >
      {children}
    </Context.Provider>
  );
};

export default NotesContext;
