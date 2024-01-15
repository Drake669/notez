"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  NotebookPen,
  SearchIcon,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Context } from "./context/NoteContext";
import Link from "next/link";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const { notes } = useContext(Context);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant={"ghost"}
        className="flex items-center justify-between w-full hover:bg-white"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="text-slate-500 text-md flex items-center">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search...
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-75 mr-2">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={notes.length === 0 ? "No notes" : "All notes"}>
            {notes.map((note) => (
              <Link key={note.id} href={`/${note.id}`}>
                <CommandItem>
                  <NotebookPen className="mr-2 h-4 w-4" />
                  <span>{note.title}</span>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
