import { Outlet } from "react-router-dom";
import RecordList from "./components/RecordList";

const App = () => {
  return (
    // [note]: since using jsx, the syntax is different from html
    <div className="w-full min-h-screen overflow-visible bg-white space-y-2.5">
      <Outlet />
    </div>
  );
};

export default App