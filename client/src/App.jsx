import { Outlet } from "react-router-dom";
import RecordList from "./components/RecordList";

const App = () => {
  return (
    // [note]: since using jsx, the syntax is different from html
    <div className="w-full min-h-screen p-6"
    style={{ 
      height: '100%',
      backgroundSize: "cover", 
      backgroundRepeat: "no-repeat",
      backgroundImage: "url(https://wallpaper.forfun.com/fetch/3a/3a6eee568a29c6b7c66ca58559b12836.jpeg)",
      }}>
      <Outlet />
    </div>
  );
};

export default App