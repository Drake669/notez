import { SearchBar } from "./Searchbar";

const SidebarElements = () => {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-y-2 flex-col">
        <SearchBar />
      </div>
    </div>
  );
};

export default SidebarElements;
