import { MenuBar } from "./Menubar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SideBar from "./SideBar";

 const DashBoard = ({ children }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed on left */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <MenuBar />
        <div className="p-4">
          {children}
        </div>
      </div>

      {/* Mobile sidebar will be handled inside MenuBar */}
    </div>
  );
};
export default DashBoard;