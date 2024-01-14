import Logo from "./Logo";
import SidebarElements from "./SidebarElements";

const Sidebar = () => {
  return (
    <div className="p-3 border-r shadow-sm overflow-y-hidden z-50 h-full">
      <div className="flex items-center justify-center">
        <Logo />
      </div>
      <SidebarElements />
    </div>
  );
};

export default Sidebar;
