
import { Outlet } from "react-router-dom";

const MainPanel = () => {
  
  return (
    <div className="flex-[4_4_0] h-screen overflow-y-auto border-x border-gray-600">
      <Outlet />
      
    </div>
  )
}

export default MainPanel;