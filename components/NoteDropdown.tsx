"use client";
import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import DeleteNoteDialog from "./DeleteNoteDialog";

export default function NoteDropdown({
  children,
  noteId,
}: {
  children: React.ReactNode;
  noteId: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
          <DeleteNoteDialog noteId={noteId}>
            <TrashIcon className="mr-2 h-4 w-4" />
            <span>Delete note</span>
          </DeleteNoteDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
