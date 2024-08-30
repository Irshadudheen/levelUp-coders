import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
// import SettingsModal from "@/components/Modals/SettingsModal";
function PrevefrenceNav() {
  return (
    <div className="flex items-center jusitify-between bg-dark-layer-2 h-11 w-full ">
      <div className="flex items-center text-white ">
        <button className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-dark-fill-3 text-dark-layer-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-xs text-label-2 dark:text-dark-label-2 ">JavaScript</div>
          </div>
        </button>
      </div>
      <div className='flex items-center m-2'>
        <button
          className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group'
        // onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
        >
          <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
            <AiOutlineSetting />
          </div>
          <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-md shadow-md bg-gray-200 origin-center text-dark-layer-2 scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
            Settings</div>
        </button>
      </div>
    </div>
  )
}

export default PrevefrenceNav
