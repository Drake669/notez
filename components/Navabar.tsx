import AvatarComp from "./Avatar";
import { Dropdown } from "./Dropdown";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <div className="border-b shadow-sm mb-10 flex bg-white items-center p-4 h-full">
      <MobileSidebar />
      <div className="flex ml-auto gap-x-2">
        <Dropdown>
          <AvatarComp />
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
