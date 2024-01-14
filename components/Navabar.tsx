import MobileSidebar from "./MobileSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <div className="border-b shadow-sm mb-10 flex bg-white items-center p-4 h-full">
      <MobileSidebar />
      <div className="flex ml-auto gap-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>EA</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
