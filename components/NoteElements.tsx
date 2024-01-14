import { MoreHorizontal, NotebookPen } from "lucide-react";
import { Button } from "./ui/button";
import NoteDropdown from "./NoteDropdown";
import Link from "next/link";

const NoteElements = () => {
  return (
    <>
      <Button
        variant={"ghost"}
        className="flex items-center justify-between w-full text-slate-500 "
      >
        <Link href={"/"}>
          <div className="text-md flex items-center">
            <NotebookPen className="h-4 w-4 mr-2" />
            Untitled
          </div>
        </Link>
        <NoteDropdown>
          <MoreHorizontal className="w-4 h-4" />
        </NoteDropdown>
      </Button>
    </>
  );
};

export default NoteElements;
