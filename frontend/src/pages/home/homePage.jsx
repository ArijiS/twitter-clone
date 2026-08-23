import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import MainPanel from "./MainPanel";

const homePage = () => {
  return (
    <div className="flex w-full h-screen max-w-360 mx-auto">
      <LeftPanel />
      <MainPanel />
      <RightPanel />
    </div>
  )
}

export default homePage;