import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { useLocation } from "react-router-dom"; // import useLocation for checking the route
import Timer from "../time";

function PrevefrenceNav({runCode}) {
  const location = useLocation();
  
  console.log(location, 'ha');

  const handleCopyLink = () => {
    const inviteLink = window.location.href; // get the current URL
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard!"); // notify the user that the link is copied
    });
  };

  const handleRunCode = () => {

    runCode()
    // Add your run code logic here
  };

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <Timer />
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-dark-fill-3 text-dark-layer-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
          {!location.pathname.includes('/room') && (<span className="text-xs text-dark-label-2">JavaScript</span>)}
      {location.pathname.includes('/room') && (
        <div className="flex items-center text-white">
          <button
            onClick={handleCopyLink}
            className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-dark-fill-3 text-dark-layer-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium"
          >
            <span className="text-xs text-dark-label-2">Invite</span>
          </button>

          <button
            onClick={handleRunCode}
            className="ml-2 flex cursor-pointer items-center rounded text-left focus:outline-none bg-dark-fill-3 text-dark-layer-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium"
          >
            <span className="text-xs text-dark-label-2">Run</span>
          </button>
        </div>
      )}
        </button>
      </div>

      {/* Only show the invite and run buttons if the current location is /room */}

      <div className="flex items-center m-2">
        <button
          className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group"
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg cursor-pointer">
            <AiOutlineSetting />
          </div>
          <div className="absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-md shadow-md bg-gray-200 origin-center text-dark-layer-2 scale-0 transition-all duration-100 ease-linear group-hover:scale-100">
            Settings
          </div>
        </button>
      </div>
    </div>
  );
}

export default PrevefrenceNav;
