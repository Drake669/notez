import { PlusCircle } from "lucide-react";
import { SearchBar } from "./Searchbar";
import { Button } from "./ui/button";
import NoteElements from "./NoteElements";
import NewNoteDialog from "./NewNoteDialog";

const SidebarElements = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-y-2 flex-col">
        <SearchBar />
        <NewNoteDialog>
          <Button
            variant={"ghost"}
            className="flex items-center justify-between w-full"
          >
            <div className="text-slate-500 text-md flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a new note
            </div>
          </Button>
        </NewNoteDialog>
        <div className="mt-5 w-full">
          <NoteElements />
        </div>
      </div>
    </div>
  );
};

export default SidebarElements;
