import { AiOutlineSetting } from "react-icons/ai";
import { useLocation } from "react-router-dom"; // import useLocation for checking the route
import Timer from "./time";
import { useState } from "react"; // import useState to manage language selection
import { toast } from "react-toastify";

function PrevefrenceNav({ runCode }) {
  const location = useLocation();
  const [language, setLanguage] = useState("js"); // State to manage selected language

  const handleCopyLink = () => {
    const inviteLink = window.location.href; // get the current URL
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success('link copied')
      // alert("Invite link copied to clipboard!"); // notify the user that the link is copied
    });
  };

  const handleRunCode = () => {
    runCode(language);
    // Add your run code logic here
  };

  const handleLanguageChange = (event) => {
    if('JavaScript'==event.target.value){
      setLanguage('js')
    }else {
      setLanguage('py')
    }
    // setLanguage(event.target.value); // Update the selected language
    console.log("Language changed to:", event.target.value);
  };

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <Timer />
      <div className="flex items-center text-black ">
        {/* Language selection dropdown */}
        <select
         
          onChange={handleLanguageChange}
          className="block text-xs text-dark-label-2 bg-dark-fill-3 py-1.5 px-2 border-none focus:outline-none"
        >
          <option value="JavaScript" className="bg-black hover:bg-dark-fill-3">JavaScript</option>
          <option value="Python" className="bg-black hover:bg-dark-fill-3">Python</option>
          {/* Add other languages as needed */}
        </select>
      </div>

      {/* Invite and run buttons for /room route */}
      {location.pathname.includes("/room") && (
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

      {/* Settings button */}
      <div className="flex items-center m-2">
        <button
          className="relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group"
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg cursor-pointer">
            <AiOutlineSetting />
          </div>
        </button>
      </div>
    </div>
  );
}

export default PrevefrenceNav;
